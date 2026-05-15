import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "일단, 브랜딩 — AI Branding Meetup",
  description:
    "AI를 활용해 이것저것 해보는 가벼운 모임. 정해진 목표 없이, 일단 모여서. Try with AI. Create Anything.",
  openGraph: {
    title: "일단, 브랜딩 — AI Branding Meetup",
    description: "AI를 활용해 이것저것 해보는 가벼운 모임.",
    type: "website",
    locale: "ko_KR",
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
      <body className="grain overflow-x-hidden bg-ink text-white antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
