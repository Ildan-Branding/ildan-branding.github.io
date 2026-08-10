/**
 * 발제 제출 프록시.
 * 정적 사이트(GitHub Pages)에서 Notion API 토큰을 직접 들고 있을 수 없어서
 * 이 Worker가 토큰을 대신 들고 Notion "💡 아이디어" DB에 대신 써준다.
 */

const NOTION_VERSION = "2022-06-28";
const MAX_SUMMARY = 80;
const MAX_WHY = 500;

const TITLE_PROP = "제목";
const CONTENT_PROP = "내용";
const STATUS_PROP = "상태";
const SHARER_PROP = "공유자";
const PROPOSED_STATUS = "제안";
const SHARER_VALUE = "웹사이트";

function corsHeaders(request, allowedOrigins) {
  const origin = request.headers.get("Origin") || "";
  const allowed = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

function notionHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

async function handleSubmit(request, env, cors) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400, cors);
  }

  const { summary, why, honeypot } = body ?? {};

  // 봇으로 추정 — 실제로 쓰지 않고 성공한 것처럼만 응답
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return json({ ok: true }, 200, cors);
  }

  const trimmedSummary = typeof summary === "string" ? summary.trim() : "";
  const trimmedWhy = typeof why === "string" ? why.trim() : "";

  if (!trimmedSummary || trimmedSummary.length > MAX_SUMMARY) {
    return json({ error: "invalid_summary" }, 400, cors);
  }
  if (trimmedWhy.length > MAX_WHY) {
    return json({ error: "invalid_why" }, 400, cors);
  }

  const properties = {
    [TITLE_PROP]: { title: [{ text: { content: trimmedSummary } }] },
    [STATUS_PROP]: { select: { name: PROPOSED_STATUS } },
    [SHARER_PROP]: { rich_text: [{ text: { content: SHARER_VALUE } }] },
  };
  if (trimmedWhy) {
    properties[CONTENT_PROP] = { rich_text: [{ text: { content: trimmedWhy } }] };
  }

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: notionHeaders(env.NOTION_TOKEN),
    body: JSON.stringify({
      parent: { database_id: env.NOTION_DATABASE_ID },
      properties,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return json({ error: "notion_insert_failed", detail }, 502, cors);
  }

  return json({ ok: true }, 200, cors);
}

async function handleList(env, cors) {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${env.NOTION_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: notionHeaders(env.NOTION_TOKEN),
      body: JSON.stringify({
        filter: { property: STATUS_PROP, select: { equals: PROPOSED_STATUS } },
        sorts: [{ timestamp: "created_time", direction: "descending" }],
        page_size: 30,
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    return json({ error: "notion_query_failed", detail }, 502, cors);
  }

  const data = await res.json();
  const items = (data.results ?? []).map((page) => {
    const summary =
      page.properties?.[TITLE_PROP]?.title?.[0]?.plain_text ?? "";
    const why =
      page.properties?.[CONTENT_PROP]?.rich_text?.[0]?.plain_text ?? "";
    return {
      id: page.id,
      summary,
      why: why || null,
      created_at: page.created_time,
    };
  });

  return json({ items }, 200, cors);
}

export default {
  async fetch(request, env) {
    const allowedOrigins = (env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const cors = corsHeaders(request, allowedOrigins);
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (url.pathname === "/submit" && request.method === "POST") {
      return handleSubmit(request, env, cors);
    }
    if (url.pathname === "/list" && request.method === "GET") {
      return handleList(env, cors);
    }
    return json({ error: "not_found" }, 404, cors);
  },
};
