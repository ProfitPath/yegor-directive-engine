'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const BootSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [showBios, setShowBios] = useState(true);

  const biosLines = [
    'YEGOR OS V1.0 BOOT SEQUENCE INITIATED',
    'MEMORY CHECK................ [ OK ]',
    'CPU VERIFICATION............. [ OK ]',
    'NEURAL NETWORKS.............. [ OK ]',
    'CLASSIFICATION ENGINE........ [ OK ]',
    'PSYCHOMETRIC MODULES......... [ OK ]',
    'MARKET ANALYSIS CORE......... [ OK ]',
    '',
    'LOADING SORTING_ENGINE.EXE...'
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    // Initial cursor blink
    tl.to({}, { duration: 0.2 })
      
    // BIOS sequence
    .add(() => {
      const interval = setInterval(() => {
        setCurrentLine(prev => {
          if (prev >= biosLines.length - 1) {
            clearInterval(interval);
            // Transition to command line
            setTimeout(() => {
              setShowBios(false);
            }, 500);
            return prev;
          }
          return prev + 1;
        });
      }, 200);
    })
    
    // Flash and collapse effect at end
    .to(containerRef.current, {
      duration: 0.1,
      backgroundColor: '#FFFFFF',
      delay: 2.0
    })
    .to(containerRef.current, {
      duration: 0.1,
      backgroundColor: 'hsl(var(--void-primary))'
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-1 flex items-start justify-start p-8">
      <div className="w-full max-w-4xl">
        {showBios ? (
          <div className="space-y-1">
            {biosLines.slice(0, currentLine + 1).map((line, index) => (
              <div key={index} className="text-mono text-sm text-document-aged">
                {line}
                {index === currentLine && (
                  <span className="inline-block w-2 h-4 bg-blood-accent ml-1 animate-cursor-pulse" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-mono text-sm text-document-aged">
              YGR:/&gt; INITIATING SORTING_ENGINE.EXE
            </div>
            <div className="text-mono text-sm text-shadow-whisper">
              NEURAL CLASSIFICATION PROTOCOL ACTIVE...
            </div>
            <div className="flex items-center">
              <span className="text-mono text-sm text-document-aged">READY&gt;</span>
              <span className="inline-block w-2 h-4 bg-blood-accent ml-2 animate-cursor-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};