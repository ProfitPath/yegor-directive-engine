import { useState, useEffect } from 'react';

interface TerminalTextOptions {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export function useTerminalText({ 
  texts, 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000 
}: TerminalTextOptions) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Deleting characters
        setDisplayText(currentText.substring(0, displayText.length - 1));
        
        if (displayText.length === 1) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        // Typing characters
        setDisplayText(currentText.substring(0, displayText.length + 1));
        
        if (displayText.length === currentText.length - 1) {
          setIsPaused(true);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, isPaused, texts, typeSpeed, deleteSpeed, pauseTime]);

  return displayText;
}