import React, { useState, useEffect, useRef } from 'react';

interface SovietTerminalProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export const SovietTerminal = ({ text, speed = 30, onComplete }: SovietTerminalProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <div className="soviet-terminal">
      <div className="terminal-screen">
        <div className="terminal-header">
          <div className="terminal-title">█████ СЕКРЕТНАЯ СИСТЕМА АНАЛИЗА █████</div>
          <div className="terminal-status">
            <span className="status-indicator"></span>
            АКТИВИРОВАНО
          </div>
        </div>
        
        <div ref={terminalRef} className="terminal-content">
          <div className="terminal-text">
            {displayedText}
            {!isComplete && <span className="terminal-cursor">█</span>}
          </div>
        </div>
        
        <div className="terminal-footer">
          <div className="system-info">
            СИСТЕМА: YEGOR_OS_v2.0 | ПРОЦЕССОР: BRUTALIST_AI | СТАТУС: АНАЛИЗ ЗАВЕРШЕН
          </div>
        </div>
      </div>
    </div>
  );
};