'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!headerRef.current) return;

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

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-charcoal border-y border-white/5">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4">Our Services</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="p-8 border border-white/10 bg-ink hover:border-gold/50 transition-colors duration-500 text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-ink text-gold transition-all duration-500">
                <span className="font-serif text-xl">{index + 1}</span>
              </div>
              <h3 className="font-serif text-xl text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
