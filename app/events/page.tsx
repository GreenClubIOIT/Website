import FallingLeaves from "@/app/components/effects/FallingLeaves";
import { Button } from "@/app/components/ui/Button";
import RotatingEarth from "@/app/components/effects/RotatingEarth";
import { Calendar, MapPin, Users, CheckCircle2, Sprout } from "lucide-react";
import Image from "next/image";

// Using distinct images for the demo
const IMG_PLANTATION = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop";
const IMG_DIWALI = "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2670&auto=format&fit=crop";

export default function EventsPage() {
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
      image: IMG_PLANTATION
    },
    {
      id: 2,
      title: "Pollution-Free Diwali",
      date: "15 Oct 2025",
      fullDate: "October 15, 2025",
      time: "3:00 PM - 5:30 PM",
      location: "MPH, AISSMS IOIT, Pune",
      category: "Awareness",
      description: "An enlightening session with Mr. Sagar Dani encouraging students to celebrate an eco-friendly Diwali. Students showcased 'Technosavi' ideas for a cleaner festival.",
      highlights: ["Expert Talk on Eco-Festivals", "Innovative Student Projects", "Green Diwali Pledge Taken"],
      status: "Completed",
      image: IMG_DIWALI
    }
  ];

  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden selection:bg-[#DDF5C8] selection:text-[#1C3D2E]">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <FallingLeaves theme="green" count={20} />
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-emerald-400/20 rounded-full blur-[100px] -z-10 opacity-50" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-green-300/30 rounded-full blur-[100px] -z-10 opacity-40" />


      {/* --- HEADER --- */}
      <section className="pt-32 pb-16 text-center max-w-4xl mx-auto px-4 relative z-10">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-[#1C3D2E]/10 shadow-sm text-[#1C3D2E] text-sm font-semibold tracking-wide mb-6 animate-fade-in-up">
           <Sprout size={14} className="text-[#2A5240] fill-current" />
           <span>Our Impact Report</span>
        </div>
        
        <h1 className="font-heading font-bold text-4xl md:text-6xl text-[#1C3D2E] mb-6 leading-tight">
          Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C3D2E] to-emerald-600">Initiatives</span>
        </h1>
        
        <p className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          From hands-on plantation drives to interactive seminars, look back at how we are making a difference.
        </p>
      </section>


      {/* --- EVENTS LIST --- */}
      <section className="max-w-6xl mx-auto px-4 pb-32 relative z-10 space-y-24">
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className={`flex flex-col gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >
            
            {/* IMAGE SIDE */}
            <div className="w-full md:w-1/2 relative group">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-[2rem] overflow-hidden shadow-xl shadow-[#1C3D2E]/10 border-4 border-white">
                <Image 
                  src={event.image} 
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md py-1 px-3 rounded-full text-xs font-bold text-[#1C3D2E] uppercase tracking-wider shadow-sm">
                  {event.status}
                </div>
              </div>
              <div className={`absolute -inset-4 rounded-[2.5rem] -z-10 opacity-60 blur-2xl ${index % 2 === 0 ? 'bg-[#DDF5C8]/40 -rotate-2' : 'bg-emerald-200/40 rotate-2'}`}></div>
            </div>


            {/* CONTENT SIDE */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center flex-wrap gap-4 text-sm font-medium text-stone-500">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-stone-100 shadow-sm text-[#1C3D2E]">
                  <Calendar size={14} /> {event.fullDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#2A5240]" /> {event.location}
                </span>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1C3D2E] leading-tight">
                {event.title}
              </h2>
              
              <p className="text-stone-600 text-lg leading-relaxed">
                {event.description}
              </p>

              <div className="bg-[#1C3D2E]/5 rounded-2xl p-6 border border-[#1C3D2E]/5">
                <h4 className="font-bold text-[#1C3D2E] mb-3 flex items-center gap-2">
                  <Users size={18} /> Key Highlights
                </h4>
                <ul className="space-y-2">
                  {event.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-700 text-sm">
                      <CheckCircle2 size={16} className="text-[#2A5240] mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-[#1C3D2E] rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-[#1C3D2E]/30 min-h-[400px]">
          
          {/* TEXT CONTENT (Left Side) */}
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

             <div>
                <Button asChild size="lg" className="h-14 px-10 rounded-full bg-[#DDF5C8] text-[#1C3D2E] hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(221,245,200,0.3)] text-lg font-bold">
                    <a href={process.env.NEXT_PUBLIC_GOOGLE_FORM_LINK} target="_blank" rel="noopener noreferrer">
                        Become a Volunteer
                    </a>
                </Button>
             </div>
          </div>

          {/* 3D SCENE (Right Side) */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[500px] bg-gradient-to-br from-[#1C3D2E] to-[#0F261C]">
              {/* Radial Gradient to make it look like space */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_90%)] pointer-events-none z-10 opacity-50" />
              
              {/* THE EARTH */}
              <RotatingEarth />
          </div>

        </div>
      </section>

    </div>
  );
}