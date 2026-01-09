"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Calendar, MapPin, Users, CheckCircle2, Sprout, 
  Leaf, ArrowRight, Sparkles 
} from "lucide-react";

// Effects & Components
import FallingLeaves from "@/app/components/effects/FallingLeaves";
import RotatingEarth from "@/app/components/effects/RotatingEarth";
import { Button } from "@/app/components/ui/Button";

// GSAP & Lenis
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// --- MAGNETIC COMPONENT ---
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
};

// --- DATA ---
const events = [
  {
    id: 1,
    title: "Tree Plantation Drive",
    date: "15 Aug 2025",
    fullDate: "August 15, 2025",
    time: "2:00 PM - 3:30 PM",
    location: "Kanifnath Tekdi, Bopgaon",
    category: "Field Drive",
    description: "Celebrating Independence Day with a commitment to the environment. We planted 100 native (desi) tree saplings to promote biodiversity and restore the local ecosystem.",
    highlights: ["100 Native Saplings Planted", "Faculty & Student Participation", "Partnered with Swayamprerak NGO"],
    status: "Completed",
    image: "/kanifnath.png"
  },
  {
    id: 2,
    title: "Pollution-Free Diwali",
    date: "12 April 2025",
    fullDate: "April 12, 2025",
    time: "3:00 PM - 5:30 PM",
    location: "Botanical Study Site, PCMC",
    category: "Awareness",
    description: "A hands-on learning activity focused on understanding plant diversity, medicinal plants and the role of greenery in maintaining ecological balance.",
    highlights: ["Identification of medicinal & native plants", "Learning plant care and ecology", "Practical exposure to botany concepts"],
    status: "Completed",
    image: "/botanical_plant.png"
  },
  {
    id: 3,
    title: "PCMC Water Treatment Plant",
    date: "12 April 2025",
    fullDate: "April 12, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "PCMC Water Treatment Plant",
    category: "Awareness",
    description: "An educational industrial visit to understand the complete process of water treatment and public water supply management.",
    highlights: ["Understanding sedimentation, filtration & chlorination", "Exposure to real-time municipal infrastructure", "Guided by PCMC officials"],
    status: "Completed",
    image: "/pcmc_water.png"
  },
  {
    id: 4,
    title: "Pawna River Awareness Camp",
    date: "16 March 2025",
    fullDate: "March 16, 2025",
    time: "10:00 AM - 5:30 PM",
    location: "Pawna River Region",
    category: "Field Drive",
    description: "A focused awareness initiative addressing river pollution, its impact on ecosystems, and the role of community participation.",
    highlights: ["Study of river pollution and its effects", "Promoted responsible waste disposal","Awareness sessions with local residents" ],
    status: "Completed",
    image: "/pawna_river.png"
  },
  {
    id: 5,
    title: "Plastic Cleanliness Drive",
    date: "1 March 2025",
    fullDate: "March 1, 2025",
    time: "10:00 AM - 5:30 PM",
    location: "Lohagad Fort",
    category: "Field Drive",
    description: "A cleanliness and awareness drive aimed at removing plastic waste from a heritage site and promoting responsible tourism.",
    highlights: ["Plastic waste collection at Lohagad Fort", "Awareness among trekkers and visitors", "Promoted plastic-free heritage conservation"],
    status: "Completed",
    image: "/lohagad_plastic.png"
  },
  {
    id: 6,
    title: "E-Waste Collection Drive",
    date: "6 Feb 2025",
    fullDate: "Feburary 6, 2025",
    time: "10:00 AM - 5:30 PM",
    location: "AISSMS IOIT Campus, Pune",
    category: "Awareness",
    description: "Promoting responsible disposal of electronic waste and creating awareness about environmental and health hazards caused by improper e-waste management.",
    highlights: ["Collection of household & academic e-waste", "Active participation from students & faculty", "In collaboration with Swayamprerak NGO"],
    status: "Completed",
    image: "/zero_e_waste.jpg", 
  },
];

