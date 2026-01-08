'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownMessageProps {
  content: string;
  isUser?: boolean;
}

export default function MarkdownMessage({ content, isUser = false }: MarkdownMessageProps) {
  console.log('🔍 MarkdownMessage rendering:', { 
    contentLength: content.length, 
    isUser,
    hasMarkdown: content.includes('#') || content.includes('**') || content.includes('*'),
    preview: content.substring(0, 100)
  });

  return (
    <div className={cn(
      "prose prose-sm max-w-none",
      isUser ? "prose-invert" : ""
    )}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1 
              className={cn(
                "text-2xl font-bold mb-3 mt-4 first:mt-0",
                isUser ? "text-white" : "text-[#1C3D2E]"
              )} 
              {...props} 
            />
          ),
          h2: (props) => (
            <h2 
              className={cn(
                "text-xl font-bold mb-3 mt-4 first:mt-0",
                isUser ? "text-white" : "text-[#1C3D2E]"
              )} 
              {...props} 
            />
          ),
          h3: (props) => (
            <h3 
              className={cn(
                "text-lg font-semibold mb-2 mt-3 first:mt-0",
                isUser ? "text-white" : "text-[#1C3D2E]"
              )} 
              {...props} 
            />
          ),
          p: (props) => (
            <p className="mb-3 last:mb-0 leading-relaxed" {...props} />
          ),
          ul: (props) => (
            <ul 
              className={cn(
                "my-3 ml-6 space-y-1.5 list-disc",
                isUser ? "marker:text-white" : "marker:text-emerald-600"
              )} 
              {...props} 
            />
          ),
          ol: (props) => (
            <ol 
              className={cn(
                "my-3 ml-6 space-y-1.5 list-decimal",
                isUser ? "marker:text-white marker:font-semibold" : "marker:text-emerald-600 marker:font-semibold"
              )} 
              {...props} 
            />
          ),
          li: (props) => (
            <li className="leading-relaxed pl-1" {...props} />
          ),
          strong: (props) => (
            <strong 
              className={cn(
                "font-bold",
                isUser ? "text-white" : "text-emerald-700"
              )} 
              {...props} 
            />
          ),
          em: (props) => (
            <em className="italic" {...props} />
          ),
          code: (props) => {
            const { inline, className, children, ...rest } = props as any;
            return inline ? (
              <code 
                className={cn(
                  "px-1.5 py-0.5 rounded text-sm font-mono",
                  isUser ? "bg-white/20 text-white" : "bg-stone-100 text-stone-800"
                )} 
                {...rest}
              >
                {children}
              </code>
            ) : (
              <code 
                className={cn(
                  "block p-3 rounded-lg text-sm font-mono overflow-x-auto my-2",
                  isUser ? "bg-white/20 text-white" : "bg-stone-100 text-stone-800"
                )} 
                {...rest}
              >
                {children}
              </code>
            );
          },
          pre: (props) => (
            <pre className="overflow-x-auto" {...props} />
          ),
          blockquote: (props) => (
            <blockquote 
              className={cn(
                "border-l-4 pl-4 italic my-3",
                isUser ? "border-white/50 text-white/90" : "border-emerald-400 text-stone-600"
              )} 
              {...props} 
            />
          ),
          a: (props) => (
            <a 
              className={cn(
                "underline hover:no-underline",
                isUser ? "text-white" : "text-emerald-600"
              )}
              target="_blank"
              rel="noopener noreferrer"
              {...props} 
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}