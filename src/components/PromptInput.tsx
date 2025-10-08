'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useTerminalText } from '../hooks/useTerminalText';

interface PromptInputProps {
  onSubmit: (input: string) => void;
}

export const PromptInput = ({ onSubmit }: PromptInputProps) => {
  const [input, setInput] = useState('');
  const promptRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Terminal text animation
  const terminalText = useTerminalText({
    texts: [
      'THE YEGOR METHOD',
      'МОНОЛИТ',
      'АППАРАТ', 
      'СИСТЕМА «ЩИТ И МЕЧ»',
      'ДОКТРИНА ГЛУБИНЫ',
      'ОБЪЕКТ █▓▒░',
      'THE YEGOR METHOD'
    ],
    typeSpeed: 80,
    deleteSpeed: 40,
    pauseTime: 1500
  });

  useEffect(() => {
    // Focus the textarea on mount
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    // Animate the prompt text
    if (promptRef.current) {
      gsap.fromTo(promptRef.current, {
        opacity: 0,
        y: -20
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      });
    }
  }, []);


  // Auto-resize functionality
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'inherit';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 mx-auto flex flex-col justify-center sm:justify-center items-center min-h-screen py-8 sm:py-0">
        {/* Protocol Header */}
        <div className="text-center mb-6 sm:mb-12 md:mb-16">
           <h2 className="text-display text-2xl sm:text-3xl md:text-display-lg text-blood-accent mb-4 sm:mb-6 md:mb-8 font-mono break-words px-2">
             [ {terminalText}<span className="animate-pulse">█</span> ]
           </h2>
          <div className="h-px bg-concrete-panel w-full mb-4 sm:mb-6 md:mb-8" />
        </div>

        {/* Input Section */}
        <div className="text-center">
          <div ref={promptRef} className="mb-8 sm:mb-12">
            <div className="relative w-full">
              <span className="text-shadow-whisper text-mono-diagnostic absolute -top-6 left-1/2 -translate-x-1/2">
                [ CLASSIFIED INPUT ]
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="dynamic-textarea text-center resize-none"
              placeholder="IИРЦТ MISSIОИ РАЯАМЕТЕЯS..."
              rows={1}
              autoComplete="off"
              spellCheck={false}
            />
            
            {/* Hidden submit button for accessibility */}
            <button type="submit" className="sr-only">
              Submit
            </button>
            
            {/* Cursor indicator */}
            <div className="inline-block w-0.5 h-6 bg-blood-accent ml-1 animate-cursor-pulse" />
          </form>
        </div>

        {/* Instructions */}
        <div className="text-center mt-6 sm:mt-12 md:mt-16">
          <p className="text-xs sm:text-sm text-mono-diagnostic text-shadow-whisper px-2">
            [ PRESS ENTER TO INITIATE ANALYSIS PROTOCOL ]
          </p>
          <p className="text-xs sm:text-sm text-mono-diagnostic text-shadow-whisper mt-2 px-2">
            [ SHIFT + ENTER FOR NEW LINE ]
          </p>
        </div>

        {/* System Info */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-8 sm:mt-16 md:mt-24 text-xs sm:text-sm text-mono-diagnostic text-shadow-whisper px-2">
          <span className="text-center sm:text-left">STATUS: AWAITING INPUT</span>
          <span className="text-center">SECURITY: CLASSIFIED</span>
          <span className="text-center sm:text-right">YEGOR_OS_V2.0</span>
        </div>

        {/* Mobile Links */}
        <div className="sm:hidden mt-6 px-4 mb-4">
          <div className="h-px bg-concrete-panel w-full mb-4" />
          <div className="flex flex-col gap-3 text-center">
            <a 
              href="https://inbaddieswetrust.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blood-accent hover:text-terminal-green transition-colors font-mono"
            >
              [ IN BADDIES WE TRUST ]
            </a>
            <a 
              href="https://zolex.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blood-accent hover:text-terminal-green transition-colors font-mono"
            >
              [ ZOLEX ]
            </a>
            <a 
              href="https://printmoney.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blood-accent hover:text-terminal-green transition-colors font-mono"
            >
              [ PRINT MONEY ]
            </a>
            <a 
              href="https://xvirality.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blood-accent hover:text-terminal-green transition-colors font-mono"
            >
              [ XVIRALITY ]
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};