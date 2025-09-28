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

export interface ServiceRecommendation {
  service_name: 'XVIRALITY' | 'INBADDIESWETRUST' | 'PRINTMONEY';
  justification?: string;
  analysis?: string;
}

export interface AnalysisResult {
  primary_recommendations: ServiceRecommendation[];
  secondary_analysis: ServiceRecommendation[];
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

  // Advanced AI analysis function - Precision Analysis Engine
  const analyzeMockInput = (input: string): AnalysisResult => {
    const lowerInput = input.toLowerCase();
    
    // Determine primary recommendations based on advanced analysis
    const primary_recommendations: ServiceRecommendation[] = [];
    const secondary_analysis: ServiceRecommendation[] = [];
    
    // Multi-service detection
    const isTwitterFocused = lowerInput.includes('twitter') || lowerInput.includes('x.com') || lowerInput.includes('followers') || lowerInput.includes('growth') || lowerInput.includes('viral') || lowerInput.includes('audience') || lowerInput.includes('threads');
    const isUGCFocused = lowerInput.includes('ugc') || lowerInput.includes('content') || lowerInput.includes('video') || lowerInput.includes('ads') || lowerInput.includes('creators') || lowerInput.includes('roas') || lowerInput.includes('conversions');
    const isInfoProductFocused = lowerInput.includes('course') || lowerInput.includes('info product') || lowerInput.includes('digital product') || lowerInput.includes('selling knowledge') || lowerInput.includes('guide') || lowerInput.includes('teach');
    
    // Primary recommendations logic
    if (isTwitterFocused && isInfoProductFocused) {
      primary_recommendations.push({
        service_name: 'XVIRALITY',
        justification: 'DETECTED AUDIENCE AMPLIFICATION VECTOR - Twitter growth protocol required for maximum reach'
      });
      primary_recommendations.push({
        service_name: 'PRINTMONEY',
        justification: 'DETECTED MONETIZATION INTENT - Info product protocol necessary for revenue conversion'
      });
      secondary_analysis.push({
        service_name: 'INBADDIESWETRUST',
        analysis: 'UGC content matrix could amplify both Twitter presence and product marketing effectiveness'
      });
    } else if (isUGCFocused && isInfoProductFocused) {
      primary_recommendations.push({
        service_name: 'INBADDIESWETRUST',
        justification: 'DETECTED HIGH-CONVERSION CONTENT REQUIREMENT - UGC protocol essential for ad performance'
      });
      primary_recommendations.push({
        service_name: 'PRINTMONEY',
        justification: 'DETECTED KNOWLEDGE MONETIZATION VECTOR - Digital product framework required'
      });
      secondary_analysis.push({
        service_name: 'XVIRALITY',
        analysis: 'Twitter amplification could provide additional distribution channel for content strategy'
      });
    } else if (isTwitterFocused) {
      primary_recommendations.push({
        service_name: 'XVIRALITY',
        justification: 'SOCIAL MEDIA AMPLIFICATION PROTOCOL ACTIVATED - Twitter dominance vector identified'
      });
      secondary_analysis.push(
        {
          service_name: 'INBADDIESWETRUST',
          analysis: 'UGC content could enhance Twitter engagement and follower conversion rates'
        },
        {
          service_name: 'PRINTMONEY',
          analysis: 'Growing audience creates optimal conditions for info product monetization'
        }
      );
    } else if (isUGCFocused) {
      primary_recommendations.push({
        service_name: 'INBADDIESWETRUST',
        justification: 'CONTENT CREATION MATRIX INITIALIZED - High-conversion UGC protocol required'
      });
      secondary_analysis.push(
        {
          service_name: 'XVIRALITY',
          analysis: 'Twitter amplification could maximize UGC content reach and engagement'
        },
        {
          service_name: 'PRINTMONEY',
          analysis: 'Proven content creation skills optimal foundation for info product development'
        }
      );
    } else if (isInfoProductFocused) {
      primary_recommendations.push({
        service_name: 'PRINTMONEY',
        justification: 'DIGITAL REVENUE OPTIMIZATION SEQUENCE DEPLOYED - Monetization protocol activated'
      });
      secondary_analysis.push(
        {
          service_name: 'XVIRALITY',
          analysis: 'Twitter audience growth essential for info product distribution and sales'
        },
        {
          service_name: 'INBADDIESWETRUST',
          analysis: 'UGC content creation could provide powerful marketing assets for product promotion'
        }
      );
    } else {
      // Default fallback - analyze based on general business intent
      primary_recommendations.push({
        service_name: 'PRINTMONEY',
        justification: 'GENERAL BUSINESS OPTIMIZATION DETECTED - Revenue generation protocol recommended'
      });
      secondary_analysis.push(
        {
          service_name: 'XVIRALITY',
          analysis: 'Twitter presence could provide customer acquisition and brand authority'
        },
        {
          service_name: 'INBADDIESWETRUST',
          analysis: 'Professional UGC content essential for modern digital marketing effectiveness'
        }
      );
    }
    
    return {
      primary_recommendations,
      secondary_analysis
    };
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