'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BootSequence } from './BootSequence';
import { PromptInput } from './PromptInput';
import { ProcessingAnimation } from './ProcessingAnimation';
import { ResultsDisplay } from './ResultsDisplay';
import { BackgroundEffects } from './BackgroundEffects';

export type EngineState = 'BOOT' | 'IDLE' | 'PROCESSING' | 'RESULTS' | 'ERROR';

export interface AnalysisResult {
  service: 'XVIRALITY' | 'INBADDIESWETRUST' | 'PRINTMONEY';
  description: string;
  url: string;
}

export const SortingEngine = () => {
  const [state, setState] = useState<EngineState>('BOOT');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-boot sequence on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setState('IDLE');
    }, 2500); // Boot sequence duration

    return () => clearTimeout(timer);
  }, []);

  const handleInputSubmit = async (input: string) => {
    setUserInput(input);
    setState('PROCESSING');
    setIsLoading(true);

    try {
      // Simulate the 5-second processing sequence
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Mock API call - replace with actual implementation
      const mockResult = analyzeMockInput(input);
      setResult(mockResult);
      setState('RESULTS');
    } catch (error) {
      console.error('Analysis failed:', error);
      setState('ERROR');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setState('IDLE');
    setUserInput('');
    setResult(null);
  };

  // Mock analysis function - replace with actual API call
  const analyzeMockInput = (input: string): AnalysisResult => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('twitter') || lowerInput.includes('growth') || lowerInput.includes('viral') || lowerInput.includes('audience')) {
      return {
        service: 'XVIRALITY',
        description: 'SOCIAL MEDIA AMPLIFICATION PROTOCOL ACTIVATED',
        url: 'https://xvirality.pro'
      };
    } else if (lowerInput.includes('ugc') || lowerInput.includes('content') || lowerInput.includes('video') || lowerInput.includes('ads')) {
      return {
        service: 'INBADDIESWETRUST',
        description: 'CONTENT CREATION MATRIX INITIALIZED',
        url: 'https://inbaddieswetrust.pro'
      };
    } else {
      return {
        service: 'PRINTMONEY',
        description: 'DIGITAL REVENUE OPTIMIZATION SEQUENCE DEPLOYED',
        url: 'https://printmoney.pro'
      };
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-void-primary overflow-hidden"
    >
      {/* Background effects */}
      <BackgroundEffects />
      
      {/* Background texture/effects layer */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-concrete-panel/20 to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {state === 'BOOT' && <BootSequence />}
        
        {state === 'IDLE' && (
          <PromptInput onSubmit={handleInputSubmit} />
        )}
        
        {state === 'PROCESSING' && (
          <ProcessingAnimation userInput={userInput} />
        )}
        
        {state === 'RESULTS' && result && (
          <ResultsDisplay result={result} onReset={handleReset} />
        )}
        
        {state === 'ERROR' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-display text-display-lg text-blood-accent mb-8">
                SYSTEM ERROR
              </h1>
              <p className="text-mono text-mono-prompt text-shadow-whisper mb-8">
                PROTOCOL BREACH DETECTED
              </p>
              <button
                onClick={handleReset}
                className="text-mono-button px-8 py-4 border border-blood-accent text-blood-accent hover:bg-blood-accent hover:text-document-aged transition-all duration-200"
              >
                [ REINITIALIZE ]
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};