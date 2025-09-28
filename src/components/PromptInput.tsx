'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PromptInputProps {
  onSubmit: (input: string) => void;
}

export const PromptInput = ({ onSubmit }: PromptInputProps) => {
  const [input, setInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const promptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input immediately
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Breathing animation for the prompt text
    if (promptRef.current) {
      gsap.to(promptRef.current, {
        scale: 1.002,
        opacity: 1,
        duration: 4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-4xl px-8 text-center">
        {/* Protocol Header */}
        <div className="mb-16">
          <h1 className="text-display text-display-lg text-document-aged mb-4">
            CLASSIFICATION
          </h1>
          <h2 className="text-display text-display-lg text-blood-accent">
            PROTOCOL
          </h2>
        </div>

        {/* Main Prompt */}
        <div ref={promptRef} className="mb-12 animate-breathing">
          <p className="text-mono-prompt text-document-aged max-w-2xl mx-auto leading-relaxed">
            ОПИШИТЕ ВАШУ ЦЕЛЬ
          </p>
          <p className="text-mono text-shadow-whisper mt-4 text-sm max-w-2xl mx-auto">
            [ DESCRIBE YOUR OBJECTIVE IN PRECISE TERMS ]
          </p>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <span className="text-mono-prompt text-document-aged mr-4">&gt;</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-mono-prompt text-document-aged placeholder-shadow-whisper"
                  placeholder="Enter your goal..."
                  autoComplete="off"
                  spellCheck="false"
                />
                <span className="absolute right-0 top-0 w-2 h-6 bg-blood-accent animate-cursor-pulse" />
              </div>
            </div>
            
            {/* Underline */}
            <div className="h-px bg-concrete-panel mt-4" />
          </div>

          {/* Hidden submit for accessibility */}
          <button type="submit" className="sr-only" tabIndex={-1}>
            Submit
          </button>
        </form>

        {/* Instructions */}
        <div className="mt-12 text-mono text-shadow-whisper text-xs max-w-md mx-auto space-y-2">
          <p>[ PRESS ENTER TO INITIATE ANALYSIS ]</p>
          <p>[ ALL INPUTS ARE LOGGED AND ANALYZED ]</p>
          <p>[ CLASSIFICATION IS FINAL AND BINDING ]</p>
        </div>
      </div>
    </div>
  );
};