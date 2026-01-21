'use client';

import { useRef, useEffect } from 'react';
import { Sprout } from 'lucide-react';
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { splitText, animate } from 'animejs';

export default function QuoteSection() {
  const quoteRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!quoteRef.current) return;

    // 1. Split text by WORDS (so we can hover them individually)
    const split = splitText(quoteRef.current, {
      words: true, 
      // We keep chars true so the layout remains consistent, 
      // but we apply the color to the word wrapper.
      chars: true, 
    });

    // 2. Attach Hover Events to EACH WORD
    split.words.forEach((word) => {
      
      // Hover In: Turn Green
      word.addEventListener('mouseenter', () => {
        animate(word, {
          color: '#86EFAC', // A darker, more vibrant green shade
          duration: 200,
          easing: 'easeOutQuad'
        });
      });

      // Hover Out: Return to White
      word.addEventListener('mouseleave', () => {
        animate(word, {
          color: '#FFFFFF',
          duration: 500,
          easing: 'easeOutQuad'
        });
      });
      
      // Optional: Make it feel interactive
      word.style.cursor = 'default';
      word.style.display = 'inline-block'; // Ensures transforms work if needed
    });

    // 3. Cleanup
    return () => {
      split.revert(); // Removes the split wrappers and associated listeners
    };
  }, []);

  return (
    <section className="relative py-32 z-10 overflow-hidden my-10">
      <div className="max-w-7xl mx-auto px-4 rounded-[3rem] overflow-hidden relative min-h-[400px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop')] bg-cover bg-center"></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#1C3D2E]/80 mix-blend-multiply"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <Sprout size={48} className="text-[#DDF5C8] mx-auto mb-6 opacity-80" />
          
          <h2 
            ref={quoteRef}
            className="font-heading text-3xl md:text-5xl font-bold text-white mb-8 leading-tight select-none"
          >
            "We don't inherit the earth from our ancestors, we borrow it from our children."
          </h2>

          <Button asChild size="lg" variant="ghost" className="h-14 px-6 bg-black/20 backdrop-blur-md border border-white/20 text-white ring-1 ring-white/30 hover:bg-[#ddf5c81e] hover:text-[#16965cbd] hover:ring-[#1C3D2E]/40 text-base font-bold rounded-2xl transition-all duration-300 ease-out">
            <Link href="/events">See Our Latest Drive</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}