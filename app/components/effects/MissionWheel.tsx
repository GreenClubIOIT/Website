"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const missions = [
  {
    id: 1,
    text: "Create environmental awareness among students and faculty through active drives.",
    highlight: "Awareness",
  },
  {
    id: 2,
    text: "Encourage sustainable practices like waste reduction, recycling, and energy conservation.",
    highlight: "Sustainable Practices",
  },
  {
    id: 3,
    text: "Engage students in real-world environmental action and community initiatives.",
    highlight: "Community Action",
  },
  {
    id: 4,
    text: "Transform AISSMS IOIT into a model eco-friendly campus aligned with SDGs.",
    highlight: "Model Campus",
  },
];

export function MissionWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play: Rotate every 5 seconds (slower for better readability)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % missions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="relative h-[380px] w-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {missions.map((item, index) => {
        const length = missions.length;
        const offset = (index - activeIndex + length) % length;

        // 3D Layout Logic
        // We use slightly larger Y values to give the cards room to breathe
        let y = 0;
        let scale = 1;
        let zIndex = 0;
        let opacity = 1;
        let blur = 0;

        if (offset === 0) {
          y = 0;
          scale = 1;
          zIndex = 20;
          opacity = 1;
          blur = 0;
        } else if (offset === 1) {
          y = 130; // Dropped lower
          scale = 0.85;
          zIndex = 10;
          opacity = 0.5;
          blur = 2;
        } else if (offset === 2) {
          y = 0; 
          scale = 0.7;
          zIndex = 5;
          opacity = 0.0; // Hide the back card completely for cleaner look
          blur = 8;
        } else if (offset === 3) {
          y = -130; // Raised higher
          scale = 0.85;
          zIndex = 10;
          opacity = 0.5;
          blur = 2;
        }

        return (
          <motion.div
            key={item.id}
            className="absolute w-full max-w-lg p-8 rounded-2xl bg-white border border-stone-200 shadow-xl cursor-pointer"
            initial={false}
            animate={{ 
              y, 
              scale, 
              zIndex, 
              opacity, 
              filter: `blur(${blur}px)` 
            }}
            // THIS IS THE KEY TO SMOOTHNESS:
            transition={{
              type: "spring",
              stiffness: 140, // Lower = looser/slower
              damping: 22,    // Controls the "bounciness" (higher = less bounce)
              mass: 1         // Physics weight
            }}
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex gap-4">
              <Quote className="w-8 h-8 text-emerald-600/40 shrink-0 rotate-180 transition-colors duration-500" />
              <div>
                <h4 className="text-emerald-700 font-bold text-lg mb-2">
                  {item.highlight}
                </h4>
                <p className="text-stone-700 text-lg leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            </div>
            
            {offset === 0 && (
              <motion.div 
                layoutId="active-bar"
                className="absolute left-0 top-6 bottom-6 w-1.5 bg-emerald-500 rounded-r-full"
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}