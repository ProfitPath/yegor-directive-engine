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

  // THE IRON DOCTRINE - Sequential Analysis Protocol v4.0
  const analyzeObjective = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    // **STEP 1: BUDGETARY VIABILITY ASSESSMENT** - First and most critical filter
    const rejectionTriggers = ['cheap', 'free', 'broke', 'no money', 'poor'];
    const budgetNumbers = input.match(/\$(\d+)|(\d+)\s*(dollars?|bucks?|usd)/gi);
    
    // Check for rejection triggers
    if (rejectionTriggers.some(trigger => lowercaseInput.includes(trigger))) {
      return "Even Yegor can't save you. 💔";
    }
    
    // Check for specific monetary amounts below $100
    if (budgetNumbers) {
      for (const match of budgetNumbers) {
        const amount = parseInt(match.replace(/[^\d]/g, ''));
        if (amount < 100) {
          return "Even Yegor can't save you. 💔";
        }
      }
    }
    
    // **STEP 2: OBJECTIVE & SOPHISTICATION ANALYSIS**
    const beginnerIndicators = ['start', 'new', 'learn', 'beginner', 'begin'];
    const professionalIndicators = ['scale', 'improve', 'optimize', 'established', 'already'];
    const budgetConstraintIndicators = ['under 1000', 'less than 1000', 'budget', '500', '300'];
    
    const isBeginnerMode = beginnerIndicators.some(indicator => lowercaseInput.includes(indicator));
    const isProfessionalMode = professionalIndicators.some(indicator => lowercaseInput.includes(indicator));
    const hasBudgetConstraint = budgetConstraintIndicators.some(indicator => lowercaseInput.includes(indicator));
    
    // **STEP 3: PROTOCOL SELECTION**
    
    // XVIRALITY Protocol - B2B, Twitter, lead generation, calls
    if (lowercaseInput.includes('twitter') || lowercaseInput.includes('b2b') || 
        lowercaseInput.includes('clients') || lowercaseInput.includes('calls') || 
        lowercaseInput.includes('authority') || lowercaseInput.includes('lead generation') || 
        lowercaseInput.includes('viral') || lowercaseInput.includes('consulting')) {
      
      return `## [ STRATEGIC ANALYSIS COMPLETE ]

### Primary Protocol: **Protocol XVIRALITY**
High-leverage viral inbound system deployment required for your engagement vector.

### Mission Rationale:
Your stated objective "${input}" indicates a sophisticated understanding of value-based growth mechanics. Protocol XVIRALITY ($1500/m) is specifically engineered for B2B lead generation and high-value traffic acquisition through Twitter/X domination. This system provides reliable client acquisition infrastructure for founders and consultants who understand that investment drives results. The protocol leverages viral coefficient optimization and algorithmic preference exploitation to generate consistent sales calls and qualified leads.

### Collateral Protocol Assessment:
* **Protocol INBADDIESWETRUST:** Tactically irrelevant. Your objective requires audience development, not creative asset optimization for existing ad campaigns.
* **Protocol PRINTMONEY:** Your operational sophistication exceeds the framework-based approach. You require active system deployment, not strategic documentation.

### [ FINAL DIRECTIVE ]
Deploy Protocol XVIRALITY immediately. Authority-based client acquisition is your optimal revenue vector.`;
    }
    
    // INBADDIESWETRUST Protocol - ads, UGC, video, ecom, ROAS
    if (lowercaseInput.includes('ads') || lowercaseInput.includes('ugc') || 
        lowercaseInput.includes('video') || lowercaseInput.includes('e-com') || 
        lowercaseInput.includes('roas') || lowercaseInput.includes('conversions') ||
        lowercaseInput.includes('facebook') || lowercaseInput.includes('tiktok') ||
        lowercaseInput.includes('ecommerce') || lowercaseInput.includes('creative')) {
      
      return `## [ STRATEGIC ANALYSIS COMPLETE ]

### Primary Protocol: **Protocol INBADDIESWETRUST**
Elite UGC deployment system required for your advertising optimization objective.

### Mission Rationale:
Analysis of "${input}" reveals direct correlation with paid advertising performance requirements. Protocol INBADDIESWETRUST provides access to premium Eastern European models specializing in high-conversion UGC campaigns. This system is engineered for businesses running Facebook, TikTok, or other paid traffic who understand that superior creative assets drive superior ROAS. The protocol features elite creator matching and performance optimization specifically designed to generate exceptional results.

### Collateral Protocol Assessment:
* **Protocol XVIRALITY:** Incompatible operational vector. Your focus is creative optimization, not organic audience development.
* **Protocol PRINTMONEY:** Insufficient for your requirements. You need active creator deployment, not framework documentation.

### [ FINAL DIRECTIVE ]
Engage Protocol INBADDIESWETRUST immediately. Superior creative assets are your competitive advantage.`;
    }
    
    // PRINTMONEY Protocol - budget constraints, frameworks, courses, guides
    if (hasBudgetConstraint || lowercaseInput.includes('framework') || 
        lowercaseInput.includes('guide') || lowercaseInput.includes('course') || 
        lowercaseInput.includes('pdf') || lowercaseInput.includes('info')) {
      
      const mode = isBeginnerMode ? 'Beginner Mode' : 'Professional Mode';
      
      return `## [ STRATEGIC ANALYSIS COMPLETE ]

### Primary Protocol: **Protocol PRINTMONEY (${mode})**
High-density strategic intelligence deployment optimal for your operational parameters.

### Mission Rationale:
Your stated objective "${input}" combined with your operational budget places you directly in the optimal engagement window for Protocol PRINTMONEY (<$1000, one-time). ${mode} application is specifically calibrated for your current operational level. This protocol contains the complete strategic intelligence necessary for ${isBeginnerMode ? 'agency framework establishment with low capital requirements' : 'advanced lead generation framework deployment for established operators'}.

### Collateral Protocol Assessment:
* **Protocol XVIRALITY:** Budget incompatible. $1500/m recurring investment exceeds your stated operational parameters.
* **Protocol INBADDIESWETRUST:** Operationally premature. Premium UGC deployment requires established advertising infrastructure and higher budget allocation.

### [ FINAL DIRECTIVE ]
Acquire Protocol PRINTMONEY immediately. Intelligence-based optimization is your most viable advancement vector.`;
    }
    
    // Default PRINTMONEY Professional Mode for general queries
    return `## [ STRATEGIC ANALYSIS COMPLETE ]

### Primary Protocol: **Protocol PRINTMONEY (Professional Mode)**
Knowledge monetization framework deployment detected as optimal revenue vector.

### Mission Rationale:
Your objective "${input}" indicates established operational capacity with knowledge-based product potential. Protocol PRINTMONEY provides comprehensive frameworks for creating, launching, and scaling high-margin digital products. This system includes market validation protocols, content architecture optimization, and automated sales funnel deployment mechanisms designed for professional operators seeking systematic revenue generation.

### Collateral Protocol Assessment:
* **Protocol XVIRALITY:** Misaligned objective. Your focus is product creation, not B2B lead generation through social authority.
* **Protocol INBADDIESWETRUST:** Incompatible operational vector. Your requirements are strategic framework deployment, not advertising creative optimization.

### [ FINAL DIRECTIVE ]
Secure Protocol PRINTMONEY immediately. Systematic knowledge monetization is your path to financial independence.`;
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