'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '@/data';

gsap.registerPlugin(ScrollTrigger);

export default function CategoryShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    // Header Animation
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      }
    );

    // Cards Fade In
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    // Parallax Effect on Images
    imagesRef.current.forEach((img, index) => {
      if (!img || !cardsRef.current[index]) return;
      
      gsap.to(img, {
        yPercent: 20, // Move image down slightly as we scroll
        ease: 'none',
        scrollTrigger: {
          trigger: cardsRef.current[index],
          start: 'top bottom', // Start when card enters bottom of viewport
          end: 'bottom top',   // End when card leaves top of viewport
          scrub: true,         // Link animation to scroll position
        },
      });
    });
  }, []);

  return (
    <section id="collections" ref={sectionRef} className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Collections</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative h-[500px] overflow-hidden cursor-pointer"
            >
              {/* Image Container scaled up to allow parallax movement without showing edges */}
              <div className="absolute inset-0 -top-[10%] -bottom-[10%]">
                <Image 
                  ref={(el) => { imagesRef.current[index] = el; }}
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-serif text-2xl text-white mb-2">{category.name}</h3>
                <span className="text-gold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  View Collection
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

