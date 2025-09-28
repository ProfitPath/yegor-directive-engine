'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';

interface ProcessingAnimationProps {
  userInput: string;
}

// 3D Wireframe Object Component
const WireframeObject = () => {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    // Rotation animation
    gsap.to(meshRef.current.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 4,
      ease: 'none',
      repeat: -1
    });

    // Pulsing scale animation
    gsap.to(meshRef.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 2,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true
    });
  }, []);

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[2, 0]} />
      <meshBasicMaterial color="#FF0000" wireframe />
    </mesh>
  );
};

export const ProcessingAnimation = ({ userInput }: ProcessingAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [diagnosticLines, setDiagnosticLines] = useState<string[]>([]);
  const [phase, setPhase] = useState(0);

  const allDiagnosticLines = [
    'ДЕКОДИРОВАНИЕ НАМЕРЕНИЙ...',
    'PARSING SEMANTIC VECTORS',
    'MARKET VECTOR ANALYSIS INITIATED',
    'COMPILING PSYCHOMETRIC PROFILE',
    'ПРОТОКОЛ АКТИВИРОВАН',
    'NEURAL PATHWAYS MAPPING',
    'INTENT CLASSIFICATION IN PROGRESS',
    'BEHAVIORAL PATTERN RECOGNITION',
    'COMPETITIVE ANALYSIS RUNNING',
    'REVENUE POTENTIAL CALCULATING',
    'STRATEGIC ALIGNMENT CHECKING',
    'FINAL CLASSIFICATION SEQUENCE',
    'РЕЗУЛЬТАТ ГОТОВ...'
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    let lineIndex = 0;

    // Initial glitch effect
    tl.to(containerRef.current, {
      duration: 0.1,
      x: '+=10',
      y: '+=5',
      repeat: 5,
      yoyo: true,
      ease: 'power2.inOut'
    })
    
    // Main processing sequence
    .add(() => {
      setPhase(1);
      
      // Add diagnostic lines progressively
      const interval = setInterval(() => {
        if (lineIndex < allDiagnosticLines.length) {
          setDiagnosticLines(prev => [...prev, allDiagnosticLines[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(interval);
          // Trigger climax after all lines are shown
          setTimeout(() => {
            setPhase(2);
          }, 500);
        }
      }, 300);
    }, 0.5)
    
    // Climax flash effect
    .to(containerRef.current, {
      duration: 0.017, // 1 frame at 60fps
      backgroundColor: '#FFFFFF',
      delay: 4.5
    })
    .to(containerRef.current, {
      duration: 0.1,
      backgroundColor: 'hsl(var(--void-primary))'
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-1 relative overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <WireframeObject />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate />
          </Canvas>
        </div>
      </div>

      {/* Diagnostic Text Streams */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left stream */}
        <div className="absolute left-8 top-1/4 space-y-2 opacity-60">
          {diagnosticLines.slice(0, Math.ceil(diagnosticLines.length / 2)).map((line, index) => (
            <div 
              key={`left-${index}`}
              className="text-mono-diagnostic text-shadow-whisper"
              style={{
                animationDelay: `${index * 0.3}s`,
                animation: 'fadeIn 0.5s ease-out forwards'
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Right stream */}
        <div className="absolute right-8 top-1/3 space-y-2 opacity-60">
          {diagnosticLines.slice(Math.ceil(diagnosticLines.length / 2)).map((line, index) => (
            <div 
              key={`right-${index}`}
              className="text-mono-diagnostic text-shadow-whisper text-right"
              style={{
                animationDelay: `${(index + Math.ceil(diagnosticLines.length / 2)) * 0.3}s`,
                animation: 'fadeIn 0.5s ease-out forwards'
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Bottom stream - User input analysis */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-mono-diagnostic text-document-aged opacity-80">
            ANALYZING INPUT: "{userInput.toUpperCase()}"
          </div>
          <div className="text-mono-diagnostic text-blood-accent mt-2">
            CLASSIFICATION IN PROGRESS...
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="flex justify-between items-center text-mono-diagnostic text-shadow-whisper">
          <span>NEURAL_ENGINE_V1.0</span>
          <span>SEC_LVL: CLASSIFIED</span>
          <span>PROC_TIME: {Math.floor(Math.random() * 1000) + 3000}ms</span>
        </div>
      </div>
    </div>
  );
};