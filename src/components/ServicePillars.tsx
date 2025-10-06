import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const services = [
  {
    name: 'XVIRALITY',
    url: 'https://xvirality.pro',
    tagline: 'VIRAL DOMINATION',
    position: 'left'
  },
  {
    name: 'IN BADDIES WE TRUST',
    url: 'https://inbaddieswetrust.pro',
    tagline: 'ELITE NETWORK',
    position: 'center'
  },
  {
    name: 'PRINTMONEY.PRO',
    url: 'https://printmoney.pro',
    tagline: 'FINANCIAL WARFARE',
    position: 'right'
  }
];

export const ServicePillars = () => {
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pillarsRef.current) return;

    const leftPillar = pillarsRef.current.querySelector('.pillar-left');
    const rightPillar = pillarsRef.current.querySelector('.pillar-right');
    const centerPillar = pillarsRef.current.querySelector('.pillar-center');

    const tl = gsap.timeline({ delay: 0.5 });

    tl.from([leftPillar, rightPillar], {
      duration: 1.5,
      opacity: 0,
      scale: 0.8,
      ease: 'power3.out',
      stagger: 0.2
    })
    .from(centerPillar, {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: 'power3.out'
    }, '-=0.8');

  }, []);

  return (
    <div ref={pillarsRef} className="fixed inset-0 pointer-events-none z-50">
      {/* Left Pillar */}
      <div className="pillar-left absolute left-0 top-0 h-full w-32 md:w-48 pointer-events-auto">
        <div className="h-full flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blood-accent/20 to-transparent blur-xl pointer-events-none"></div>
          <a 
            href={services[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 group"
          >
            <div className="writing-mode-vertical text-center">
              <div className="text-2xl md:text-4xl font-display text-blood-accent mb-4 tracking-wider
                            group-hover:text-shadow-glow transition-all duration-300
                            [writing-mode:vertical-rl] [text-orientation:mixed]">
                {services[0].name}
              </div>
              <div className="text-xs md:text-sm text-mono text-document-aged/70 tracking-widest
                            [writing-mode:vertical-rl] [text-orientation:mixed]">
                {services[0].tagline}
              </div>
            </div>
            <div className="absolute inset-0 border-r-2 border-blood-accent/30 
                          group-hover:border-blood-accent transition-all duration-300
                          group-hover:shadow-[0_0_20px_rgba(255,59,59,0.5)]"></div>
          </a>
        </div>
      </div>

      {/* Right Pillar */}
      <div className="pillar-right absolute right-0 top-0 h-full w-32 md:w-48 pointer-events-auto">
        <div className="h-full flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-l from-blood-accent/20 to-transparent blur-xl pointer-events-none"></div>
          <a 
            href={services[2].url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 group"
          >
            <div className="writing-mode-vertical text-center">
              <div className="text-2xl md:text-4xl font-display text-blood-accent mb-4 tracking-wider
                            group-hover:text-shadow-glow transition-all duration-300
                            [writing-mode:vertical-rl] [text-orientation:mixed]">
                {services[2].name}
              </div>
              <div className="text-xs md:text-sm text-mono text-document-aged/70 tracking-widest
                            [writing-mode:vertical-rl] [text-orientation:mixed]">
                {services[2].tagline}
              </div>
            </div>
            <div className="absolute inset-0 border-l-2 border-blood-accent/30 
                          group-hover:border-blood-accent transition-all duration-300
                          group-hover:shadow-[0_0_20px_rgba(255,59,59,0.5)]"></div>
          </a>
        </div>
      </div>

      {/* Center Top Pillar */}
      <div className="pillar-center absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-96 pointer-events-auto">
        <div className="pt-4 md:pt-8">
          <a 
            href={services[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative z-10 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blood-accent/20 to-transparent blur-xl pointer-events-none"></div>
              <div className="relative text-center border-b-2 border-blood-accent/30 pb-4
                            group-hover:border-blood-accent transition-all duration-300
                            group-hover:shadow-[0_0_20px_rgba(255,59,59,0.5)]">
                <div className="text-xl md:text-3xl font-display text-blood-accent mb-2 tracking-wider
                              group-hover:text-shadow-glow transition-all duration-300">
                  {services[1].name}
                </div>
                <div className="text-xs md:text-sm text-mono text-document-aged/70 tracking-widest">
                  {services[1].tagline}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Converging Lines to Center */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--blood-accent))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--blood-accent))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--blood-accent))" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Left to center lines */}
        <line x1="10%" y1="20%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="10%" y1="50%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="10%" y1="80%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        
        {/* Right to center lines */}
        <line x1="90%" y1="20%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="90%" y1="50%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="90%" y1="80%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        
        {/* Top to center lines */}
        <line x1="50%" y1="10%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
      </svg>
    </div>
  );
};
