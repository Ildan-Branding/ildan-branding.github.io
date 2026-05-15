"use client";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink py-16 text-white md:py-24">
      {/* Marquee */}
      <div className="overflow-hidden border-y border-white/10 py-6 md:py-10">
        <div className="flex animate-marquee whitespace-nowrap font-mono text-3xl font-bold uppercase tracking-tight md:text-6xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-8">
              <span>TRY SMALL</span>
              <span className="text-lime">●</span>
              <span>FAIL SAFE</span>
              <span className="text-lime">●</span>
              <span>LEARN TOGETHER</span>
              <span className="text-lime">●</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 md:mt-20 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-xs">
              AI Branding Meetup
            </div>
            <div className="mt-3 text-3xl font-black md:text-5xl">
              일단, 브랜딩<span className="text-lime">*</span>
            </div>
            <div className="mt-2 text-sm text-white/50 md:text-base">
              Try with AI. Create Anything.
            </div>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 md:items-end md:text-xs">
            <a
              href="https://naver.me/GNJWHzKc"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-lime"
            >
              → Apply
            </a>
            <span>© {new Date().getFullYear()} 일단, 브랜딩</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
