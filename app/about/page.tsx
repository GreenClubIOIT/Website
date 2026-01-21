import { HeroVisionSection } from "@/app/components/effects/HeroVision";
import { MissionWheel } from "@/app/components/effects/MissionWheel";
import { ObjectivesGrid } from "@/app/components/effects/ObjectivesGrid";
import FallingLeaves from "@/app/components/effects/FallingLeaves";
import { Sprout, Target, Lightbulb, Users, Globe, CheckCircle2, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden selection:bg-amber-200 selection:text-amber-900">
      
      {/* --- YELLOW LEAVES ANIMATION --- */}
      <FallingLeaves theme="yellow" count={30} />

      {/* --- WARM AMBIENT GLOW (Yellow/Orange Blobs) --- */}
      {/* Top Right: Warm Amber Glow */}
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-amber-400/20 rounded-full blur-[100px] -z-10 opacity-50" />
      {/* Bottom Left: Soft Orange Glow */}
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-orange-300/30 rounded-full blur-[100px] -z-10 opacity-40" />

      {/* 1. HERO & VISION (Combined with smooth transitions) */}
      <HeroVisionSection />


      {/* --- MISSION & OBJECTIVES --- */}
      <section className="max-w-7xl mx-auto px-4 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: MISSION */}
          <div className="space-y-8">
            <div className="space-y-4">
               <h2 className="font-heading text-4xl font-bold text-forest">Our Mission</h2>
               <p className="text-stone-dark text-lg">
                 We don't just talk about change, we engineer it. Here is how we plan to transform our campus into a model of sustainability.
               </p>
            </div>

            {/* --- OPTION A: DESKTOP WHEEL (Visible on LG screens) --- */}
            <div className="hidden lg:block py-4">
              <MissionWheel />
            </div>

            {/* --- OPTION B: MOBILE LIST (Visible on small screens) --- */}
            <div className="space-y-4 lg:hidden">
              <MissionItem text="Create environmental awareness among students and faculty through active drives." />
              <MissionItem text="Encourage sustainable practices like waste reduction, recycling, and energy conservation." />
              <MissionItem text="Engage students in real-world environmental action and community initiatives." />
              <MissionItem text="Transform AISSMS IOIT into a model eco-friendly campus aligned with SDGs." />
            </div>
          </div>


          {/* RIGHT: OBJECTIVES */}
          <div>
            <div className="flex items-center justify-between mb-8">
               <h2 className="font-heading text-3xl font-bold text-forest">Key Objectives</h2>
               <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">Targets</span>
            </div>

             <ObjectivesGrid />
          </div>

        </div>
      </section>

    </div>
  );
}

// --- SUB COMPONENTS ---

function MissionItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-colors border border-transparent hover:border-amber-200/50 group">
      <div className="mt-1 min-w-[24px] w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
        <CheckCircle2 size={14} strokeWidth={3} />
      </div>
      <p className="text-stone-700 font-medium leading-relaxed">{text}</p>
    </div>
  );
}

function ObjectiveCard({ icon, title, desc, color, bg, delay = "" }: { icon: React.ReactNode, title: string, desc: string, color: string, bg: string, delay?: string }) {
  return (
    <div className={`group relative p-6 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${delay}`}>
      <div className={`mb-4 w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="font-heading font-bold text-lg text-forest mb-2">{title}</h3>
      <p className="text-sm text-stone-500 leading-snug">{desc}</p>
      <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out ${color.replace('text-', 'bg-')}`} />
    </div>
  );
}