'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section id="featured" ref={sectionRef} className="py-24 bg-ink">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Featured Pieces</h2>
            <div className="w-16 h-0.5 bg-gold"></div>
          </div>
          <a href="#" className="hidden md:inline-block text-gold uppercase tracking-widest text-sm hover:text-white transition-colors mt-6 md:mt-0">
            View All Jewelry
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(212, 175, 55, 0.15)" // Soft golden glow
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-pointer bg-charcoal p-4 rounded-sm border border-white/5 hover:border-gold/30 transition-colors duration-300"
            >
              <div className="relative aspect-square mb-6 overflow-hidden bg-ink rounded-sm">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-center pb-2">
                <span className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">{product.category}</span>
                <h3 className="font-serif text-lg text-white mb-1 group-hover:text-gold transition-colors duration-300">{product.name}</h3>
                <p className="text-gold font-light">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-block border border-gold px-8 py-3 text-gold uppercase tracking-widest text-sm hover:bg-gold hover:text-ink transition-colors">
            View All Jewelry
          </a>
        </div>
      </div>
    </section>
  );
}

