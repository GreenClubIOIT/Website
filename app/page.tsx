"use client";

import FallingLeaves from "@/app/components/effects/FallingLeaves";
import Magnetic from "@/app/components/ui/Magnetic";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Leaf, Sprout, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti"; 
import WhyWeDoItSection from "@/app/components/home/WhyWeDoItSection";
import QuoteSection from "@/app/components/home/QuoteSection"; 

// Register Plugins
gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

export default function Home() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  // --- CONFETTI FUNCTION ---
  const handleConfetti = () => {
    const scalar = 3;
    const leaf = confetti.shapeFromText({ text: '🍃', scalar });

    confetti({
      particleCount: 30,
      scalar: 2,
      spread: 100,
      origin: { y: 0.6 }, 
      colors: ['#1C3D2E', '#DDF5C8', '#22c55e'], 
      shapes: [leaf, 'circle'], 
      ticks: 200, 
      gravity: 0.8,
    });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. SCRAMBLE TEXT
      if (textRef.current) {
        const finalMessage = "We are the student force driving sustainability. From restoring Kanifnath Tekdi to transforming campus waste into resources.";
        
        textRef.current.textContent = finalMessage;
        const height = textRef.current.offsetHeight;
        textRef.current.style.height = `${height}px`;

        gsap.fromTo(textRef.current, 
          { opacity: 0.5, fontFamily: 'monospace', color: "#86efac" },
          {
            opacity: 1, duration: 4, ease: "power4.out", fontFamily: 'inherit', color: "#57534e",
            scrambleText: { text: finalMessage, chars: "lowercase", revealDelay: 0.55, speed: 1, tweenLength: false },
            onComplete: () => {
              if (textRef.current) {
                textRef.current.style.height = "auto";
                textRef.current.style.fontFamily = ""; 
              }
            }
          }
        );
      }

      // 2. PARALLAX IMAGE
      if (imageContainerRef.current && imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20, ease: "none",
          scrollTrigger: { trigger: imageContainerRef.current, start: "top bottom", end: "bottom top", scrub: true }
        });
      }

      // 3. COUNTING STATS
      if (countRef.current) {
        gsap.from(countRef.current, {
          textContent: 0, duration: 2.5, ease: "power1.out", snap: { textContent: 1 },
          scrollTrigger: { trigger: countRef.current, start: "top 85%", once: true }
        });
      }

    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-cream">
      
      <FallingLeaves />
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-emerald-400/20 rounded-full blur-[100px] -z-10 opacity-50" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-green-300/30 rounded-full blur-[100px] -z-10 opacity-40" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 relative z-10 text-left">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#1C3D2E]/5 border border-[#1C3D2E]/10 text-[#1C3D2E] text-sm font-semibold tracking-wide w-fit">
              <Sprout size={14} className="text-[#2A5240] fill-current" />
              <span>Green Club AISSMS IOIT</span>
            </div>
            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-[#1C3D2E] leading-[1.1]">
              One Action at a <br/>
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#1C3D2E] to-emerald-600">Time.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#DDF5C8]/60 -z-10 rounded-sm -rotate-2"></span>
              </span>
            </h1>
            <p ref={textRef} className="text-stone-600 text-lg md:text-xl max-w-lg leading-relaxed min-h-[60px] overflow-hidden">
              We are the student force driving sustainability. From restoring Kanifnath Tekdi to transforming campus waste into resources.
            </p>
            <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button onClick={handleConfetti} asChild className="h-14 px-8 rounded-2xl bg-[#1C3D2E] text-white hover:bg-[#1C3D2E]/90 transition-all shadow-xl shadow-[#1C3D2E]/20 text-base font-semibold cursor-pointer">
                    <Link href="/events" className="flex items-center gap-2">Explore Our Impact <ArrowRight size={18} /></Link>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button asChild variant="ghost" className="h-14 px-6 bg-white border-2 border-[#1C3D2E] text-[#1C3D2E] hover:bg-[#DDF5C8] hover:text-[#1C3D2E] text-base font-bold rounded-2xl transition-all">
                    <Link href="/about" className="flex items-center gap-2">Read Our Mission <ChevronRight size={18} /></Link>
                  </Button>
                </Magnetic>
            </div>
            <div className="pt-4 flex items-center gap-4 text-sm text-stone-500">
              <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-stone-300"></div> 
                    </div>
                  ))}
              </div>
              <p><span className="font-bold text-[#1C3D2E]">30+</span> Volunteers Joined</p>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block h-full min-h-[500px]">
              <div ref={imageContainerRef} className="absolute top-0 right-0 w-[90%] h-[85%] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#1C3D2E]/10 border-[6px] border-white rotate-2 z-10">
                <div ref={imageRef} className="absolute -top-[10%] left-0 w-full h-[120%] bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop')] bg-cover bg-center will-change-transform"></div>
              </div>
              <div className="absolute bottom-10 left-4 w-48 bg-white p-4 rounded-2xl shadow-xl shadow-stone-200/50 border border-[#DDF5C8] z-20 animate-bounce-slow">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#DDF5C8] rounded-full flex items-center justify-center text-[#1C3D2E]"><Leaf size={20} /></div>
                    <div>
                      <p className="text-xs text-stone-400 font-bold uppercase">Total Planted</p>
                      <p className="text-xl font-bold text-[#1C3D2E]"><span ref={countRef}>300</span>+</p>
                    </div>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="w-[80%] bg-[#1C3D2E] h-full rounded-full"></div>
                </div>
              </div>
          </div>

        </div>
      </section>

      {/* --- ✅ REPLACED STATS SECTION WITH NEW COMPONENT --- */}
      <WhyWeDoItSection />

      {/* --- BIG VISUAL SECTION --- */}
      <QuoteSection />

      <div className="h-20"></div>

    </div>
  );
}