"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLinkItem {
  id: string;
  label: string;
  highlight?: boolean;
}

const navLinks: NavLinkItem[] = [
  { id: "collection", label: "The Collection" },
  { id: "specifications", label: "Specifications" },
  { id: "craftsmanship", label: "Craftsmanship" },
  { id: "reserve", label: "Reserve", highlight: true },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll handler with static offset calculation (zero jumping)
  const scrollTo = useCallback((targetId: string) => {
    setMobileMenuOpen(false);

    if (targetId === "hero" || targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 76;
      let top = 0;
      let curr: HTMLElement | null = element;
      while (curr) {
        top += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      window.scrollTo({
        top: Math.max(0, top - headerOffset),
        behavior: "smooth",
      });
    }
  }, []);

  // Scroll detection & Active Section Spy
  useEffect(() => {
    const sectionIds = ["hero", "collection", "specifications", "craftsmanship", "reserve"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 160;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          let top = 0;
          let curr: HTMLElement | null = el;
          while (curr) {
            top += curr.offsetTop;
            curr = curr.offsetParent as HTMLElement | null;
          }
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-colors duration-500 ${
        isScrolled
          ? "bg-[#060606]/95 backdrop-blur-md border-b border-[#EDE8E0]/[0.08] shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full flex items-center justify-between">
        {/* Wordmark (Smooth Scroll to Top) */}
        <button
          onClick={() => scrollTo("hero")}
          className="group flex flex-col text-left tracking-tight focus:outline-none cursor-pointer"
          aria-label="Astronomia Luxe - Return to top"
        >
          <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.2em] text-[#EDE8E0] uppercase font-light transition-colors group-hover:text-[#C9A05C]">
            Astronomia Luxe
          </span>
          <span className="text-[9px] uppercase tracking-[0.45em] text-[#C9A05C]/80 font-sans mt-0.5 font-light">
            Maison d&apos;Optique · Genève
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-xs uppercase tracking-[0.25em] transition-all duration-300 relative py-1 cursor-pointer font-sans ${
                  link.highlight
                    ? isActive
                      ? "text-[#060606] bg-[#C9A05C] border border-[#C9A05C] px-4 py-1.5 font-medium"
                      : "text-[#C9A05C] border border-[#C9A05C]/50 px-4 py-1.5 hover:bg-[#C9A05C] hover:text-[#060606]"
                    : isActive
                    ? "text-[#C9A05C]"
                    : "text-[#EDE8E0]/70 hover:text-[#EDE8E0]"
                }`}
              >
                {link.label}
                {!link.highlight && (
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-[#C9A05C] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col items-end justify-center w-8 h-8 space-y-1.5 focus:outline-none cursor-pointer"
          aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`h-[1px] bg-[#EDE8E0] transition-all duration-300 ${
              mobileMenuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
            }`}
          />
          <span
            className={`h-[1px] bg-[#EDE8E0] transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : "w-4"
            }`}
          />
          <span
            className={`h-[1px] bg-[#EDE8E0] transition-all duration-300 ${
              mobileMenuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-5"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-20 bg-[#060606]/98 border-b border-[#EDE8E0]/15 px-8 py-10 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col space-y-7">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`text-sm uppercase tracking-[0.3em] font-sans text-left transition-colors cursor-pointer ${
                      link.highlight
                        ? "text-[#C9A05C] border border-[#C9A05C]/50 text-center py-3 hover:bg-[#C9A05C] hover:text-[#060606]"
                        : isActive
                        ? "text-[#C9A05C] font-medium"
                        : "text-[#EDE8E0]/80 hover:text-[#EDE8E0]"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
