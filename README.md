# Astronomia Luxe · Haute Couture Eyewear Maison

An haute couture luxury marketing digital flagship website for **Astronomia Luxe**, showcasing handcrafted rose-gold titanium spectacles featuring crystal-clear optical lenses and rich brown acetate temple tips.

Built with **Next.js (App Router)**, **Tailwind CSS**, and **Framer Motion**, styled in the tradition of a prestigious Swiss luxury maison (e.g., Vacheron Constantin, Audemars Piguet).

---

## Key Features

1. **Cinematic Hero Exploded Eyewear Animation**:
   - Pinned 350vh scroll canvas playing a 240-frame mechanical disassembly sequence.
   - Smooth inertia-damped lerp interpolation mapping scroll progress to assembly state.
   - Pure obsidian black (`#060606`) integration with zero frame boundaries.
   - Progressive preloading with asynchronous off-thread image decoding.
   - Real-time mechanical sequence indicator HUD (`001 / 240 · 0%`).

2. **The Collection (Full-Bleed Macro Photography Gallery)**:
   - Extreme close-up plates showcasing the fluted cylindrical micro-hinges, sculpted bridge with engraved hallmarks, and titanium-to-acetate junctions.
   - Smooth parallax scrolling depth.

3. **Atelier Technical Specifications Dossier**:
   - Archival horological ledger format detailing Grade 5 titanium, 750‰ PVD rose gold, sapphire anti-reflective optics, 18.4g total weight, and ±0.02mm tolerances.

4. **Craftsmanship Section**:
   - Two-column editorial storytelling covering the maison philosophy and atelier metrics (`0.02 mm`, `72 Hours`, `18.4 g`).

5. **Private Viewing Appointments (Working API)**:
   - Private invitation form with client-side & server-side validation.
   - Integrated with Next.js App Router API route (`/api/appointments`) with persistent dossier storage (`data/appointments.json`).

6. **Whisper-Thin Fixed Navigation**:
   - Fixed 80px luxury navigation bar with active section spy and smooth scrolling.
   - Responsive mobile navigation drawer.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Cormorant Garamond & Plus Jakarta Sans

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Production Build
```bash
npm run build
npm run start
```
