"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Leaf } from "lucide-react";

export default function LeafCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Motion values for raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the "trailing" effect
  // Damping: Higher = less oscillation (stops faster)
  // Stiffness: Higher = follows tighter/faster
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dynamic rotation based on movement
  // When moving left/right, the leaf tilts slightly
  const rotateX = useTransform(smoothX, (current) => {
    const velocity = current - mouseX.get();
    // Clamp the rotation between -45 and 45 degrees
    return Math.max(-45, Math.min(45, velocity * -2)); 
  });

  useEffect(() => {
    // Only enable on devices that have a mouse (no touch screens)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      // Offset by -12px so the leaf center sits on the cursor tip
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on server or touch devices
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        rotate: rotateX,
      }}
    >
      {/* 
         You can change the color/size here. 
         text-emerald-500 or just generic 'white' with mix-blend-difference 
         often looks best for cursors.
      */}
      <Leaf 
        size={24} 
        className="text-[#DDF5C8] drop-shadow-md fill-emerald-600/20" 
        strokeWidth={1.5}
      />
    </motion.div>
  );
}