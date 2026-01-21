"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Lightbulb, Target } from "lucide-react";

const objectives = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Reduce Footprint",
    desc: "Minimize the environmental impact of institutional activities.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-500/50",
    shadow: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Build Leadership",
    desc: "Foster social responsibility and leadership skills in students.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-500/50",
    shadow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Green Innovation",
    desc: "Encourage students to develop eco-friendly tech solutions.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "group-hover:border-amber-500/50",
    shadow: "group-hover:shadow-amber-500/20",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Collaboration",
    desc: "Strengthen ties with NGOs, schools, and local bodies.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-500/50",
    shadow: "group-hover:shadow-purple-500/20",
  },
];

export function ObjectivesGrid() {
  // Track which card is hovered to dim the others
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {objectives.map((obj, index) => (
        <SpotlightCard
          key={index}
          obj={obj}
          index={index}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </div>
  );
}

function SpotlightCard({ obj, index, hoveredIndex, setHoveredIndex }: any) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setHoveredIndex(null);
  };

  const isBlurred = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // SMOOTHER ANIMATION CONFIG HERE:
      animate={{
        scale: isBlurred ? 0.94 : 1, // Subtle scale
        opacity: isBlurred ? 0.5 : 1,
        filter: isBlurred ? "blur(3px)" : "blur(0px)",
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 1, 0.5, 1] // "Soft Quartic" curve
      }}
      className={`relative group rounded-xl border border-stone-200 bg-white p-6 overflow-hidden ${obj.border} hover:shadow-xl ${obj.shadow}`}
      // Added transform-gpu to force hardware acceleration for smoother rendering
      style={{ transform: "translateZ(0)" }} 
    >
      {/* Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.06), transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 ${obj.bg} ${obj.color}`}>
          {obj.icon}
        </div>
        <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-forest transition-colors duration-300">
          {obj.title}
        </h3>
        <p className="text-stone-600 leading-relaxed text-sm">
          {obj.desc}
        </p>
      </div>
    </motion.div>
  );
}