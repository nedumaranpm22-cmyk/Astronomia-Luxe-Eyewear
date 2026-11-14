"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const padded = String(index).padStart(3, "0");
  return `/frames/frame_${padded}.jpg`;
};

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cached frame references (supports both ImageBitmap and HTMLImageElement)
  const framesRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES + 1).fill(null)
  );

  // DOM refs to avoid React re-renders during continuous scrolling
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  const prefersReducedMotion = useReducedMotion();

  // Scroll progress for the 350vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Narrative overlay transforms (alternating sides & fading smoothly)
  // Phase 1: 0% - 20% (Assembled - Centered)
  const opacityPhase1 = useTransform(scrollYProgress, [0, 0.08, 0.16, 0.22], [1, 1, 0.8, 0]);
  const yPhase1 = useTransform(scrollYProgress, [0, 0.18], [0, -25]);

  // Phase 2: 20% - 45% (Frame separates - Left side)
  const opacityPhase2 = useTransform(scrollYProgress, [0.18, 0.25, 0.38, 0.45], [0, 1, 1, 0]);
  const yPhase2 = useTransform(scrollYProgress, [0.18, 0.25, 0.38, 0.45], [35, 0, 0, -25]);

  // Phase 3: 45% - 75% (Engineering exposed - Right side)
  const opacityPhase3 = useTransform(scrollYProgress, [0.45, 0.52, 0.68, 0.75], [0, 1, 1, 0]);
  const yPhase3 = useTransform(scrollYProgress, [0.45, 0.52, 0.68, 0.75], [35, 0, 0, -25]);

  // Phase 4: 75% - 100% (Fully exploded - Centered with CTA)
  const opacityPhase4 = useTransform(scrollYProgress, [0.75, 0.82, 0.96, 1], [0, 1, 1, 1]);
  const yPhase4 = useTransform(scrollYProgress, [0.75, 0.82], [35, 0]);

  // Smooth scroll helper
  const scrollToSpecifications = () => {
    const el = document.getElementById("specifications");
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

  // Canvas drawing function
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Find requested frame or closest available
    let img = framesRef.current[frameNum];
    if (!img) {
      let closestDist = Infinity;
      let closestImg: ImageBitmap | HTMLImageElement | null = null;
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const candidate = framesRef.current[i];
        if (candidate) {
          const dist = Math.abs(i - frameNum);
          if (dist < closestDist) {
            closestDist = dist;
            closestImg = candidate;
          }
        }
      }
      img = closestImg;
    }

    const { width, height } = canvas;
    ctx.fillStyle = "#060606";
    ctx.fillRect(0, 0, width, height);

    if (img) {
      const imgW = "naturalWidth" in img && img.naturalWidth > 0 ? img.naturalWidth : img.width;
      const imgH = "naturalHeight" in img && img.naturalHeight > 0 ? img.naturalHeight : img.height;
      const canvasAspect = width / height;
      const imgAspect = imgW / imgH;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (canvasAspect < 1) {
        // Mobile / Portrait view: scale up eyewear and position slightly above center
        const mobileScale = Math.min(1.35, Math.max(1.1, 1.2 / canvasAspect * 0.5));
        drawW = width * mobileScale;
        drawH = drawW / imgAspect;
        drawX = (width - drawW) / 2;
        drawY = height * 0.40 - drawH / 2;
      } else {
        // Desktop / Landscape view: perfectly centered with generous negative space
        if (canvasAspect > imgAspect) {
          drawH = height * 0.86;
          drawW = drawH * imgAspect;
        } else {
          drawW = width * 0.90;
          drawH = drawW / imgAspect;
        }
        drawX = (width - drawW) / 2;
        drawY = (height - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Subtle edge vignette to ensure seamless blending with pure black (#060606)
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(drawW, drawH) * 0.42,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.62
      );
      gradient.addColorStop(0, "rgba(6, 6, 6, 0)");
      gradient.addColorStop(0.82, "rgba(6, 6, 6, 0.45)");
      gradient.addColorStop(1, "#060606");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
  }, []);

  // Handle HiDPI / Retina Canvas Sizing
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Animation Loop with Smooth Lerping & Decoupled DOM Updates
  useEffect(() => {
    let lastRenderedFrame = -1;

    const renderLoop = () => {
      // Smooth interpolation: ~18% towards target frame per tick
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.18;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrameRef.current)));

      if (frameToDraw !== lastRenderedFrame) {
        drawFrame(frameToDraw);
        lastRenderedFrame = frameToDraw;

        // Update DOM directly without triggering React re-renders
        if (counterTextRef.current) {
          const progressPercent = Math.round(((frameToDraw - 1) / (TOTAL_FRAMES - 1)) * 100);
          counterTextRef.current.textContent = `${String(frameToDraw).padStart(3, "0")} / ${TOTAL_FRAMES} · ${progressPercent}%`;
        }
        if (progressBarRef.current) {
          const widthPercent = (frameToDraw / TOTAL_FRAMES) * 100;
          progressBarRef.current.style.width = `${widthPercent}%`;
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Progressive Frame Loader with Off-Thread Decoding
  useEffect(() => {
    isCancelledRef.current = false;

    // Helper to load and decode a single frame
    const loadFrame = async (index: number): Promise<ImageBitmap | HTMLImageElement | null> => {
      if (framesRef.current[index]) return framesRef.current[index];

      try {
        if (typeof window !== "undefined" && "createImageBitmap" in window) {
          const res = await fetch(getFramePath(index));
          if (!res.ok) throw new Error("Fetch failed");
          const blob = await res.blob();
          if (isCancelledRef.current) return null;
          const bitmap = await createImageBitmap(blob);
          framesRef.current[index] = bitmap;
          return bitmap;
        } else {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = getFramePath(index);
            img.onload = () => {
              if (img.decode) {
                img.decode().then(() => {
                  framesRef.current[index] = img;
                  resolve(img);
                }).catch(() => {
                  framesRef.current[index] = img;
                  resolve(img);
                });
              } else {
                framesRef.current[index] = img;
                resolve(img);
              }
            };
            img.onerror = () => resolve(null);
          });
        }
      } catch {
        // Fallback to standard Image
        return new Promise((resolve) => {
          const img = new Image();
          img.src = getFramePath(index);
          img.onload = () => {
            framesRef.current[index] = img;
            resolve(img);
          };
          img.onerror = () => resolve(null);
        });
      }
    };

    const orchestratePreload = async () => {
      // Step 1: Immediately load Frame 1 and draw it instantly
      await loadFrame(1);
      if (isCancelledRef.current) return;
      drawFrame(1);

      // Step 2: Immediately load frames 2 to 24 (the initial assembled range)
      const initialBatch = [];
      for (let i = 2; i <= 24; i++) {
        initialBatch.push(loadFrame(i));
      }
      await Promise.all(initialBatch);
      if (isCancelledRef.current) return;

      // Step 3: Load keyframes distributed every 4th frame across the entire timeline
      const keyframes = [];
      for (let i = 28; i <= TOTAL_FRAMES; i += 4) {
        keyframes.push(i);
      }
      for (const kf of keyframes) {
        if (isCancelledRef.current) return;
        await loadFrame(kf);
      }

      // Step 4: Fill in remaining frames in background batches of 8
      const remaining: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!framesRef.current[i]) remaining.push(i);
      }

      const batchSize = 8;
      for (let i = 0; i < remaining.length; i += batchSize) {
        if (isCancelledRef.current) return;
        const batch = remaining.slice(i, i + batchSize);
        await Promise.all(batch.map((idx) => loadFrame(idx)));
      }
    };

    orchestratePreload();
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      isCancelledRef.current = true;
      window.removeEventListener("resize", handleResize);

      // Clean up and release GPU ImageBitmap resources
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const item = framesRef.current[i];
        if (item && "close" in item && typeof item.close === "function") {
          item.close();
        }
      }
    };
  }, [drawFrame, handleResize]);

  // Map scroll progress to target frame index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      const target = Math.round(1 + clamped * (TOTAL_FRAMES - 1));
      targetFrameRef.current = target;
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Reduced motion alternative: static high-res beauty composition
  if (prefersReducedMotion) {
    return (
      <section
        id="hero"
        className="relative min-h-screen bg-[#060606] flex flex-col items-center justify-center px-6 py-28 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <span className="label-caps mb-4 block">Haute Couture Eyewear</span>
          <h1 className="editorial-title text-4xl sm:text-6xl text-[#EDE8E0] mb-4">
            Astronomia Luxe
          </h1>
          <p className="editorial-sub text-xl sm:text-2xl text-[#C9A05C] mb-10">
            Vision, refined to its essence.
          </p>
          <div className="relative aspect-video max-w-3xl mx-auto mb-10 overflow-hidden border border-[#EDE8E0]/15 bg-[#060606]">
            <img
              src="/frames/frame_240.jpg"
              alt="Astronomia Luxe Exploded Architecture"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={scrollToSpecifications}
            className="text-xs uppercase tracking-luxury text-[#EDE8E0] border border-[#C9A05C]/60 px-8 py-3.5 hover:bg-[#C9A05C] hover:text-[#060606] transition-colors font-sans cursor-pointer"
          >
            Discover the Collection
          </button>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[350vh] bg-[#060606]"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#060606] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-contain pointer-events-none"
        />

        {/* Mechanical Sequence HUD (Bottom Left) */}
        <div className="absolute bottom-8 left-6 sm:left-12 z-20 pointer-events-none select-none flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A05C]/80 font-sans">
              Mechanical Sequence
            </span>
            <span
              ref={counterTextRef}
              className="font-mono text-xs text-[#EDE8E0]/60 tracking-wider"
            >
              001 / 240 · 0%
            </span>
          </div>
          <div className="hidden sm:block w-24 h-[1px] bg-[#EDE8E0]/15 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-[#C9A05C] transition-all duration-75"
              style={{ width: "0.4%" }}
            />
          </div>
        </div>

        {/* Quiet Initial Scroll Indicator (Bottom Center) */}
        <motion.div
          style={{ opacity: opacityPhase1 }}
          className="absolute bottom-8 z-20 pointer-events-none flex flex-col items-center space-y-2 select-none"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#EDE8E0]/60 font-sans">
            Scroll to Disassemble
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#C9A05C]" />
          </motion.div>
        </motion.div>

        {/* =========================================================================
            NARRATIVE OVERLAYS (Alternating sides, smooth fading at designated ranges)
           ========================================================================= */}

        {/* Phase 1: Assembled (0% – 20%) - Centered */}
        <motion.div
          style={{ opacity: opacityPhase1, y: yPhase1 }}
          className="absolute inset-0 pointer-events-none flex flex-col items-center justify-start pt-28 sm:pt-36 px-6 text-center z-10"
        >
          <div className="max-w-2xl mx-auto">
            <span className="label-caps mb-3 inline-block">
              Maison d&apos;Optique Genève
            </span>
            <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#EDE8E0] mb-4">
              Astronomia Luxe
            </h1>
            <p className="editorial-sub text-xl sm:text-2xl md:text-3xl text-[#C9A05C]/90 font-light">
              Vision, refined to its essence.
            </p>
          </div>
        </motion.div>

        {/* Phase 2: Frame separates (20% – 45%) - Positioned on Left */}
        <motion.div
          style={{ opacity: opacityPhase2, y: yPhase2 }}
          className="absolute inset-0 pointer-events-none flex items-end sm:items-center justify-start pb-24 sm:pb-0 px-6 sm:px-12 lg:px-24 z-10"
        >
          <div className="max-w-md lg:max-w-lg text-left">
            <span className="label-caps mb-3 block">
              Architectural Separation · Phase I
            </span>
            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-[#EDE8E0] mb-4">
              Precision in every perspective.
            </h2>
            <div className="w-12 h-[1px] bg-[#C9A05C]/40 mb-4" />
            <p className="text-xs sm:text-sm text-[#EDE8E0]/75 font-sans leading-relaxed tracking-wide">
              Crystal-clear optical lenses detach smoothly from hand-polished rose-gold
              titanium rims. The precision-engineered central bridge maintains structural
              harmony, anchoring a composition born of aerospace geometry.
            </p>
          </div>
        </motion.div>

        {/* Phase 3: Engineering exposed (45% – 75%) - Positioned on Right */}
        <motion.div
          style={{ opacity: opacityPhase3, y: yPhase3 }}
          className="absolute inset-0 pointer-events-none flex items-end sm:items-center justify-end pb-24 sm:pb-0 px-6 sm:px-12 lg:px-24 z-10"
        >
          <div className="max-w-md lg:max-w-lg text-left sm:text-right">
            <span className="label-caps mb-3 block">
              Micro-Engineering · Phase II
            </span>
            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-[#EDE8E0] mb-4">
              Every detail. Nothing accidental.
            </h2>
            <div className="w-12 h-[1px] bg-[#C9A05C]/40 mb-4 sm:ml-auto" />
            <p className="text-xs sm:text-sm text-[#EDE8E0]/75 font-sans leading-relaxed tracking-wide">
              Intricate micro-hinges float into relief alongside bespoke flat-head screws
              and calibrated metallic connectors. Each component is individually machined
              to 20-micron tolerances, ensuring frictionless rotation and eternal longevity.
            </p>
          </div>
        </motion.div>

        {/* Phase 4: Fully exploded (75% – 100%) - Completely clean exploded view with zero obscuring cards */}
      </div>
    </div>
  );
}
