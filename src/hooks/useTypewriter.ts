import { useState, useEffect } from 'react';

export function useTypewriter(fullText: string, durationInSeconds: number) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    // Reset on text change
    setTypedText(''); 
    
    if (fullText) {
      // HIGH-VELOCITY PROTOCOL: Fixed delay for constant brutally fast speed
      const totalChars = fullText.length;
      const delay = 3; // 3ms per character for maximum efficiency
      let i = 0;

      const intervalId = setInterval(() => {
        setTypedText((prev) => prev + fullText.charAt(i));
        i++;
        if (i >= totalChars) {
          clearInterval(intervalId);
        }
      }, delay);

      return () => clearInterval(intervalId);
    }
  }, [fullText, durationInSeconds]);

  return typedText;
}