'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Define color palettes
const THEMES = {
  green: ["#DDF5C8", "#A3CFA0", "#2A5240"], // Fresh, Dim, Dark Green
  yellow: ["#FCD34D", "#F59E0B", "#D97706", "#FEF3C7"], // Light Amber, Amber, Dark Orange, Pale Yellow
};

const LeafIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L12.5 2.5C14 4 18 9 18 14C18 17.3137 15.3137 20 12 20C8.68629 20 6 17.3137 6 14C6 9 10 4 11.5 2.5L12 2Z" />
    <path d="M12 22V10" stroke={color} strokeWidth="1" strokeLinecap="round" style={{ filter: 'brightness(0.8)' }}/>
  </svg>
);

interface FallingLeavesProps {
  theme?: 'green' | 'yellow';
  count?: number;
}

export default function FallingLeaves({ theme = 'green', count = 25 }: FallingLeavesProps) {
  const [leaves, setLeaves] = useState<number[]>([]);

  useEffect(() => {
    setLeaves(Array.from({ length: count }, (_, i) => i));
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((i) => (
        <Leaf
          key={i}
          theme={theme}
          delay={Math.random() * 5}
          duration={15 + Math.random() * 10}
          xStart={Math.random() * 100}
        />
      ))}
    </div>
  );
}

function Leaf({ theme, delay, duration, xStart }: { theme: 'green' | 'yellow', delay: number; duration: number; xStart: number }) {
  const size = 15 + Math.random() * 25;
  
  // Pick a random color from the selected theme
  const colors = THEMES[theme];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      initial={{ y: -100, x: `${xStart}vw`, opacity: 0, rotate: 0 }}
      animate={{ 
        y: "110vh", 
        x: `${xStart + (Math.random() * 30 - 15)}vw`, // Drift
        opacity: [0, 0.8, 0.8, 0],
        rotate: 360 + Math.random() * 180 
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
      style={{ position: "absolute", width: size, height: size }}
    >
      <LeafIcon color={color} />
    </motion.div>
  );
}