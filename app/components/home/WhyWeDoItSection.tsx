'use client';

import { useRef, useEffect, useState } from 'react';
import { Leaf, Recycle, Users } from 'lucide-react';
// ✅ Import Anime.js Layout
import { createLayout } from 'animejs'; 

// --- Feature Card Component ---
const FeatureCard = ({ icon, title, desc, color, border }: any) => (
  <div className={`relative group bg-white p-8 rounded-3xl border ${border} shadow-sm hover:shadow-xl transition-all duration-300 h-full`}>
      <div className={`absolute -right-4 -top-4 w-24 h-24 ${color} rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500 blur-2xl`} />
      <div className={`relative mb-5 ${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm`}>
        {icon}
      </div>
      <h3 className="font-heading font-bold text-xl text-[#1C3D2E] mb-3 relative z-10">{title}</h3>
      <p className="text-stone-600 leading-relaxed text-sm relative z-10">{desc}</p>
  </div>
);

export default function WhyWeDoItSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to perform the rotation animation
  const rotateCards = () => {
    const layout = layoutRef.current;
    const root = containerRef.current;

    if (layout && root) {
      // 1. Record current state
      layout.record();

      // 2. Update DOM: Move first child to the end
      const first = root.firstElementChild;
      if (first) {
        root.appendChild(first);
      }

      // 3. Animate the change
      layout.animate({
        duration: 750,
        ease: 'out(4)', // Smooth easing from your snippet
      });
    }
  };

  const startRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(rotateCards, 3000); // 3 Seconds
  };

  const stopRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (containerRef.current) {
      // Initialize Layout Engine
      layoutRef.current = createLayout(containerRef.current);
      
      // Start the loop
      startRotation();
    }

    // Cleanup on unmount
    return () => stopRotation();
  }, []);

  return (
    <section className="relative py-24 bg-white/50 backdrop-blur-sm z-10 border-t border-[#1C3D2E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1C3D2E] mb-4">Why We Do It</h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Our campus is our starting point, but our vision is global.
          </p>
        </div>

        {/* 
            LAYOUT CONTAINER 
            - Added onMouseEnter/Leave to pause animation so user can read
        */}
        <div 
          ref={containerRef}
          className="layout-container grid grid-cols-1 md:grid-cols-3 gap-8"
          onMouseEnter={stopRotation}
          onMouseLeave={startRotation}
        >
          {/* 
             NOTE: Each card needs a unique key or ID logic if data was dynamic, 
             but for static DOM rotation, Anime.js handles the elements directly.
          */}
          
          {/* Card 1 */}
          <div className="w-full">
            <FeatureCard 
              icon={<Leaf className="w-6 h-6 text-[#1C3D2E]" />}
              title="Biodiversity"
              desc="Restoring native flora through active plantation drives at Kanifnath Tekdi."
              color="bg-green-50"
              border="border-green-100"
            />
          </div>

          {/* Card 2 */}
          <div className="w-full">
            <FeatureCard 
              icon={<Recycle className="w-6 h-6 text-emerald-700" />}
              title="Waste Management"
              desc="Systematic E-waste collection and plastic-free campus initiatives."
              color="bg-emerald-50"
              border="border-emerald-100"
            />
          </div>

          {/* Card 3 */}
          <div className="w-full">
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-teal-700" />}
              title="Community"
              desc="Over 30+ active student volunteers bridging technology and nature."
              color="bg-teal-50"
              border="border-teal-100"
            />
          </div>
        </div>

      </div>
    </section>
  );
}