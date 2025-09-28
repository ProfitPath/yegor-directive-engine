'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ReactMarkdown from 'react-markdown';
import useTypewriter from '../hooks/useTypewriter';

interface ResultsDisplayProps {
  result: string;
  onReset: () => void;
  onContinueSubmit: (input: string) => void;
}

export const ResultsDisplay = ({ result, onReset, onContinueSubmit }: ResultsDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [startTypewriter, setStartTypewriter] = useState(false);
  const [showContinueInput, setShowContinueInput] = useState(false);
  const [continueInput, setContinueInput] = useState('');
  
  // Check if this is a rejection
  const isRejected = result.includes("Even Yegor can't save you");

  // Use the full result for typewriter effect
  const restOfContent = result;
  
  // Typewriter effect for the analysis content (333 chars/sec = ~3ms per char)
  const typedAnalysis = useTypewriter(startTypewriter ? restOfContent : '', 333);

  useEffect(() => {
    if (!containerRef.current || isRejected) return;

    // Start the analysis display immediately
    setStartTypewriter(true);
    
    if (!analysisRef.current) return;

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
    
    // Button materialization (delayed to appear after typewriter finishes)
    .fromTo(buttonRef.current, {
      opacity: 0,
      scale: 0.9
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '+=3'); // Wait for typewriter to complete
  }, [isRejected]);

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

  // Handle rejection display
  if (isRejected) {
    return (
      <div ref={containerRef} className="w-full min-h-screen flex justify-center bg-background">
        <div className="w-full max-w-6xl px-8 py-16">
          {/* CRT Monitor for Rejection */}
          <div className="crt-monitor w-full max-h-[calc(100vh-8rem)] overflow-hidden">
            <div ref={analysisRef} className="analysis-container mb-16 text-center">
              <div className="rejection-message mb-16">
                <h1 className="text-display text-display-xl text-blood-accent">
                  {result}
                </h1>
              </div>
              
              {/* Reset Option */}
              <div className="text-center mb-8">
                <button
                  onClick={onReset}
                  className="text-mono text-shadow-whisper hover:text-document-aged transition-colors duration-200 text-sm"
                >
                  [ REINITIALIZE PROTOCOL ]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full min-h-screen flex justify-center bg-background">
      <div className="w-full max-w-6xl px-8 py-16">

        {/* Analysis Results */}
        <div className="crt-monitor w-full h-[calc(100vh-8rem)]">
          <div ref={analysisRef} className="analysis-container mb-16 h-full overflow-auto">
            <div 
              className="primary-text-style analysis-content w-full"
              dangerouslySetInnerHTML={{
                __html: typedAnalysis
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="accent-text-style">$1</strong>')
                  .replace(/^#{1,2}\s+(.+)$/gm, '<h2 class="accent-text-style">$1</h2>')
                  .replace(/^#{3,6}\s+(.+)$/gm, '<h3 class="accent-text-style">$1</h3>')
                  .replace(/\n/g, '<br/>')
              }}
            />
            {typedAnalysis.length < restOfContent.length && <span className="blinking-cursor"></span>}
          </div>
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
            onClick={() => setShowContinueInput(!showContinueInput)}
            className="text-mono text-shadow-whisper hover:text-document-aged transition-colors duration-200 text-sm"
          >
            [ CONTINUE DISCUSSION ]
          </button>
        </div>

        {/* Continue Discussion Input */}
        {showContinueInput && (
          <div className="mb-8 w-full max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={continueInput}
                onChange={(e) => setContinueInput(e.target.value)}
                placeholder="Continue the discussion..."
                className="dynamic-textarea w-full min-h-[120px] bg-void-primary/20 border border-shadow-edge text-document-aged placeholder-shadow-edge/60 p-4 focus:outline-none focus:border-blood-accent transition-colors duration-200"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (continueInput.trim()) {
                      onContinueSubmit(continueInput.trim());
                      setContinueInput('');
                      setShowContinueInput(false);
                    }
                  }
                }}
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowContinueInput(false)}
                  className="text-mono text-shadow-whisper hover:text-document-aged transition-colors duration-200 text-sm"
                >
                  [ CANCEL ]
                </button>
                <button
                  onClick={() => {
                    if (continueInput.trim()) {
                      onContinueSubmit(continueInput.trim());
                      setContinueInput('');
                      setShowContinueInput(false);
                    }
                  }}
                  className="text-mono text-shadow-whisper hover:text-blood-accent transition-colors duration-200 text-sm"
                >
                  [ SUBMIT ]
                </button>
              </div>
            </div>
          </div>
        )}

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