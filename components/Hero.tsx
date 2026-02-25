'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storeDetails } from '@/data';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !imageRef.current) return;

    const tl = gsap.timeline({ delay: 2.5 }); // Wait for preloader

    tl.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div ref={imageRef} className="absolute inset-0 z-0 scale-110">
        <Image 
          src="https://picsum.photos/1920/1080?random=10" 
          alt="Luxury Jewelry" 
          fill 
          className="object-cover opacity-30"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink"></div>
      </div>

      <div ref={textRef} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-gold text-xs md:text-sm uppercase tracking-[0.4em] mb-4">
          {storeDetails.established}
        </h2>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          A World of <br className="hidden md:block" />
          <span className="italic text-gold">Jewellery</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Providing premium quality gold, silver, and gemstone jewelry at wholesale rates.
        </p>
        <a 
          href="#collections"
          className="inline-block px-8 py-4 bg-gold text-ink uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors duration-300"
        >
          Explore Collections
        </a>
      </div>
    </section>
  );
}

