'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ReactMarkdown from 'react-markdown';

interface ResultsDisplayProps {
  result: string;
  onReset: () => void;
}

export const ResultsDisplay = ({ result, onReset }: ResultsDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    // Analysis content entrance
    tl.fromTo(analysisRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out'
    })
    
    // Button materialization
    .fromTo(buttonRef.current, {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, []);

  const handleEngageClick = () => {
    // Determine service from analysis
    const service = result.includes('XVIRALITY') ? 'XVIRALITY' : 
                   result.includes('INBADDIESWETRUST') ? 'INBADDIESWETRUST' : 'PRINTMONEY';
    
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
            // Navigate to the URL based on service
            const urls = {
              'XVIRALITY': 'https://xvirality.pro',
              'INBADDIESWETRUST': 'https://inbaddieswetrust.pro',
              'PRINTMONEY': 'https://printmoney.pro'
            };
            window.open(urls[service as keyof typeof urls], '_blank');
          }
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-6xl px-8">
        {/* Analysis Results */}
        <div ref={analysisRef} className="analysis-container mb-16">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>

        {/* Engagement Button */}
        <div className="text-center mb-16">
          <button
            ref={buttonRef}
            onClick={handleEngageClick}
            className="group relative text-mono-button px-12 py-6 border-2 border-blood-accent text-blood-accent hover:bg-blood-accent hover:text-void-primary transition-all duration-200 transform hover:-translate-y-1"
          >
            <span className="relative z-10">[ ENGAGE PROTOCOL ]</span>
            <div className="absolute inset-0 bg-blood-accent opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="text-center space-x-8 mb-8">
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
        <div className="flex justify-between text-mono-diagnostic text-shadow-whisper">
          <span>CLASSIFICATION: STRATEGIC</span>
          <span>CONFIDENCE: 99.9%</span>
          <span>YEGOR_OS_V2.0</span>
        </div>
      </div>
    </div>
  );
};