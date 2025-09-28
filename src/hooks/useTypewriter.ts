import { useState, useEffect, useRef } from 'react';

/**
 * A performance-aware typewriter hook using requestAnimationFrame.
 * This is immune to browser tab throttling.
 * @param {string} fullText - The text to animate.
 * @param {number} charsPerSecond - The desired typing speed.
 */
function useTypewriter(fullText: string, charsPerSecond: number = 333): string {
  const [typedText, setTypedText] = useState('');
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // A 3ms delay is approximately 333 characters per second (1000 / 3).
  // This is a more robust way to define the speed.

  useEffect(() => {
    // Reset the text when the source text changes.
    setTypedText('');
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsedTime = timestamp - startTimeRef.current;
      const charsToShow = Math.min(
        Math.floor(elapsedTime / (1000 / charsPerSecond)),
        fullText.length
      );

      setTypedText(fullText.substring(0, charsToShow));

      if (charsToShow < fullText.length) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    // Start the animation loop.
    requestRef.current = requestAnimationFrame(animate);

    // The cleanup function. This is critical.
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      startTimeRef.current = null;
    };
  }, [fullText, charsPerSecond]);

  return typedText;
}

export default useTypewriter;