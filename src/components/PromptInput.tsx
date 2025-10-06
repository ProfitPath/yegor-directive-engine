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
      <div className="w-full max-w-6xl px-4 sm:px-8 mx-auto flex flex-col justify-center items-center min-h-screen">
        {/* Protocol Header */}
        <div className="text-center mb-16">
           <h2 className="text-display text-display-lg text-blood-accent mb-8 font-mono">
             [ {terminalText}<span className="animate-pulse">█</span> ]
           </h2>
          <div className="h-px bg-concrete-panel w-full mb-8" />
        </div>

        {/* Input Section */}
        <div className="text-center">
          <div ref={promptRef} className="mb-12">
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
        <div className="text-center mt-16">
          <p className="text-mono-diagnostic text-shadow-whisper">
            [ PRESS ENTER TO INITIATE ANALYSIS PROTOCOL ]
          </p>
          <p className="text-mono-diagnostic text-shadow-whisper mt-2">
            [ SHIFT + ENTER FOR NEW LINE ]
          </p>
        </div>

        {/* System Info */}
        <div className="flex justify-between mt-24 text-mono-diagnostic text-shadow-whisper">
          <span>STATUS: AWAITING INPUT</span>
          <span>SECURITY: CLASSIFIED</span>
          <span>YEGOR_OS_V2.0</span>
        </div>
      </div>
    </div>
  );
};