export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- STATE FOR STARS ---
  const [stars, setStars] = useState<Array<{
    id: number; top: string; left: string; size: string; delay: number; duration: number; initialOpacity: number; initialScale: number;
  }>>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.8 ? '3px' : '2px',
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      initialOpacity: Math.random() * 0.5 + 0.1,
      initialScale: Math.random() * 0.5 + 0.5
    }));
    setStars(generatedStars);
  }, []);

  // --- LENIS & GSAP SETUP ---
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
        ScrollTrigger.matchMedia({
            "(min-width: 768px)": function() {
                const sections = gsap.utils.toArray(".horizontal-item");
                
                if(horizontalTrackRef.current && horizontalSectionRef.current) {
                    gsap.to(sections, {
                        xPercent: -100 * (sections.length - 1),
                        ease: "none",
                        scrollTrigger: {
                            trigger: horizontalSectionRef.current,
                            pin: true,
                            scrub: 1,
                            snap: 1 / (sections.length - 1),
                            end: "+=3500", 
                        }
                    });
                }
            }
        });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-cream relative overflow-x-hidden selection:bg-[#DDF5C8] selection:text-[#1C3D2E]">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
         <FallingLeaves theme="green" count={20} />
      </div>
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-emerald-400/20 rounded-full blur-[100px] -z-10 opacity-50" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-green-300/30 rounded-full blur-[100px] -z-10 opacity-40" />

      {/* --- HEADER --- */}
      <section className="pt-32 pb-8 text-center max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-[#1C3D2E]/10 shadow-sm text-[#1C3D2E] text-sm font-semibold tracking-wide mb-6"
        >
           <Sprout size={14} className="text-[#2A5240] fill-current" />
           <span>Our Impact Report</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-bold text-4xl md:text-6xl text-[#1C3D2E] mb-6 leading-tight"
        >
          Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C3D2E] to-emerald-600">Initiatives</span>
        </motion.h1>
      </section>

      {/* --- CONNECTOR PATH (Desktop Only) --- */}
      {/* This SVG visually connects the Header to the "Our Timeline" section below */}
      {isMounted && (
        <div className="hidden md:block absolute top-[280px] left-0 w-full h-[250px] pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1440 250" preserveAspectRatio="none">
                <motion.path
                  d="M 720 0 C 720 100, 300 50, 200 220" 
                  fill="none"
                  stroke="#1C3D2E"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.15 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                />
                <circle cx="720" cy="0" r="4" fill="#1C3D2E" className="opacity-20" />
                <path d="M 190 210 L 200 230 L 210 210 Z" fill="#1C3D2E" className="opacity-10" />
            </svg>
        </div>
      )}


      {/* --- MOBILE: VERTICAL LAYOUT (Visible < md) --- */}
      <section className="md:hidden max-w-7xl mx-auto px-4 pb-32 relative z-10 pt-10">
        <div className="space-y-12">
            {events.map((event) => (
            <div key={`mob-${event.id}`} className="flex flex-col gap-6">
                <div className="relative w-full h-[250px] rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase text-[#1C3D2E] rounded-md">
                        {event.status}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-stone-500">
                        <span className="flex items-center gap-1 bg-white px-2 py-1 rounded border shadow-sm">
                            <Calendar size={12} /> {event.fullDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin size={12} /> {event.location}
                        </span>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-[#1C3D2E]">{event.title}</h2>
                    <p className="text-sm text-stone-600 leading-relaxed">{event.description}</p>
                    
                    <div className="bg-white/50 p-4 rounded-xl border border-[#1C3D2E]/5">
                        <ul className="space-y-2">
                        {event.highlights.slice(0, 2).map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                                <CheckCircle2 size={12} className="text-green-700 mt-0.5" />
                                <span>{h}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </section>
      
      {/* --- DESKTOP: HORIZONTAL SCROLL (Visible >= md) --- */}
      <section 
        ref={horizontalSectionRef} 
        className="hidden md:flex flex-col justify-center min-h-screen overflow-hidden py-10 relative z-10"
      >
        <div ref={horizontalTrackRef} className="flex px-[10vw] gap-[5vw] w-fit items-center">
            
            {/* Intro Card - Updated to align with the connector line */}
            <div className="horizontal-item w-[300px] flex-shrink-0 flex flex-col justify-center pt-20">
                 <div className="p-8 border-l-4 border-[#1C3D2E] relative bg-gradient-to-r from-[#1C3D2E]/5 to-transparent rounded-r-2xl">
                    <div className="absolute -top-10 -left-1.5 w-3 h-3 bg-[#1C3D2E] rounded-full animate-ping" />
                    <h3 className="text-3xl font-bold text-[#1C3D2E] mb-4">Our Timeline</h3>
                    <p className="text-stone-600">
                        From planting seeds to cleaning rivers, follow our journey of impact across the year.
                    </p>
                    <ArrowRight className="mt-8 text-[#1C3D2E] animate-bounce" size={32} />
                 </div>
            </div>

            {/* Event Cards */}
            {events.map((event) => (
                <div 
                    key={`desk-${event.id}`} 
                    className="horizontal-item w-[70vw] max-w-[1000px] flex-shrink-0 flex items-center gap-10"
                >
                    <div className="w-full bg-white rounded-[2rem] p-4 shadow-xl shadow-[#1C3D2E]/5 border border-[#1C3D2E]/5 flex h-[60vh] transition-transform duration-500 hover:-translate-y-2">
                        <div className="w-1/2 h-full relative rounded-[1.5rem] overflow-hidden group">
                            <Image 
                                src={event.image} 
                                alt={event.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1C3D2E]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        <div className="w-1/2 p-8 flex flex-col justify-center relative">
                            <div className="absolute top-8 right-8 bg-[#DDF5C8] text-[#1C3D2E] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
                                {event.date}
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-stone-500 text-sm font-medium">
                                    <MapPin size={16} className="text-green-600" />
                                    {event.location}
                                </div>

                                <h2 className="font-heading text-4xl font-bold text-[#1C3D2E] leading-tight">
                                    {event.title}
                                </h2>

                                <p className="text-lg text-stone-600 leading-relaxed">
                                    {event.description}
                                </p>

                                <div className="pt-4 border-t border-dashed border-stone-200">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#1C3D2E] mb-3 flex items-center gap-2">
                                        <Leaf size={14} /> Highlights
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {event.highlights.map((h, i) => (
                                            <div key={i} className="flex items-center gap-3 text-stone-700 bg-stone-50 px-3 py-2 rounded-lg">
                                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                                                <span className="text-sm">{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-[#1C3D2E] rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-[#1C3D2E]/30 min-h-[400px]">
          
          <div className="relative z-20 p-10 md:p-16 w-full md:w-1/2 flex flex-col justify-center h-full">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF5C8]/10 border border-[#DDF5C8]/20 text-[#DDF5C8] text-xs font-bold tracking-widest uppercase mb-6 w-fit">
                <Users size={14} /> Join The Movement
             </div>
             
             <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
               Be part of the <br/>
               <span className="text-[#DDF5C8] italic">Living Solution.</span>
             </h2>
             
             <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-md">
               Our initiatives are growing, just like our community. Join 30+ volunteers and help us shape a sustainable future.
             </p>

             <div className="relative z-30">
               <Magnetic>
                 <Button asChild size="lg" className="h-14 px-10 rounded-full bg-[#DDF5C8] text-[#1C3D2E] hover:bg-white transition-colors shadow-[0_0_20px_rgba(221,245,200,0.3)] text-lg font-bold">
                    <a href={process.env.NEXT_PUBLIC_GOOGLE_FORM_LINK} target="_blank" rel="noopener noreferrer">
                        Become a Volunteer
                    </a>
                 </Button>
               </Magnetic>
             </div>
          </div>

          <div className="relative w-full md:w-1/2 h-[300px] md:h-[500px] bg-gradient-to-br from-[#1C3D2E] to-[#0F261C] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_90%)] pointer-events-none z-10 opacity-50" />
              
              <div className="absolute inset-0 z-0">
                 {stars.map((star) => (
                   <motion.div
                     key={star.id}
                     className="absolute bg-white rounded-full"
                     initial={{ opacity: star.initialOpacity, scale: star.initialScale }}
                     animate={{ 
                       opacity: [0.2, 0.8, 0.2], 
                       scale: [1, 1.2, 1] 
                     }}
                     transition={{
                       duration: star.duration,
                       repeat: Infinity,
                       ease: "easeInOut",
                       delay: star.delay
                     }}
                     style={{
                       width: star.size,
                       height: star.size,
                       top: star.top,
                       left: star.left,
                     }}
                   />
                 ))}
                 
                 <motion.div 
                   className="absolute h-[1px] w-[60px] bg-gradient-to-r from-transparent via-white to-transparent"
                   initial={{ top: "10%", left: "80%", opacity: 0, rotate: -45 }}
                   animate={{ top: "40%", left: "40%", opacity: [0, 1, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5, ease: "easeOut" }}
                 />
              </div>

              <div className="relative z-20 w-full h-full">
                  <RotatingEarth />
              </div>
          </div>

        </div>
      </section>
    </div>
  );
}