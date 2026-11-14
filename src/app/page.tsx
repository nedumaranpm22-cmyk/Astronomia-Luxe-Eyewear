import Navigation from "@/components/Navigation";
import HeroSequence from "@/components/HeroSequence";
import MacroPhotography from "@/components/MacroPhotography";
import Specifications from "@/components/Specifications";
import Craftsmanship from "@/components/Craftsmanship";
import PrivateAppointments from "@/components/PrivateAppointments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060606] text-[#EDE8E0] relative selection:bg-[#C9A05C] selection:text-[#060606]">
      {/* Whisper-thin fixed luxury navigation */}
      <Navigation />

      {/* 1. Pinned 350vh Cinematic Exploded Eyewear Canvas Hero Animation */}
      <HeroSequence />

      {/* 2. The Collection: Full-bleed Cinematic Macro Photography Showcase */}
      <MacroPhotography />

      {/* 3. Atelier Technical Specifications Dossier */}
      <Specifications />

      {/* 4. Craftsmanship: Two-Column Maison Philosophy & Atelier Metrics */}
      <Craftsmanship />

      {/* 5. Reserve: Private Viewing Salon Appointments Form */}
      <PrivateAppointments />

      {/* 6. Minimal Luxury Maison Footer */}
      <Footer />
    </main>
  );
}
