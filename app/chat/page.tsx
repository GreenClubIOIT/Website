'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';
import { Send, Sprout, Bot, User, Sparkles } from 'lucide-react';
import FallingLeaves from "@/app/components/effects/FallingLeaves";
import { Button } from "@/app/components/ui/Button";
import MarkdownMessage from "@/app/components/markdown/MarkdownMessage";
import { cn } from "@/lib/utils";
import { animate, stagger, svg } from 'animejs';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function ChatPage() {

  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    append,
    error,
    reload
  } = useChat({
    api: '/api/chat',
    onError: (err) => console.error('🔴 Client-side useChat error:', err),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);

  const rotationPhysics = useRef({ velocity: 0, angle: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    if (messages.length > 0) setTimeout(scrollToBottom, 100);
  }, [messages.length]);



  useEffect(() => {
    const textDrawables = svg.createDrawable('.line-text');

    animate(textDrawables, {
      draw: ['0 0', '0 1', '1 1'],
      ease: 'inOutQuad',
      duration: 4000,
      delay: stagger(200),
      loop: true

    });
  }, []);


  useEffect(() => {
    const MAX_SPEED = 30;
    const IMPULSE = 5;

    if (input.length > 0) {
        rotationPhysics.current.velocity += IMPULSE;
        if (rotationPhysics.current.velocity > MAX_SPEED) {
            rotationPhysics.current.velocity = MAX_SPEED;
        }
    }
  }, [input]);

  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
        const physics = rotationPhysics.current;
        
        physics.angle += physics.velocity;

        physics.velocity *= 0.95; 

        if (Math.abs(physics.velocity) < 0.1) physics.velocity = 0;

        if (sparkleRef.current) {
            sparkleRef.current.style.transform = `rotate(${physics.angle}deg)`;
        }

        animationFrameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);


  useEffect(() => {
    if (!blob1Ref.current || !blob2Ref.current) return;

    const animation = animate(
      [blob1Ref.current, blob2Ref.current],
      {
        translateX: () => random(-30, 30),
        translateY: () => random(-30, 30),
        scale: [1, 1.1] as any,
        easing: 'easeInOutQuad',
        duration: 4000,
        direction: 'alternate',
        loop: true,
        delay: stagger(500)
      }
    );

    return () => { animation.pause(); }; 
  }, []);


  useEffect(() => {
    if (messages.length === 0 && !error) {
      animate('.suggestion-chip', {
          opacity: [0, 1] as any,
          translateY: [20, 0] as any,
          delay: stagger(150, { start: 500 }),
          easing: 'spring(1, 80, 10, 0)'
      });
    }
  }, [messages.length, error]);

  const handleAnimatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (sendButtonRef.current) {
        animate(sendButtonRef.current, {
            scale: [1, 0.8, 1.1, 1] as any,
            duration: 400,
            easing: 'easeOutElastic(1, .5)'
        });
    }
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-cream selection:bg-[#FDE68A] selection:text-[#78350F] overflow-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div ref={blob1Ref} className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-amber-400/10 rounded-full blur-[80px] -z-20 pointer-events-none opacity-80" />
      <div ref={blob2Ref} className="fixed bottom-0 left-0 w-[30vw] h-[30vw] bg-orange-400/5 rounded-full blur-[80px] -z-20 pointer-events-none opacity-80" />
      <FallingLeaves theme="yellow" count={15} />

      {/* --- HEADER --- */}
      <section className="pt-28 pb-4 px-4 text-center relative z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/80 backdrop-blur-sm border border-[#78350F]/10 shadow-sm text-[#78350F] text-sm font-semibold tracking-wide mb-4 animate-fade-in-up pointer-events-auto">
           <Sprout size={14} className="text-[#92400E] fill-current" />
           <span>Powered by Gemini</span>
        </div>
        
        {/* SVG TEXT HEADER */}
        <div className="h-16 mb-2 flex justify-center items-center">
            <svg viewBox="0 0 320 60" className="w-full max-w-[320px] h-full overflow-visible">
                <text 
                    x="120" 
                    y="45" 
                    textAnchor="end"
                    className="line-text font-heading font-bold text-5xl"
                    fill="#78350F"       
                    fillOpacity="0"      
                    stroke="#78350F"     
                    strokeWidth="1.5"
                >
                    Ask
                </text>
                <text 
                    x="128" 
                    y="45" 
                    textAnchor="start"
                    className="line-text font-heading font-bold text-5xl"
                    fill="#D97706"       
                    fillOpacity="0"      
                    stroke="#D97706"     
                    strokeWidth="1.5"
                >
                    EcoBot
                </text>
            </svg>
        </div>

        <p className="text-stone-500 text-sm md:text-base max-w-lg mx-auto">
          Ask me about recycling, energy...
        </p>
      </section>

      {/* --- CHAT AREA --- */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 pb-32 relative z-10">
        <div className="flex flex-col space-y-6">
          
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 animate-in fade-in slide-in-from-top-2">
              <p className="font-semibold">⚠️ {error.message}</p>
              <button onClick={() => reload()} className="mt-2 text-xs bg-white border px-3 py-1 rounded">Retry</button>
            </div>
          )}

          {/* Welcome Card */}
          {messages.length === 0 && !error && (
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-7 border border-[#78350F]/5 text-center shadow-lg shadow-[#78350F]/5 mt-7 animate-in zoom-in-95 duration-500">
              
              {/* SPARKLE ICON (Rotates with typing) */}
              <div ref={sparkleRef} className="w-16 h-16 bg-[#FDE68A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Sparkles size={32} className="text-[#78350F]" />
              </div>
              
              <h3 className="font-heading font-bold text-lg text-[#78350F] mb-2">Hello, Green Warrior!</h3>
              <p className="text-stone-600 mb-6">I'm tuned to nature's frequency. Start typing to spin the energy!</p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {['How to reduce plastic?', 'Plan a plantation drive?', 'What is climate change?'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => append({ role: 'user', content: suggestion })}
                    disabled={isLoading}
                    className="suggestion-chip opacity-0 text-xs sm:text-sm bg-white border border-[#78350F]/10 px-4 py-2 rounded-full text-stone-600 hover:bg-[#78350F] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((m) => (
            <div key={m.id} className={cn("flex w-full gap-4 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300", m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm", m.role === 'user' ? "bg-[#78350F] text-white" : "bg-white text-[#78350F] border border-stone-100")}>
                {m.role === 'user' ? <User size={14} /> : <Bot size={16} />}
              </div>
              <div className={cn("px-5 py-3 rounded-2xl shadow-sm backdrop-blur-sm", m.role === 'user' ? "bg-[#78350F]/95 text-white rounded-tr-sm" : "bg-white/90 text-stone-700 border border-stone-100 rounded-tl-sm")}>
                <MarkdownMessage content={m.content} isUser={m.role === 'user'} />
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-4 max-w-2xl mr-auto animate-in fade-in duration-300">
               <div className="w-8 h-8 rounded-full bg-white text-[#78350F] border border-stone-100 flex items-center justify-center shrink-0 shadow-sm"><Bot size={16} /></div>
               <div className="px-5 py-3 rounded-2xl bg-white/90 border border-stone-100 rounded-tl-sm flex items-center gap-1.5">
                 <span className="w-2 h-2 bg-[#78350F]/40 rounded-full animate-bounce delay-0" />
                 <span className="w-2 h-2 bg-[#78350F]/40 rounded-full animate-bounce delay-150" />
                 <span className="w-2 h-2 bg-[#78350F]/40 rounded-full animate-bounce delay-300" />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* --- INPUT BAR --- */}
      <div className="fixed bottom-0 left-0 w-full bg-cream/80 backdrop-blur-xl border-t border-[#78350F]/5 p-4 z-40">
        <form onSubmit={handleAnimatedSubmit} className="max-w-3xl mx-auto relative flex items-center gap-2">
          <input
            className="w-full h-14 pl-6 pr-14 rounded-full bg-white/90 border border-[#78350F]/10 focus:outline-none focus:ring-2 focus:ring-[#78350F]/20 text-[#78350F] placeholder:text-stone-400 shadow-xl shadow-stone-200/50 transition-all"
            value={input}
            onChange={handleInputChange}
            placeholder="Type quickly to spin the sparkle..."
            disabled={isLoading}
          />
          <Button 
            ref={sendButtonRef} 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()} 
            className="absolute right-2 top-2 h-10 w-10 rounded-full bg-[#78350F] hover:bg-[#92400E] text-white disabled:opacity-50"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>

    </div>
  );
}