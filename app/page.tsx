"use client";

import FallingLeaves from "@/app/components/effects/FallingLeaves";
import Magnetic from "@/app/components/ui/Magnetic";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Leaf, Recycle, Users, Sprout, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti"; // Import Confetti

// Register Plugins
gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

export default function Home() {
  const textRef = useRef<HTMLParagraphElement>(null);
  
  // Parallax Refs
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Stats Ref
  const countRef = useRef<HTMLSpanElement>(null);

  // --- CONFETTI FUNCTION ---
  const handleConfetti = () => {
    // Create a "Leaf" shape from an emoji
    const scalar = 3;
    const leaf = confetti.shapeFromText({ text: '🍃', scalar });

    confetti({
      particleCount: 30,
      scalar: 2,
      spread: 100,
      origin: { y: 0.6 }, // Start slightly below center
      colors: ['#1C3D2E', '#DDF5C8', '#22c55e'], // Brand colors
      shapes: [leaf, 'circle'], // Mix leaves and circles
      ticks: 200, // How long they stay on screen
      gravity: 0.8,
    });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // --- 1. SCRAMBLE TEXT ANIMATION ---
      if (textRef.current) {
        const finalMessage = "We are the student force driving sustainability. From restoring Kanifnath Tekdi to transforming campus waste into resources.";
        
        textRef.current.textContent = finalMessage;
        const height = textRef.current.offsetHeight;
        textRef.current.style.height = `${height}px`;

        gsap.fromTo(textRef.current, 
          {
            opacity: 0.5,
            fontFamily: 'monospace',
            color: "#86efac"
          },
          {
            opacity: 1,
            duration: 4,
            ease: "power4.out",
            fontFamily: 'inherit',
            color: "#57534e",
            scrambleText: {
              text: finalMessage,
              chars: "lowercase",
              revealDelay: 0.55,
              speed: 1,
              tweenLength: false,
            },
            onComplete: () => {
              if (textRef.current) {
                textRef.current.style.height = "auto";
                textRef.current.style.fontFamily = ""; 
              }
            }
          }
        );
      }

      // --- 2. PARALLAX IMAGE ANIMATION ---
      if (imageContainerRef.current && imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20, 
          ease: "none",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top bottom", 
            end: "bottom top",  
            scrub: true,         
          }
        });
      }

      // --- 3. COUNTING STATS ANIMATION ---
      if (countRef.current) {
        gsap.from(countRef.current, {
          textContent: 0, // Animate from 0 to the actual number in HTML
          duration: 2.5,
          ease: "power1.out",
          snap: { textContent: 1 }, // Ensure we only show whole numbers
          scrollTrigger: {
            trigger: countRef.current,
            start: "top 85%", // Start when the number is near the bottom of screen
            once: true, // Only animate once
          }
        });
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-cream">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <FallingLeaves />
      
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-emerald-400/20 rounded-full blur-[100px] -z-10 opacity-50" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-green-300/30 rounded-full blur-[100px] -z-10 opacity-40" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Text Content */}
          <div className="space-y-8 relative z-10 text-left">
            
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#1C3D2E]/5 border border-[#1C3D2E]/10 text-[#1C3D2E] text-sm font-semibold tracking-wide w-fit">
              <Sprout size={14} className="text-[#2A5240] fill-current" />
              <span>Green Club AISSMS IOIT</span>
            </div>
            
            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-[#1C3D2E] leading-[1.1]">
              One Action at a <br/>
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#1C3D2E] to-emerald-600">
                  Time.
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#DDF5C8]/60 -z-10 rounded-sm -rotate-2"></span>
              </span>
            </h1>
            
            <p 
              ref={textRef} 
              className="text-stone-600 text-lg md:text-xl max-w-lg leading-relaxed min-h-[60px] overflow-hidden"
            >
              We are the student force driving sustainability. From restoring Kanifnath Tekdi to transforming campus waste into resources.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
                
                <Magnetic>
                  {/* Added handleConfetti to onClick */}
                  <Button 
                    onClick={handleConfetti} 
                    asChild 
                    className="h-14 px-8 rounded-2xl bg-[#1C3D2E] text-white hover:bg-[#1C3D2E]/90 transition-all shadow-xl shadow-[#1C3D2E]/20 text-base font-semibold cursor-pointer"
                  >
                    <Link href="/events" className="flex items-center gap-2">
                      Explore Our Impact <ArrowRight size={18} />
                    </Link>
                  </Button>
                </Magnetic>
                
                <Magnetic>
                  <Button asChild variant="ghost" className="h-14 px-6 bg-white border-2 border-[#1C3D2E] text-[#1C3D2E] hover:bg-[#DDF5C8] hover:text-[#1C3D2E] text-base font-bold rounded-2xl transition-all">
                    <Link href="/about" className="flex items-center gap-2">
                      Read Our Mission <ChevronRight size={18} />
                    </Link>
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

          {/* RIGHT: Visual Collage */}
          <div className="relative z-10 hidden lg:block h-full min-h-[500px]">
              
              <div 
                ref={imageContainerRef}
                className="absolute top-0 right-0 w-[90%] h-[85%] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#1C3D2E]/10 border-[6px] border-white rotate-2 z-10"
              >
                <div 
                  ref={imageRef}
                  className="absolute -top-[10%] left-0 w-full h-[120%] bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop')] bg-cover bg-center will-change-transform"
                ></div>
              </div>

              {/* FLOATING CARD WITH COUNTING STATS */}
              <div className="absolute bottom-10 left-4 w-48 bg-white p-4 rounded-2xl shadow-xl shadow-stone-200/50 border border-[#DDF5C8] z-20 animate-bounce-slow">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#DDF5C8] rounded-full flex items-center justify-center text-[#1C3D2E]">
                      <Leaf size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400 font-bold uppercase">Total Planted</p>
                      <p className="text-xl font-bold text-[#1C3D2E]">
                        {/* ATTACHED REF TO SPAN */}
                        <span ref={countRef}>300</span>+
                      </p>
                    </div>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="w-[80%] bg-[#1C3D2E] h-full rounded-full"></div>
                </div>
              </div>
          </div>

        </div>
      </section>

      {/* --- STATS & INTRO --- */}
      <section className="relative py-24 bg-white/50 backdrop-blur-sm z-10 border-t border-leaf/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest mb-4">Why We Do It</h2>
            <p className="text-stone-dark max-w-2xl mx-auto text-lg">
              Our campus is our starting point, but our vision is global. We believe in engineering solutions for the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Leaf className="w-6 h-6 text-forest" />}
              title="Biodiversity"
              desc="Restoring native flora through active plantation drives at Kanifnath Tekdi."
              color="bg-green-50"
              border="border-green-100"
            />
            <FeatureCard 
              icon={<Recycle className="w-6 h-6 text-emerald-700" />}
              title="Waste Management"
              desc="Systematic E-waste collection and plastic-free campus initiatives."
              color="bg-emerald-50"
              border="border-emerald-100"
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-teal-700" />}
              title="Community"
              desc="Over 30+ active student volunteers bridging technology and nature."
              color="bg-teal-50"
              border="border-teal-100"
            />
          </div>
        </div>
      </section>

      {/* --- BIG VISUAL SECTION --- */}
      <section className="relative py-32 z-10 overflow-hidden my-10">
        <div className="max-w-7xl mx-auto px-4 rounded-[3rem] overflow-hidden relative min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-forest/80 mix-blend-multiply"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
              <Sprout size={48} className="text-leaf mx-auto mb-6 opacity-80" />
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                "We don't inherit the earth from our ancestors, we borrow it from our children."
              </h2>
              <Button asChild size="lg" variant="ghost" className="h-14 px-6 bg-black/20 backdrop-blur-md border border-white/20 text-white ring-1 ring-white/30 hover:bg-[#ddf5c81e] hover:text-[#16965cbd] hover:ring-[#1C3D2E]/40 text-base font-bold rounded-2xl transition-all duration-300 ease-out">
                <Link href="/events">See Our Latest Drive</Link>
              </Button>
            </div>
        </div>
      </section>

      <div className="h-20"></div>

    </div>
  );
}

function FeatureCard({ icon, title, desc, color, border }: { icon: React.ReactNode, title: string, desc: string, color: string, border: string }) {
  return (
    <div className={`relative group bg-white p-8 rounded-3xl border ${border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
      <div className={`absolute -right-4 -top-4 w-24 h-24 ${color} rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 blur-2xl`} />
      <div className={`relative mb-5 ${color} w-14 h-14 rounded-2xl flex items-center justify-center 
        rotate-3 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 ease-out shadow-sm`}>
        {icon}
      </div>
      <h3 className="font-heading font-bold text-xl text-forest mb-3 relative z-10">{title}</h3>
      <p className="text-stone-dark leading-relaxed text-sm relative z-10">{desc}</p>
    </div>
  )
}