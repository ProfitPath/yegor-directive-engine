'use client';

import { useEffect, useRef } from 'react';

export const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grain animation
    let animationId: number;
    
    const renderGrain = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      // Generate subtle grain
      for (let i = 0; i < data.length; i += 4) {
        const grain = Math.random() * 20; // Low intensity grain
        data[i] = grain;     // Red
        data[i + 1] = grain; // Green
        data[i + 2] = grain; // Blue
        data[i + 3] = Math.random() * 10; // Low alpha for subtlety
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(renderGrain);
    };

    renderGrain();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};