'use client';

import { useState } from 'react';
import { storeDetails } from '@/data';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-ink relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Book an Appointment</h2>
            <p className="text-gray-400 font-light mb-12 max-w-md">
              Experience our collections in person. Schedule a private consultation with our jewelry experts.
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-gold text-sm uppercase tracking-widest mb-2">Visit Us</h4>
                <p className="text-white font-light">{storeDetails.address}</p>
              </div>
              <div>
                <h4 className="text-gold text-sm uppercase tracking-widest mb-2">Contact</h4>
                <p className="text-white font-light">{storeDetails.phone1}</p>
                <p className="text-white font-light">{storeDetails.phone2}</p>
                <p className="text-white font-light mt-2">{storeDetails.email}</p>
              </div>
              <div>
                <h4 className="text-gold text-sm uppercase tracking-widest mb-2">Hours</h4>
                <p className="text-white font-light">{storeDetails.hours}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-charcoal p-8 md:p-10 border border-white/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Message / Request</label>
                <textarea 
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-gold text-ink py-4 uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors disabled:opacity-50 mt-4"
              >
                {status === 'submitting' ? 'Sending...' : 'Request Appointment'}
              </button>
              
              {status === 'success' && (
                <p className="text-green-400 text-sm text-center mt-4">Your request has been sent successfully.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-4">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${storeDetails.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </section>
  );
}

