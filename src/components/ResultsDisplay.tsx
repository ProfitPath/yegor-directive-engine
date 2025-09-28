'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AnalysisResult, ServiceRecommendation } from './SortingEngine';

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

  const handleEngageClick = (serviceName: string) => () => {
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
            window.open(urls[serviceName as keyof typeof urls], '_blank');
          }
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-6xl px-8">
        {/* Protocol Header */}
        <h2 ref={titleRef} className="text-display text-display-lg text-shadow-whisper mb-12 text-center">
          АНАЛИЗ ЗАВЕРШЕН:
        </h2>

        {/* Primary Recommendations Section */}
        <div className="mb-16">
          <h3 className="text-display text-display-lg text-blood-accent mb-8 text-center">
            [ ПЕРВИЧНЫЕ ПРОТОКОЛЫ ]
          </h3>
          
          <div className="space-y-12">
            {result.primary_recommendations.map((recommendation, index) => (
              <div key={index} className="text-center">
                <h1 
                  ref={index === 0 ? serviceRef : undefined}
                  className="text-display text-display-xl text-blood-accent mb-6 leading-none"
                >
                  {recommendation.service_name}
                </h1>
                
                <p className="text-mono-prompt text-document-aged mb-8 max-w-3xl mx-auto">
                  {recommendation.justification}
                </p>
                
                <button
                  ref={index === 0 ? buttonRef : undefined}
                  onClick={handleEngageClick(recommendation.service_name)}
                  className="group relative text-mono-button px-12 py-6 border-2 border-blood-accent text-blood-accent hover:bg-blood-accent hover:text-void-primary transition-all duration-200 transform hover:-translate-y-1 mb-8"
                >
                  <span className="relative z-10">[ ENGAGE {recommendation.service_name} ]</span>
                  <div className="absolute inset-0 bg-blood-accent opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Analysis Section */}
        {result.secondary_analysis.length > 0 && (
          <div className="mb-16">
            <h3 className="text-display text-display-lg text-shadow-whisper mb-8 text-center">
              [ ТАКТИЧЕСКОЕ ДОПОЛНЕНИЕ ]
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {result.secondary_analysis.map((analysis, index) => (
                <div key={index} className="border border-concrete-panel bg-concrete-panel/20 p-6">
                  <h4 className="text-mono-button text-document-aged mb-4">
                    {analysis.service_name}
                  </h4>
                  <p className="text-mono text-shadow-whisper text-sm mb-4">
                    {analysis.analysis}
                  </p>
                  <button
                    onClick={handleEngageClick(analysis.service_name)}
                    className="text-mono text-shadow-whisper hover:text-blood-accent transition-colors duration-200 text-xs border border-shadow-whisper hover:border-blood-accent px-4 py-2"
                  >
                    [ AUXILIARY PROTOCOL ]
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
          <span>CLASSIFICATION: PRECISION</span>
          <span>CONFIDENCE: 99.7%</span>
          <span>YEGOR_OS_V2.0</span>
        </div>
      </div>
    </div>
  );
};