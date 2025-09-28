import { useState, useEffect } from 'react';

export function useTypewriter(fullText: string, durationInSeconds: number) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    // Reset on text change
    setTypedText(''); 
    
    if (!fullText) return;

    // ULTRA-HIGH-VELOCITY: rAF-driven chunk typing to bypass timer clamping
    let i = 0;
    let rafId = 0;
    const msPerChar = 0.01; // 0.01ms per character (effectively instant for typical lengths)
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = now - lastTime; // ms elapsed since last frame
      lastTime = now;

      const charsToAdd = Math.max(1, Math.floor(delta / msPerChar));
      const nextIndex = Math.min(fullText.length, i + charsToAdd);

      if (nextIndex > i) {
        setTypedText((prev) => prev + fullText.slice(i, nextIndex));
        i = nextIndex;
      }

      if (i < fullText.length) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [fullText, durationInSeconds]);

  return typedText;
}