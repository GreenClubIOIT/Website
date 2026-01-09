"use client";

import FallingLeaves from "@/app/components/effects/FallingLeaves";
import RotatingEarth from "@/app/components/effects/RotatingEarth";
import { Button } from "@/app/components/ui/Button";
import { Calendar, MapPin, Users, CheckCircle2, Sprout, Leaf } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden selection:bg-[#DDF5C8] selection:text-[#1C3D2E]">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <FallingLeaves theme="green" count={20} />
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-emerald-400/20 rounded-full blur-[100px] -z-10 opacity-50" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-green-300/30 rounded-full blur-[100px] -z-10 opacity-40" />

      {/* --- HEADER --- */}
      <section className="pt-32 pb-16 text-center max-w-4xl mx-auto px-4 relative z-10">
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


      {/* --- TIMELINE SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 pb-32 relative z-10">

      {/* CENTRAL STEM (Desktop Only) */}
      <div className="absolute left-1/2 top-0 bottom-32 w-px -translate-x-1/2 hidden md:block
        bg-gradient-to-b from-transparent via-[#1C3D2E]/20 to-transparent
        border-l border-dashed border-[#1C3D2E]/30"
      />

      <div className="space-y-12 md:space-y-24">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`relative flex flex-col items-center gap-8 md:gap-12
              ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >

            {/* CENTRAL NODE */}
            <div className="absolute left-1/2 top-1/2 hidden md:flex
              -translate-x-1/2 -translate-y-1/2
              w-12 h-12 items-center justify-center
              rounded-full bg-cream border-4 border-white
              shadow-md z-10"
            >
              <Leaf size={20} className="text-[#1C3D2E]" />
            </div>

            {/* IMAGE SIDE */}
            {/* IMAGE SIDE */}
            <div className="w-full md:w-1/2 relative group">

              {/* ROTATION WRAPPER */}
              <div className="relative transition-transform duration-500 hover:-rotate-1">

                {/* SHARP CARD */}
                <div className="relative h-[300px] md:h-[400px] w-full
                  border-4 border-white
                  shadow-xl shadow-[#1C3D2E]/10
                  bg-white"
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* STATUS BADGE */}
                  <div className="absolute top-4 left-4
                    bg-white/90 backdrop-blur-md
                    px-3 py-1 text-xs font-bold uppercase tracking-wider
                    text-[#1C3D2E] shadow-sm flex items-center gap-1"
                  >
                    <span className="w-2 h-2 bg-green-500 animate-pulse" />
                    {event.status}
                  </div>
                </div>
              </div>

              {/* DECORATIVE BACKDROP */}
              <div
                className={`absolute -inset-6 -z-10 opacity-50 blur-2xl
                  transition-opacity duration-500 group-hover:opacity-70
                  ${index % 2 === 0
                    ? 'bg-[#DDF5C8]/40'
                    : 'bg-emerald-200/40'
                  }`}
              />
            </div>

            {/* CONTENT SIDE */}
            <div className="w-full md:w-1/2 px-4 md:px-0 space-y-6">

              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-stone-500">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1
                  rounded-lg border border-stone-100 shadow-sm text-[#1C3D2E]"
                >
                  <Calendar size={14} />
                  {event.fullDate}
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#2A5240]" />
                  {event.location}
                </span>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1C3D2E]">
                {event.title}
              </h2>

              <p className="text-lg text-stone-600 leading-relaxed">
                {event.description}
              </p>

              {/* HIGHLIGHTS */}
              <div className="bg-white rounded-2xl p-6
                border border-[#1C3D2E]/10 shadow-sm
                hover:shadow-md transition-shadow"
              >
                <h4 className="mb-3 flex items-center gap-2
                  text-sm font-bold uppercase tracking-wide text-[#1C3D2E]"
                >
                  <Users size={16} />
                  Impact Highlights
                </h4>

                <ul className="space-y-3">
                  {event.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-stone-700">
                      <div className="mt-0.5 p-0.5 bg-green-100 rounded-full">
                        <CheckCircle2 size={14} className="text-green-700" />
                      </div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
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