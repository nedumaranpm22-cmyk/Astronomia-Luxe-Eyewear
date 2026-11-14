"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SpecItem {
  label: string;
  value: string;
  note?: string;
}

const specifications: SpecItem[] = [
  {
    label: "Collection",
    value: "Astronomia Luxe",
    note: "Series No. AL-01",
  },
  {
    label: "Frame Material",
    value: "Premium Rose Gold Titanium",
    note: "Aerospace Grade 5 (Ti-6Al-4V)",
  },
  {
    label: "Lens Type",
    value: "Crystal-clear Optical Lenses",
    note: "High-index Clarity with Anti-Reflective Matrix",
  },
  {
    label: "Frame Finish",
    value: "Hand-polished Rose Gold",
    note: "Multi-stage Mirror Polish · 750‰ PVD Finish",
  },
  {
    label: "Bridge",
    value: "Precision-engineered Titanium",
    note: "Integrated Micro-flex Architecture",
  },
  {
    label: "Hinges",
    value: "High-precision Micro-hinges",
    note: "Cylindrical Fluted Bearing with Locking Screws",
  },
  {
    label: "Temple Arms",
    value: "Premium Titanium Construction",
    note: "Counterbalanced Ergo-curved Profile",
  },
  {
    label: "Temple Tips",
    value: "Rich Brown Acetate",
    note: "Aged Italian Cotton-cellulose Acetate",
  },
  {
    label: "Design",
    value: "Contemporary Luxury",
    note: "Geometric Balance & Pure Restraint",
  },
  {
    label: "Craftsmanship",
    value: "Precision Hand-finished",
    note: "Numbered Atelier Production · Geneva",
  },
];

export default function Specifications() {
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
      id="specifications"
      className="relative bg-[#060606] pt-24 sm:pt-32 pb-32 sm:pb-40 px-6 sm:px-12 lg:px-20 text-[#EDE8E0] overflow-hidden scroll-mt-24 border-b border-[#EDE8E0]/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 sm:mb-20">
          <span className="label-caps mb-3">Atelier Technical Dossier</span>
          <h2 className="editorial-title text-3xl sm:text-5xl lg:text-6xl text-[#EDE8E0] mb-5">
            Specifications &amp; Architecture
          </h2>
          <p className="text-sm sm:text-base text-[#EDE8E0]/70 max-w-xl font-sans font-light leading-relaxed">
            Every millimeter is calibrated with horological discipline. Presented as an
            individual archival technical ledger for the Astronomia Luxe chassis.
          </p>
        </div>

        {/* Luxury Printed Spec Sheet Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative border-t border-b border-[#EDE8E0]/15 pt-4 pb-8"
        >
          {/* Subtle watermark / maison stamp */}
          <div className="absolute right-4 top-4 pointer-events-none select-none opacity-25 text-right hidden sm:block">
            <span className="text-[10px] font-mono tracking-widest text-[#C9A05C] uppercase block">
              Document Ref: AGY-CH-2026
            </span>
            <span className="text-[9px] font-sans tracking-widest text-[#EDE8E0]/70 uppercase block">
              Geneva Certified
            </span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 py-4 border-b border-[#EDE8E0]/10 text-[10px] uppercase tracking-[0.3em] text-[#C9A05C]/90 font-sans">
            <div className="col-span-5 sm:col-span-4">Specification</div>
            <div className="col-span-7 sm:col-span-5">Execution / Detail</div>
            <div className="hidden sm:block sm:col-span-3 text-right">Standard / Note</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#EDE8E0]/[0.07]">
            {specifications.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="grid grid-cols-12 py-5 sm:py-6 items-baseline group hover:bg-[#EDE8E0]/[0.015] transition-colors"
              >
                {/* Column 1: Label */}
                <div className="col-span-5 sm:col-span-4 pr-4">
                  <span className="text-xs sm:text-sm font-sans tracking-wide text-[#EDE8E0]/60 group-hover:text-[#EDE8E0]/90 transition-colors">
                    {item.label}
                  </span>
                </div>

                {/* Column 2: Value */}
                <div className="col-span-7 sm:col-span-5 pr-4">
                  <span className="font-serif text-base sm:text-lg text-[#EDE8E0] font-normal group-hover:text-[#C9A05C] transition-colors">
                    {item.value}
                  </span>
                </div>

                {/* Column 3: Note / Standard */}
                <div className="hidden sm:block sm:col-span-3 text-right">
                  <span className="text-xs font-sans text-[#C9A05C]/75 font-light tracking-wide">
                    {item.note}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Summary Bar */}
          <div className="mt-12 pt-8 border-t border-[#EDE8E0]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#EDE8E0]/50 font-sans space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="tracking-widest uppercase text-[10px] text-[#C9A05C]">
                Total Weight: 18.4g
              </span>
              <span className="w-1 h-1 rounded-full bg-[#EDE8E0]/20" />
              <span className="tracking-widest uppercase text-[10px]">
                Tolerance: ±0.02mm
              </span>
            </div>

            <button
              onClick={scrollToReserve}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C9A05C] hover:text-[#EDE8E0] transition-colors cursor-pointer"
            >
              <span>Request Personal Allocation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
