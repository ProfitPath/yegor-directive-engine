'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import { BootSequence } from './BootSequence';
import { PromptInput } from './PromptInput';
import { ResultsDisplay } from './ResultsDisplay';
import { CustomCursor } from './CustomCursor';
import { ServicePillars } from './ServicePillars';
import { supabase } from '@/integrations/supabase/client';

// PHASE 1: CODE SPLITTING - Lazy load heavy 3D components
const ProcessingAnimation = React.lazy(() => 
  import('./ProcessingAnimation').then(module => ({ default: module.ProcessingAnimation }))
);

export type EngineState = 'BOOT' | 'IDLE' | 'PROCESSING' | 'RESULTS' | 'REJECTED' | 'ERROR';

export const SortingEngine = () => {
  const [state, setState] = useState<EngineState>('BOOT');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
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
      
      // Strategic Analysis Engine - Now powered by Claude
      const analysisResult = await analyzeObjective(input);
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
    setConversationHistory([]); // Clear conversation history on reset
  };

  // THE IRON DOCTRINE - Sequential Analysis Protocol v4.0 - Now powered by Claude
  const analyzeObjective = async (input: string): Promise<string> => {
    try {
      console.log('Calling Claude analysis for:', input);
      console.log('Current conversation history length:', conversationHistory.length);
      
      const { data, error } = await supabase.functions.invoke('claude-analysis', {
        body: { 
          userInput: input,
          conversationHistory: conversationHistory
        }
      });

      if (error) {
        console.error('Claude analysis error:', error);
        throw error;
      }

      if (!data || !data.result) {
        throw new Error('Invalid response from analysis system');
      }

      // Update conversation history with new exchange
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: input },
        { role: 'assistant', content: data.result }
      ]);

      console.log('Claude analysis completed successfully');
      return data.result;
      
    } catch (error) {
      console.error('Analysis system failure:', error);
      
      // Fallback to ensure system never fails completely
      return `## [ SYSTEM FAULT DETECTED ]

### Emergency Protocol: **DIAGNOSTIC MODE**
Analysis system temporarily offline. Manual intervention required.

### Mission Status:
Your objective "${input}" has been logged for priority processing. Our strategic analysis AI is currently undergoing system maintenance. This is not a reflection of your objective's viability, but rather a temporary operational constraint.

### [ EMERGENCY DIRECTIVE ]
Please reinitialize the protocol in 60 seconds. If the issue persists, the system will automatically deploy backup analysis protocols.`;
    }
  };

  return (
    <div 
      ref={containerRef}
      id="master-container"
      className={`state-${state.toLowerCase()} ${state === 'RESULTS' || state === 'REJECTED' ? 'results-active' : ''}`}
    >
      {/* Service Pillars - Only show during BOOT and IDLE states */}
      {(state === 'BOOT' || state === 'IDLE') && <ServicePillars />}
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Main content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {state === 'BOOT' && <BootSequence />}
        
        {state === 'IDLE' && (
          <PromptInput onSubmit={handleInputSubmit} />
        )}
        
        {state === 'PROCESSING' && (
          <Suspense fallback={
            <div className="flex-1 flex items-center justify-center text-mono text-document-aged">
              [ LOADING ANALYSIS MODULES... ]
            </div>
          }>
            <ProcessingAnimation userInput={userInput} />
          </Suspense>
        )}
        
        {(state === 'RESULTS' || state === 'REJECTED') && result && (
          <ResultsDisplay result={result} onReset={handleReset} onContinueSubmit={handleInputSubmit} />
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