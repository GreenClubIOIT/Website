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


      {/* --- HERO HEADER --- */}
      <section className="pt-32 pb-12 text-center max-w-4xl mx-auto px-4 relative z-10">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-amber-200/40 shadow-sm text-amber-700 text-sm font-semibold tracking-wide mb-6 animate-fade-in-up">
           <Sprout size={14} className="text-amber-500 fill-current" />
           <span>Who We Are</span>
        </div>
        
        <h1 className="font-heading font-bold text-5xl md:text-6xl text-forest mb-6 leading-tight">
          Cultivating <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Change Makers</span>
        </h1>
        
        <p className="text-stone-dark text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Bridging the gap between engineering education and environmental responsibility at AISSMS IOIT.
        </p>
      </section>


      {/* --- VISION SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 mb-24 relative z-10">
        <div className="bg-forest rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-forest/20 group">
          
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          
          {/* Accent Leaf inside the card (Yellow now) */}
          <Leaf className="absolute -bottom-10 -right-10 w-64 h-64 text-amber-500/10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-amber-400 mb-8 flex items-center justify-center gap-3">
               <Globe className="w-8 h-8" /> Our Vision
            </h2>
            <p className="text-2xl md:text-3xl font-medium text-cream leading-normal">
              "To cultivate environmentally responsible engineers and citizens by promoting sustainability, ecological balance, and green innovation within the campus and society."
            </p>
            <div className="mt-8 w-24 h-1 bg-amber-500/50 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>


      {/* --- MISSION & OBJECTIVES --- */}
      <section className="max-w-7xl mx-auto px-4 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: MISSION */}
          <div className="space-y-8">
            <div className="space-y-4">
               <h2 className="font-heading text-4xl font-bold text-forest">Our Mission</h2>
               <p className="text-stone-dark text-lg">
                 We don't just talk about change; we engineer it. Here is how we plan to transform our campus into a model of sustainability.
               </p>
            </div>

            <div className="space-y-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <ObjectiveCard 
                 icon={<Leaf />} 
                 title="Reduce Footprint" 
                 desc="Minimize the environmental impact of institutional activities." 
                 color="text-emerald-600"
                 bg="bg-emerald-50"
               />
               <ObjectiveCard 
                 icon={<Users />} 
                 title="Build Leadership" 
                 desc="Foster social responsibility and leadership skills in students." 
                 color="text-blue-600"
                 bg="bg-blue-50"
                 delay="delay-100"
               />
               <ObjectiveCard 
                 icon={<Lightbulb />} 
                 title="Green Innovation" 
                 desc="Encourage students to develop eco-friendly tech solutions." 
                 color="text-amber-600"
                 bg="bg-amber-50"
                 delay="delay-200"
               />
               <ObjectiveCard 
                 icon={<Target />} 
                 title="Collaboration" 
                 desc="Strengthen ties with NGOs, schools, and local bodies." 
                 color="text-purple-600"
                 bg="bg-purple-50"
                 delay="delay-300"
               />
            </div>
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