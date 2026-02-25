'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const text = "Aijaz Jewellers";

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setIsComplete(true), 400);
      }
    });

    tl.to(textRef.current.children, {
      opacity: 1,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: 'back.out(1.7)', // Adds a slight overshoot for elegance
    })
    .to(textRef.current.children, {
      opacity: 0,
      y: -30,
      rotation: -5,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power3.in',
      delay: 0.8,
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
    });

  }, []);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink"
    >
      <h1 
        ref={textRef}
        className="font-serif text-4xl md:text-6xl lg:text-7xl text-gold tracking-widest uppercase italic"
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            style={{
              opacity: 0,
              display: 'inline-block',
              transform: 'translateY(40px) rotate(10deg) scale(0.8)',
              transformOrigin: 'bottom left',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
}



