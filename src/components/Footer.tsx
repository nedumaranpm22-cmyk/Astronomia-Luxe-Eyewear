"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    if (id === "top" || id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 76;
      let top = 0;
      let curr: HTMLElement | null = el;
      while (curr) {
        top += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      window.scrollTo({
        top: Math.max(0, top - headerOffset),
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative bg-[#060606] border-t border-[#EDE8E0]/[0.08] text-[#EDE8E0] pt-20 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Tier: Wordmark and Direct Navigation in Order */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-16 border-b border-[#EDE8E0]/[0.06] gap-10">
          <div>
            <button
              onClick={() => scrollTo("top")}
              className="text-left group cursor-pointer focus:outline-none"
              aria-label="Return to top"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#EDE8E0] uppercase font-light block mb-2 group-hover:text-[#C9A05C] transition-colors">
                Astronomia Luxe
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A05C]/80 font-sans block">
                Maison d&apos;Optique · Genève
              </span>
            </button>
          </div>

          <nav className="flex flex-wrap items-center gap-8 sm:gap-10" aria-label="Footer Navigation">
            <button
              onClick={() => scrollTo("collection")}
              className="text-xs uppercase tracking-[0.25em] text-[#EDE8E0]/70 hover:text-[#C9A05C] transition-colors font-sans cursor-pointer"
            >
              The Collection
            </button>
            <button
              onClick={() => scrollTo("specifications")}
              className="text-xs uppercase tracking-[0.25em] text-[#EDE8E0]/70 hover:text-[#C9A05C] transition-colors font-sans cursor-pointer"
            >
              Specifications
            </button>
            <button
              onClick={() => scrollTo("craftsmanship")}
              className="text-xs uppercase tracking-[0.25em] text-[#EDE8E0]/70 hover:text-[#C9A05C] transition-colors font-sans cursor-pointer"
            >
              Craftsmanship
            </button>
            <button
              onClick={() => scrollTo("reserve")}
              className="text-xs uppercase tracking-[0.25em] text-[#C9A05C] hover:text-[#EDE8E0] transition-colors font-sans cursor-pointer"
            >
              Private Appointments
            </button>
          </nav>
        </div>

        {/* Bottom Tier: Heritage, Copyright & Back-to-Top */}
        <div className="pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#EDE8E0]/45 font-sans gap-6">
          <div className="flex items-center space-x-6">
            <span>© {currentYear} Astronomia Luxe Maison S.A. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Geneva, Switzerland</span>
          </div>

          <div className="flex items-center space-x-8">
            <span className="text-[#C9A05C]/70 tracking-widest uppercase text-[10px]">
              Swiss Haute Horlogerie Eyewear
            </span>
            <button
              onClick={() => scrollTo("top")}
              className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#EDE8E0]/60 hover:text-[#C9A05C] transition-colors cursor-pointer group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
