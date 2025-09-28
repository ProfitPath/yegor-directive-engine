'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AnalysisResult } from './SortingEngine';

interface ResultsDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultsDisplay = ({ result, onReset }: ResultsDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const serviceRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    // Service name entrance with distortion effect
    tl.fromTo(serviceRef.current, {
      opacity: 0,
      scale: 0.8,
      rotationX: 45,
      y: 50
    }, {
      opacity: 1,
      scale: 1,
      rotationX: 0,
      y: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    
    // Protocol title fade in
    .fromTo(titleRef.current, {
      opacity: 0,
      y: -30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3')
    
    // Description fade in
    .fromTo(descRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.2')
    
    // Button materialization
    .fromTo(buttonRef.current, {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2');

    // Add subtle pulsing to the service name
    gsap.to(serviceRef.current, {
      scale: 1.01,
      duration: 3,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleEngageClick = () => {
    // Button press animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Flash effect
        gsap.to(containerRef.current, {
          backgroundColor: '#FF0000',
          duration: 0.017,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            // Navigate to the URL
            window.open(result.url, '_blank');
          }
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-4xl px-8 text-center">
        {/* Protocol Header */}
        <h2 ref={titleRef} className="text-display text-display-lg text-shadow-whisper mb-8">
          ПРОТОКОЛ РЕКОМЕНДУЕТ:
        </h2>

        {/* Service Name - The Verdict */}
        <h1 
          ref={serviceRef}
          className="text-display text-display-xl text-blood-accent mb-12 leading-none"
        >
          {result.service}
        </h1>

        {/* Description */}
        <p 
          ref={descRef}
          className="text-mono-prompt text-document-aged mb-16 max-w-2xl mx-auto"
        >
          {result.description}
        </p>

        {/* CTA Button */}
        <button
          ref={buttonRef}
          onClick={handleEngageClick}
          className="group relative text-mono-button px-12 py-6 border-2 border-blood-accent text-blood-accent hover:bg-blood-accent hover:text-void-primary transition-all duration-200 transform hover:-translate-y-1"
        >
          <span className="relative z-10">[ ENGAGE PROTOCOL ]</span>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-blood-accent opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
        </button>

        {/* Secondary Actions */}
        <div className="mt-12 space-x-8">
          <button
            onClick={onReset}
            className="text-mono text-shadow-whisper hover:text-document-aged transition-colors duration-200 text-sm"
          >
            [ REINITIALIZE PROTOCOL ]
          </button>
          
          <span className="text-shadow-whisper text-sm">|</span>
          
          <button
            className="text-mono text-shadow-whisper hover:text-document-aged transition-colors duration-200 text-sm"
          >
            [ ANALYZE ALTERNATIVE VECTOR ]
          </button>
        </div>

        {/* System Info */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-mono-diagnostic text-shadow-whisper">
          <span>CLASSIFICATION: TERMINAL</span>
          <span>CONFIDENCE: 99.7%</span>
          <span>YEGOR_OS_V1.0</span>
        </div>
      </div>
    </div>
  );
};