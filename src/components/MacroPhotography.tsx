"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MacroFeature {
  title: string;
  subtitle: string;
  plate: string;
  description: string;
  technicalDetails: { label: string; value: string }[];
  imageSrc: string;
  align: "left" | "right";
}

const macroFeatures: MacroFeature[] = [
  {
    plate: "Plate I · Articulation",
    title: "The Fluted Cylindrical Micro-Hinge",
    subtitle: "Zero-play mechanical articulation inspired by Swiss horological complications.",
    description:
      "Machined from a solid billet of Grade 5 titanium, the micro-hinge incorporates five interlocking cylindrical flutes held by dual micro-screws. Friction is calibrated precisely to provide a fluid, weighted opening gesture that never loosens over decades.",
    technicalDetails: [
      { label: "Tolerance", value: "±0.015 mm" },
      { label: "Hardware", value: "Dual Flat-head Ti Screws" },
      { label: "Articulation", value: "Calibrated 105° sweep" },
    ],
    imageSrc: "/editorial/macro_hinge_fullbleed.jpg",
    align: "left",
  },
  {
    plate: "Plate II · Structure & Optics",
    title: "Sculpted Bridge & Anti-Reflective Sapphire Optics",
    subtitle: "An uninterrupted contour distributing frame mass evenly across nasal cartilage.",
    description:
      "The central bridge is subtly arched and laser-engraved with the Astronomia Luxe Ti 750 hallmark. The adjustable ergonomic nose pads feature hand-buffed organic convex surfaces. Crystal-clear optical lenses feature multi-layer sapphire anti-reflective coatings with hand-beveled peripheral facets.",
    technicalDetails: [
      { label: "Engraving", value: "Astronomia Luxe Ti 750" },
      { label: "Optics", value: "7-Layer Sapphire Anti-Reflective" },
      { label: "Support", value: "Organic Floating Titanium Pads" },
    ],
    imageSrc: "/editorial/macro_bridge_fullbleed.jpg",
    align: "right",
  },
  {
    plate: "Plate III · Material Synthesis",
    title: "Titanium-to-Acetate Ergonomic Junction",
    subtitle: "A seamless transition from cold aerospace titanium to warm, tactile cotton-cellulose acetate.",
    description:
      "The temple arm tapers gracefully before interlocking into rich brown tortoiseshell acetate tips. Secured by a singular countersunk screw and stamped with the maison seal, the junction provides balanced counter-weight behind the ears for effortless all-day equilibrium.",
    technicalDetails: [
      { label: "Material", value: "Cured Italian Acetate" },
      { label: "Finish", value: "48-Hour Hand Pumice Polish" },
      { label: "Ergonomics", value: "Anatomical Counterbalance" },
    ],
    imageSrc: "/editorial/macro_temple_fullbleed.jpg",
    align: "left",
  },
];

function MacroFeatureBlock({
  feature,
}: {
  feature: MacroFeature;
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.0, 1.03]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center justify-center py-20 sm:py-28 border-b border-[#EDE8E0]/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Plate */}
          <div
            className={`lg:col-span-7 ${
              feature.align === "right" ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-[#EDE8E0]/10 bg-[#060606] shadow-2xl">
              <motion.div
                style={{ y: imgY, scale: imgScale }}
                className="w-full h-full relative"
              >
                <img
                  src={feature.imageSrc}
                  alt={feature.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.03]"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#060606]/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Editorial Storytelling */}
          <div
            className={`lg:col-span-5 ${
              feature.align === "right" ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="flex flex-col">
              <span className="label-caps mb-3 text-[#C9A05C]">
                {feature.plate}
              </span>
              <h3 className="editorial-title text-2xl sm:text-3xl lg:text-4xl text-[#EDE8E0] mb-3">
                {feature.title}
              </h3>
              <p className="editorial-sub text-base sm:text-lg text-[#C9A05C]/90 mb-6 font-light">
                {feature.subtitle}
              </p>
              <div className="w-12 h-[1px] bg-[#C9A05C]/30 mb-6" />
              <p className="text-xs sm:text-sm text-[#EDE8E0]/70 font-sans leading-relaxed tracking-wide mb-8">
                {feature.description}
              </p>

              {/* Technical Specifications Callout */}
              <div className="border-t border-[#EDE8E0]/10 pt-6 grid grid-cols-3 gap-4">
                {feature.technicalDetails.map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-[#EDE8E0]/45 font-sans mb-1">
                      {item.label}
                    </span>
                    <span className="text-xs font-serif text-[#EDE8E0] font-normal">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MacroPhotography() {
  return (
    <section id="collection" className="relative bg-[#060606] text-[#EDE8E0] scroll-mt-24">
      {/* Editorial Header */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 pt-28 pb-14 text-center">
        <span className="label-caps mb-3 block">Macro Precision Gallery</span>
        <h2 className="editorial-title text-3xl sm:text-5xl lg:text-6xl text-[#EDE8E0] mb-5">
          Architectural Nuance
        </h2>
        <p className="text-sm sm:text-base text-[#EDE8E0]/70 max-w-2xl mx-auto font-sans font-light leading-relaxed">
          Extreme close-up photography documenting the hand-finished surfaces,
          titanium bevels, and optical reflections that distinguish Astronomia Luxe.
        </p>
        <div className="w-16 h-[1px] bg-[#C9A05C]/40 mx-auto mt-7" />
      </div>

      {/* Feature Blocks */}
      <div>
        {macroFeatures.map((feature, index) => (
          <MacroFeatureBlock key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
