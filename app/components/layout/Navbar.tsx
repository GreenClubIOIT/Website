'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const JOIN_LINK = process.env.NEXT_PUBLIC_GOOGLE_FORM_LINK; 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Chat', href: '/chat' }, 
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-[#FEFFFD]/80 backdrop-blur-md py-3 shadow-sm border-[#1C3D2E]/20" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">
        
        {/* 1. Left Side: Logo */}
        <Link href="/" className="flex items-center gap-3 group z-20">
            {/* Logo Image */}
            <div className="relative w-12 h-12 group-hover:scale-105 transition-transform duration-300">
               <Image 
                 src="/logo (2).svg" 
                 alt="Green Club Logo" 
                 fill
                 className="object-contain"
               />
            </div>
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none text-[#1C3D2E]">GREEN CLUB</span>
              <span className="text-[10px] tracking-[0.2em] font-bold text-[#1C3D2E]/60 uppercase">AISSMS IOIT</span>
            </div>
        </Link>

        {/* 2. Center: Floating Pill Navbar (Desktop Only) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-[#1C3D2E]/10 px-2 py-1.5 rounded-full shadow-lg shadow-[#1C3D2E]/5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                        key={link.name} 
                        href={link.href}
                        className={cn(
                            "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            isActive 
                                ? "text-[#1C3D2E] bg-[#DDF5C8] shadow-sm font-semibold" 
                                : "text-stone-600 hover:text-[#1C3D2E] hover:bg-[#DDF5C8]/30"
                        )}
                    >
                        {link.name}
                    </Link>
                  );
                })}
            </div>
        </div>

        {/* 3. Right Side: Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4 z-20">
            <div className="hidden md:block">
                <Button 
                    asChild 
                    className="rounded-full bg-[#1C3D2E] text-white hover:bg-[#2A5240] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#1C3D2E]/20 border border-transparent"
                >
                    <a href={JOIN_LINK} target="_blank" rel="noreferrer">
                        Become a Volunteer
                    </a>
                </Button>
            </div>

            <button 
                className="md:hidden p-2 text-[#1C3D2E] bg-[#DDF5C8]/20 rounded-full hover:bg-[#DDF5C8]/40 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FEFFFD]/95 backdrop-blur-xl border-b border-[#1C3D2E]/10 shadow-xl animate-in slide-in-from-top-5">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-[#1C3D2E] hover:text-[#2A5240] hover:pl-2 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#1C3D2E]/10">
              <Button asChild className="w-full rounded-full bg-[#1C3D2E] text-white">
                 <a href={JOIN_LINK} target="_blank" rel="noreferrer">Become a Volunteer</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}