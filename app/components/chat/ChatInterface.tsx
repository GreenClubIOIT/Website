'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';
import FallingLeaves from "@/app/components/effects/FallingLeaves";
import { Button } from "@/app/components/ui/button";
import { Send, Sprout, Bot, User, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
import MarkdownMessage from "@/app/components/markdown/MarkdownMessage";

export default function ChatPage() {
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    append,
    error 
  } = useChat({
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth", 
      block: "nearest" 
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages.length]);

  // Log any errors
  useEffect(() => {
    if (error) {
      console.error('❌ Chat error:', error);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen relative bg-cream selection:bg-[#DDF5C8] selection:text-[#1C3D2E]">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-emerald-400/10 rounded-full blur-[100px] -z-20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[30vw] h-[30vw] bg-purple-400/5 rounded-full blur-[100px] -z-20 pointer-events-none" />

      <FallingLeaves theme="green" count={15} />

      {/* --- HEADER SECTION --- */}
      <section className="pt-28 pb-4 px-4 text-center relative z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/80 backdrop-blur-sm border border-[#1C3D2E]/10 shadow-sm text-[#1C3D2E] text-sm font-semibold tracking-wide mb-4 animate-fade-in-up pointer-events-auto">
           <Sprout size={14} className="text-[#2A5240] fill-current" />
           <span>Powered by Gemini</span>
        </div>
        <h1 className="font-heading font-bold text-4xl text-[#1C3D2E] mb-2 drop-shadow-sm">
          Ask <span className="text-emerald-600">EcoBot</span>
        </h1>
        <p className="text-stone-500 text-sm md:text-base max-w-lg mx-auto">
          Ask me about recycling, energy, or our latest events!
        </p>
      </section>

      {/* --- CHAT AREA --- */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 pb-32 relative z-10">
        <div className="flex flex-col space-y-6">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700">
              <p className="font-semibold">Error:</p>
              <p className="text-sm">{error.message}</p>
            </div>
          )}

          {/* Welcome Card (Only shows when empty) */}
          {messages.length === 0 && (
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-[#1C3D2E]/5 text-center shadow-lg shadow-[#1C3D2E]/5 mt-8 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-[#DDF5C8] rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-inner">
                <Sparkles size={32} className="text-[#1C3D2E]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1C3D2E] mb-2">Hello, Green Warrior!</h3>
              <p className="text-stone-600 mb-6">I'm tuned to nature's frequency. Try asking:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'How to reduce plastic?', 
                  'How to plan a plantation drive?', 
                  'What is climate change?'
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => append({ role: 'user', content: suggestion })}
                    disabled={isLoading}
                    className="text-xs sm:text-sm bg-white border border-[#1C3D2E]/10 px-4 py-2 rounded-full text-stone-600 hover:bg-[#1C3D2E] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Bubbles */}
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex w-full gap-4 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300",
                m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                m.role === 'user' 
                  ? "bg-[#1C3D2E] text-white" 
                  : "bg-white text-[#1C3D2E] border border-stone-100"
              )}>
                {m.role === 'user' ? <User size={14} /> : <Bot size={16} />}
              </div>

              <div className={cn(
                "px-5 py-3 rounded-2xl shadow-sm backdrop-blur-sm",
                m.role === 'user' 
                  ? "bg-[#1C3D2E]/95 text-white rounded-tr-sm" 
                  : "bg-white/90 text-stone-700 border border-stone-100 rounded-tl-sm"
              )}>
                <MarkdownMessage 
                  content={m.content} 
                  isUser={m.role === 'user'} 
                />
              </div>
            </div>
          ))}

          {/* Loading Bubble */}
          {isLoading && (
            <div className="flex gap-4 max-w-2xl mr-auto animate-in fade-in duration-300">
               <div className="w-8 h-8 rounded-full bg-white text-[#1C3D2E] border border-stone-100 flex items-center justify-center shrink-0 shadow-sm">
                 <Bot size={16} />
               </div>
               <div className="px-5 py-3 rounded-2xl bg-white/90 border border-stone-100 rounded-tl-sm flex items-center gap-1.5">
                 <span className="w-2 h-2 bg-[#1C3D2E]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                 <span className="w-2 h-2 bg-[#1C3D2E]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                 <span className="w-2 h-2 bg-[#1C3D2E]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
               </div>
            </div>
          )}
          
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* --- INPUT BAR --- */}
      <div className="fixed bottom-0 left-0 w-full bg-cream/80 backdrop-blur-xl border-t border-[#1C3D2E]/5 p-4 z-40">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative flex items-center gap-2">
          <input
            className="w-full h-14 pl-6 pr-14 rounded-full bg-white/90 border border-[#1C3D2E]/10 focus:outline-none focus:ring-2 focus:ring-[#1C3D2E]/20 text-[#1C3D2E] placeholder:text-stone-400 shadow-xl shadow-stone-200/50 transition-all"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about nature..."
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 h-10 w-10 rounded-full bg-[#1C3D2E] hover:bg-[#2A5240] text-white transition-transform hover:scale-105 disabled:opacity-50"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>

    </div>
  );
}