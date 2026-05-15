import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://ildan-branding.vercel.app"),
  title: "일단, 브랜딩 — AI Branding Meetup",
  description:
    "AI를 활용해 이것저것 해보는 가벼운 모임. 정해진 목표 없이, 일단 모여서. Try with AI. Create Anything.",
  openGraph: {
    title: "일단, 브랜딩 — AI Branding Meetup",
    description: "AI를 활용해 이것저것 해보는 가벼운 모임. 처음은 소수로 시작, 나중엔 함께 더 크게.",
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "일단, 브랜딩",
  },
  twitter: {
    card: "summary_large_image",
    title: "일단, 브랜딩 — AI Branding Meetup",
    description: "AI를 활용해 이것저것 해보는 가벼운 모임.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/* 카카오톡 인앱 브라우저 감지 — body-fixed 스크롤 모드가 KakaoTalk webview에서 끊김 유발 */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(/KAKAOTALK/i.test(navigator.userAgent))document.documentElement.classList.add('kakao-webview');",
          }}
        />
      </head>
      <body className="grain overflow-x-hidden bg-ink text-white antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
