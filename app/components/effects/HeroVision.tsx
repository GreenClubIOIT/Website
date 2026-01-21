"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Sprout, Globe, Leaf } from "lucide-react";

export function HeroVisionSection() {
  return (
    <>
      <HeroSection />
      <VisionSection />
    </>
  );
}

// --- HERO SECTION ---
function HeroSection() {
  return (
    <section className="pt-32 pb-20 text-center max-w-5xl mx-auto px-4 relative z-10">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-200/20 blur-[100px] rounded-full -z-10 opacity-50" />

      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-sm text-amber-700 text-sm font-semibold tracking-wide mb-8"
      >
         <Sprout size={14} className="text-amber-500 fill-current" />
         <span>Who We Are</span>
      </motion.div>
      
      {/* Heading */}
      <h1 className="font-heading font-bold text-5xl md:text-7xl text-forest mb-8 leading-[1.1]">
        <span className="block mb-2">Cultivating</span>
        <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
              Change Makers
            </span>
            <motion.svg
              className="absolute w-full h-3 -bottom-1 left-0 text-amber-400"
              viewBox="0 0 100 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
            >
              <path 
                d="M0 5 Q 50 10 100 5" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="8" 
                className="opacity-40"
              />
            </motion.svg>
        </span>
      </h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
      >
        Bridging the gap between engineering education and environmental responsibility at AISSMS IOIT.
      </motion.p>
    </section>
  );
}


// --- VISION SECTION (UPDATED FOR MAXIMUM TILT) ---
function VisionSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for fluid movement
  const mouseX = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Normalize coordinates -1 to 1
    const xPct = (e.clientX - left - width / 2) / (width / 2);
    const yPct = (e.clientY - top - height / 2) / (height / 2);
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // 1. Card Tilt
  const rotateX = useTransform(mouseY, [-1, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [-1, 1], [-8, 8]);

  // 2. Inner Background Parallax (Moves OPPOSITE to mouse)
  // We move the background image slightly to create depth window effect
  const bgX = useTransform(mouseX, [-1, 1], ["-10px", "10px"]);
  const bgY = useTransform(mouseY, [-1, 1], ["-10px", "10px"]);

  return (
    <section className="max-w-6xl mx-auto px-4 mb-32 relative z-10 perspective-1000">
      
      {/* Decorative dots behind */}
      <div className="absolute top-10 -left-10 w-24 h-24 bg-amber-400/20 rounded-full blur-xl" />
      <div className="absolute bottom-10 -right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl" />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative min-h-[400px] flex items-center justify-center rounded-[2rem] border border-white/40 bg-white/10 backdrop-blur-md shadow-2xl shadow-stone-200/50 group"
      >
        {/* --- LAYER 1: Parallax Background Image (Inside the glass) --- */}
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute inset-2 rounded-[1.8rem] overflow-hidden z-0"
        >
          {/* A subtle abstract nature background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center opacity-20 scale-110 grayscale group-hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </motion.div>

        {/* --- LAYER 2: Glossy Reflection Overlay --- */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/40 via-transparent to-black/5 pointer-events-none z-10" />

        {/* --- LAYER 3: Content (Floating) --- */}
        <div style={{ transform: "translateZ(50px)" }} className="relative z-20 max-w-3xl mx-auto p-10 text-center">
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/30 mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
             <Globe className="text-white w-8 h-8" />
          </div>

          <h2 className="font-heading text-xl font-bold tracking-widest text-stone-500 uppercase mb-6">
            Our Vision
          </h2>

          <p className="text-3xl md:text-4xl font-bold text-stone-800 leading-tight">
            "To cultivate <span className="text-emerald-600">environmentally responsible</span> engineers by promoting sustainability and green innovation."
          </p>

          {/* Signature / Decorative Line */}
          <div className="mt-10 flex items-center justify-center gap-4 opacity-60">
             <div className="h-px w-12 bg-stone-400" />
             <span className="text-sm font-serif italic text-stone-500">AISSMS IOIT</span>
             <div className="h-px w-12 bg-stone-400" />
          </div>

        </div>
      </motion.div>
    </section>
  );
}