import Link from 'next/link';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1C3D2E] text-stone-300 border-t border-[#2A5240] relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
                {/* Footer Logo */}
                <div className="relative w-10 h-10 bg-white rounded-full p-1">
                   <Image 
                     src="/logo (2).svg" 
                     alt="Green Club Logo" 
                     fill
                     className="object-contain p-1"
                   />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#FEFFFD]">
                  Green Club
                  <span className="block text-sm font-sans font-normal text-[#DDF5C8]">AISSMS IOIT</span>
                </h3>
            </div>
            
            <p className="text-sm leading-relaxed max-w-xs text-stone-300">
              Cultivating environmentally responsible engineers and citizens for a sustainable future.
            </p>
            <div className="flex space-x-4 pt-2">
              <a target="_blank" href="https://www.instagram.com/greenclub_ioit?igsh=aGR1aXp6Zmdxbzc2" className="hover:text-[#DDF5C8] transition-colors"><Instagram size={20} /></a>
              <a target="_blank" href="https://www.linkedin.com/company/green-club-aissmsioit/" className="hover:text-[#DDF5C8] transition-colors"><Linkedin size={20} /></a>
              <a target="_blank" href="mailto:greenclub@aissmsioit.org" className="hover:text-[#DDF5C8] transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-[#FEFFFD] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-[#DDF5C8] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#DDF5C8] transition-colors">Mission & Vision</Link></li>
              <li><Link href="/events" className="hover:text-[#DDF5C8] transition-colors">Events & Impact</Link></li>
              <li><Link href="/chat" className="hover:text-[#DDF5C8] transition-colors">Ask EcoBot</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-[#FEFFFD] mb-4">Contact</h4>
            <address className="not-italic text-sm space-y-2 text-stone-300">
              <p>AISSMS IOIT,</p>
              <p>Kennedy Road, Near R.T.O,</p>
              <p>Pune - 411001, Maharashtra</p>
            </address>
          </div>
        </div>

        <div className="border-t border-[#2A5240] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400">
          <p>&copy; {currentYear} Green Club AISSMS IOIT. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0 space-x-1">
             <span>Website by</span>
             <a 
               href="https://github.com/chinmaynakwa" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="font-semibold text-[#DDF5C8] hover:underline"
             >
               Chinmay Nakwa
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}