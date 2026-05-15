import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "일단, 브랜딩 — AI Branding Meetup";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(url: string) {
  const res = await fetch(url);
  return res.arrayBuffer();
}

export default async function OGImage() {
  const [black, bold] = await Promise.all([
    loadFont(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Black.otf"
    ),
    loadFont(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf"
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "70px 80px",
          fontFamily: "Pretendard",
          position: "relative",
        }}
      >
        {/* glow blob */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "#C8FF3D",
            opacity: 0.18,
            filter: "blur(80px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "#3D6BFF",
            opacity: 0.22,
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        {/* top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.6)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
            <span>AI Branding</span>
            <span>Meetup</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 60, height: 1, background: "rgba(255,255,255,0.3)" }} />
            <span>Try with AI</span>
            <span style={{ color: "#C8FF3D" }}>Create Anything</span>
          </div>
        </div>

        {/* main */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 30,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#C8FF3D",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              New Community · 2026
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 220,
              fontWeight: 900,
              letterSpacing: -10,
              lineHeight: 0.88,
              color: "#FFFFFF",
              alignItems: "baseline",
            }}
          >
            일단, 브랜딩
            <span style={{ color: "#C8FF3D", marginLeft: 8 }}>*</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 30,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            AI를 활용해 이것저것 해보는 가벼운 모임.
          </div>
        </div>

        {/* bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["Try Small", "Fail Safe", "Learn Together"].map((t, i) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "10px 22px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: i === 0 ? "rgba(200,255,61,0.15)" : "rgba(255,255,255,0.05)",
                  color: i === 0 ? "#C8FF3D" : "rgba(255,255,255,0.8)",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: 2,
                }}
              >
                · {t}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(255,255,255,0.5)",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            ildan-branding.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: black, weight: 900, style: "normal" },
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
