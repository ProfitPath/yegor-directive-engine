'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BootSequence } from './BootSequence';
import { PromptInput } from './PromptInput';
import { ProcessingAnimation } from './ProcessingAnimation';
import { ResultsDisplay } from './ResultsDisplay';
import { BackgroundEffects } from './BackgroundEffects';
import { CustomCursor } from './CustomCursor';

export type EngineState = 'BOOT' | 'IDLE' | 'PROCESSING' | 'RESULTS' | 'ERROR';

export const SortingEngine = () => {
  const [state, setState] = useState<EngineState>('BOOT');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<string>('');
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
      
      // Strategic Analysis Engine
      const analysisResult = analyzeObjective(input);
      setResult(analysisResult);
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
    setResult('');
  };

  // Strategic Analysis Engine - Ghost in the Machine
  const analyzeObjective = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    // Strategic analysis logic
    if (lowercaseInput.includes('twitter') || lowercaseInput.includes('followers') || lowercaseInput.includes('viral') || lowercaseInput.includes('audience')) {
      return `## [ PROTOCOL ANALYSIS INITIATED ]

### Primary Recommendation: **Protocol XVIRALITY**
Direct engagement vector detected. Your objective requires systematic audience acquisition and platform domination protocols.

### Strategic Rationale:
Your input "${input}" indicates a clear requirement for exponential growth mechanics. Protocol XVIRALITY deploys advanced engagement algorithms and viral coefficient optimization specifically designed for Twitter/X platform domination. This protocol has demonstrated consistent 10x-100x audience expansion rates across multiple deployment scenarios. The system leverages content velocity optimization, engagement cascade triggers, and algorithmic preference exploitation to achieve rapid, sustainable growth vectors.

### Secondary Protocols & Tactical Assessment:
* **Protocol INBADDIESWETRUST:** Secondary deployment vector. Once audience establishment is complete, UGC campaigns can leverage your established reach for monetization acceleration.
* **Protocol PRINTMONEY:** Future-phase protocol. Requires existing audience infrastructure before deployment. Compatible with post-XVIRALITY operations for revenue maximization.

### [ DIRECTIVE ]
Deploy Protocol XVIRALITY immediately. Audience acquisition is the foundation of all subsequent operations.`;
    } else if (lowercaseInput.includes('ads') || lowercaseInput.includes('ugc') || lowercaseInput.includes('video') || lowercaseInput.includes('content') || lowercaseInput.includes('roas')) {
      return `## [ PROTOCOL ANALYSIS INITIATED ]

### Primary Recommendation: **Protocol INBADDIESWETRUST**
High-conversion content deployment vector identified. Your objective requires immediate UGC amplification protocols.

### Strategic Rationale:
Analysis of "${input}" reveals direct correlation with advertising optimization requirements. Protocol INBADDIESWETRUST provides access to elite, vetted content creators specializing in high-conversion UGC campaigns. The protocol features advanced creator matching algorithms, performance optimization systems, and conversion rate acceleration mechanisms. Deployment typically results in 300-500% ROAS improvement within first campaign cycle.

### Secondary Protocols & Tactical Assessment:
* **Protocol XVIRALITY:** Complementary organic reach amplification. Can reduce paid acquisition costs by 40-60% through audience pre-conditioning.
* **Protocol PRINTMONEY:** Revenue diversification protocol. UGC traffic can be channeled into high-margin info product funnels for compound monetization.

### [ DIRECTIVE ]
Initialize Protocol INBADDIESWETRUST for immediate conversion rate optimization and revenue acceleration.`;
    } else {
      return `## [ PROTOCOL ANALYSIS INITIATED ]

### Primary Recommendation: **Protocol PRINTMONEY**
Revenue generation and knowledge monetization vector detected. Your objective requires high-margin digital asset creation protocols.

### Strategic Rationale:
Your stated objective "${input}" indicates potential for knowledge-based product development and systematic revenue generation. Protocol PRINTMONEY provides comprehensive frameworks for creating, launching, and scaling high-margin digital products. The system includes market validation protocols, content architecture optimization, and automated sales funnel deployment mechanisms. Standard deployment achieves 6-7 figure revenue generation within 12-18 month cycles.

### Secondary Protocols & Tactical Assessment:
* **Protocol XVIRALITY:** Foundation-layer protocol. Audience acquisition provides ready market infrastructure for product deployment.
* **Protocol INBADDIESWETRUST:** Acceleration protocol. UGC campaigns can rapidly scale customer acquisition for established products.

### [ DIRECTIVE ]
Commence Protocol PRINTMONEY development cycle. Knowledge monetization requires systematic execution of proven frameworks.`;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-void-primary overflow-hidden"
    >
      {/* Custom Cursor */}
      <CustomCursor />
      
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