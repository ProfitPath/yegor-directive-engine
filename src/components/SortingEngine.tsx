'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BootSequence } from './BootSequence';
import { PromptInput } from './PromptInput';
import { ProcessingAnimation } from './ProcessingAnimation';
import { ResultsDisplay } from './ResultsDisplay';
import { BackgroundEffects } from './BackgroundEffects';
import { CustomCursor } from './CustomCursor';

export type EngineState = 'BOOT' | 'IDLE' | 'PROCESSING' | 'RESULTS' | 'REJECTED' | 'ERROR';

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
      
      // Check if result is rejection
      if (analysisResult.includes("Even Yegor can't save you")) {
        setState('REJECTED');
      } else {
        setState('RESULTS');
      }
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

  // Strategic Analysis Engine - Ghost in the Machine v3.0
  const analyzeObjective = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for rejection triggers first
    if (lowercaseInput.includes('no money') || lowercaseInput.includes('free') || 
        lowercaseInput.includes('poor') || lowercaseInput.includes('broke') ||
        lowercaseInput.includes('$0') || lowercaseInput.includes('no budget')) {
      return "Even Yegor can't save you. 💔";
    }
    
    // Strategic analysis logic with economic intelligence
    if (lowercaseInput.includes('twitter') || lowercaseInput.includes('followers') || lowercaseInput.includes('b2b') || 
        lowercaseInput.includes('clients') || lowercaseInput.includes('calls') || lowercaseInput.includes('authority') || 
        lowercaseInput.includes('lead generation') || lowercaseInput.includes('viral')) {
      return `## [ STRATEGIC ANALYSIS COMPLETE ]

### Primary Protocol: **Protocol XVIRALITY**
High-leverage viral inbound system deployment required for your engagement vector.

### Mission Rationale:
Your objective "${input}" indicates a sophisticated understanding of value-based growth mechanics. Protocol XVIRALITY ($1500/m) is specifically engineered for B2B lead generation and high-value traffic acquisition through Twitter/X domination. This system provides reliable client acquisition infrastructure for founders and consultants who understand that investment drives results. The protocol leverages viral coefficient optimization and algorithmic preference exploitation to generate consistent sales calls and qualified leads.

### Collateral Protocol Assessment:
* **Protocol INBADDIESWETRUST:** Insufficient for your B2B requirements. UGC campaigns lack the authority-building mechanisms necessary for high-value client acquisition.
* **Protocol PRINTMONEY:** Suboptimal without existing audience infrastructure. Requires foundation-layer traffic generation which XVIRALITY provides.

### [ FINAL DIRECTIVE ]
Deploy Protocol XVIRALITY immediately. Authority-based client acquisition is your optimal revenue vector.`;
    } else if (lowercaseInput.includes('ads') || lowercaseInput.includes('ugc') || lowercaseInput.includes('video') || 
               lowercaseInput.includes('e-com') || lowercaseInput.includes('roas') || lowercaseInput.includes('conversions') ||
               lowercaseInput.includes('facebook') || lowercaseInput.includes('tiktok')) {
      return `## [ STRATEGIC ANALYSIS COMPLETE ]

### Primary Protocol: **Protocol INBADDIESWETRUST**
Elite UGC deployment system required for your advertising optimization objective.

### Mission Rationale:
Analysis of "${input}" reveals direct correlation with paid advertising performance requirements. Protocol INBADDIESWETRUST provides access to premium Eastern European models specializing in high-conversion UGC campaigns. This system is engineered for businesses running Facebook, TikTok, or other paid traffic who understand that superior creative assets drive superior ROAS. The protocol features elite creator matching and performance optimization specifically designed to generate "HELLA results."

### Collateral Protocol Assessment:
* **Protocol XVIRALITY:** Insufficient for immediate advertising needs. Organic growth mechanisms do not address your conversion optimization requirements.
* **Protocol PRINTMONEY:** Premature without optimized advertising infrastructure. UGC conversion optimization must precede product scaling.

### [ FINAL DIRECTIVE ]
Initialize Protocol INBADDIESWETRUST for immediate advertising performance acceleration.`;
    } else if (lowercaseInput.includes('start') || lowercaseInput.includes('new') || lowercaseInput.includes('learn') || 
               lowercaseInput.includes('guide') || lowercaseInput.includes('course') || lowercaseInput.includes('cheap') ||
               lowercaseInput.includes('budget') || lowercaseInput.includes('under 1000')) {
      const isBeginner = lowercaseInput.includes('start') || lowercaseInput.includes('new') || 
                        lowercaseInput.includes('learn') || lowercaseInput.includes('beginner');
      const mode = isBeginner ? 'Beginner Mode' : 'Professional Mode';
      
      return `## [ STRATEGIC ANALYSIS COMPLETE ]

### Primary Protocol: **Protocol PRINTMONEY (${mode})**
High-density strategic intelligence deployment optimal for your operational parameters.

### Mission Rationale:
Your stated objective "${input}" indicates budget-conscious strategic positioning. Protocol PRINTMONEY (<$1000, one-time) provides comprehensive frameworks through high-density PDF delivery. ${mode} application is specifically calibrated for your current operational level. This protocol contains the complete strategic intelligence necessary for ${isBeginner ? 'agency framework establishment with low capital requirements' : 'advanced lead generation framework deployment for established operators'}.

### Collateral Protocol Assessment:
* **Protocol XVIRALITY:** Budget incompatible. $1500/m recurring investment exceeds your stated operational parameters.
* **Protocol INBADDIESWETRUST:** Operationally premature. Premium UGC deployment requires established advertising infrastructure and higher budget allocation.

### [ FINAL DIRECTIVE ]
Acquire Protocol PRINTMONEY immediately. Intelligence-based optimization is your most viable advancement vector.`;
    } else {
      return `## [ STRATEGIC ANALYSIS COMPLETE ]

### Primary Protocol: **Protocol PRINTMONEY (Professional Mode)**
Knowledge monetization framework deployment detected as optimal revenue vector.

### Mission Rationale:
Your objective "${input}" indicates established operational capacity with knowledge-based product potential. Protocol PRINTMONEY provides comprehensive frameworks for creating, launching, and scaling high-margin digital products. This system includes market validation protocols, content architecture optimization, and automated sales funnel deployment mechanisms designed for professional operators seeking systematic revenue generation.

### Collateral Protocol Assessment:
* **Protocol XVIRALITY:** Complementary but secondary. Audience acquisition enhances product deployment but is not immediately critical for established operators.
* **Protocol INBADDIESWETRUST:** Acceleration protocol for later phases. UGC campaigns optimize customer acquisition after product establishment.

### [ FINAL DIRECTIVE ]
Commence Protocol PRINTMONEY development cycle. Strategic intelligence monetization is your optimal advancement path.`;
    }
  };

  return (
    <div 
      ref={containerRef}
      id="master-container"
      className={`fixed inset-0 bg-void-primary state-${state.toLowerCase()}`}
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
        
        {(state === 'RESULTS' || state === 'REJECTED') && result && (
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