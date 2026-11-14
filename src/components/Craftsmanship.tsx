"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Craftsmanship() {
  const scrollToReserve = () => {
    const el = document.getElementById("reserve");
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="craftsmanship"
      className="relative bg-[#060606] py-32 sm:py-44 px-6 sm:px-12 lg:px-20 text-[#EDE8E0] overflow-hidden border-b border-[#EDE8E0]/[0.06] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="mb-14">
          <span className="label-caps">Maison Philosophy · Atelier Geneva</span>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Refined Storytelling */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-[#EDE8E0] mb-8 sm:mb-10 leading-[1.05]">
                An obsession with precision.
              </h2>

              <div className="space-y-6 text-sm sm:text-base text-[#EDE8E0]/75 font-sans font-light leading-relaxed max-w-xl">
                <p>
                  Every curve, every connection, every polished surface is considered
                  with intention. Astronomia Luxe brings together refined materials
                  and precision engineering to create eyewear that exists beyond passing
                  trends.
                </p>
                <p>
                  From the delicate geometry of its rose-gold frame to the carefully
                  finished hinges and balanced proportions, every element reflects an
                  uncompromising approach to craftsmanship.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={scrollToReserve}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C9A05C] hover:text-[#EDE8E0] transition-colors cursor-pointer"
                >
                  <span>Inquire Regarding Atelier Commissions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Atelier Metrics */}
            <div className="mt-14 sm:mt-20 pt-10 border-t border-[#EDE8E0]/10 grid grid-cols-3 gap-6">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#C9A05C] font-light block mb-1">
                  0.02 mm
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#EDE8E0]/45 font-sans">
                  Hinge Tolerance
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#C9A05C] font-light block mb-1">
                  72 Hours
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#EDE8E0]/45 font-sans">
                  Hand Polish Cycle
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#C9A05C] font-light block mb-1">
                  18.4 g
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#EDE8E0]/45 font-sans">
                  Aerospace Chassis
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Product Photography */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] sm:aspect-[16/11] border border-[#EDE8E0]/10 bg-[#060606] shadow-2xl overflow-hidden group"
            >
              <img
                src="/editorial/hero_profile.jpg"
                alt="Astronomia Luxe Haute Couture Eyewear Three-Quarter Profile"
                className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04] transition-transform duration-1000 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/60 via-transparent to-transparent pointer-events-none" />

              {/* Caption Tag */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-widest font-sans text-[#EDE8E0]/60">
                <span className="text-[#C9A05C]">Figure 04 · Assembled Profile</span>
                <span>Ref. AL-01 Rose Gold Titanium</span>
              </div>
            </motion.div>

            {/* Editorial Quote Callout */}
            <div className="mt-8 p-6 border-l border-[#C9A05C]/40 bg-[#EDE8E0]/[0.015]">
              <p className="font-serif italic text-base sm:text-lg text-[#EDE8E0]/80 font-light">
                &ldquo;True luxury does not clamor for attention. It reveals itself in
                the silence of perfect balance and unhurried execution.&rdquo;
              </p>
              <span className="text-[10px] uppercase tracking-widest text-[#C9A05C] font-sans mt-3 block">
                — Head of Atelier, Geneva
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
