import { storeDetails } from '@/data';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 group mb-6 inline-flex">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                <span className="font-serif text-gold group-hover:text-ink text-lg font-bold">AJ</span>
              </div>
              <span className="font-serif text-xl tracking-widest text-white">
                AIJAZ <span className="text-gold">JEWELLERS</span>
              </span>
            </a>
            <p className="text-gray-400 font-light max-w-sm mb-8">
              {storeDetails.tagline}. {storeDetails.established}. Providing premium quality gold, silver, and gemstone jewelry.
            </p>
            <div className="flex space-x-4">
              <a href={storeDetails.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#collections" className="text-gray-400 hover:text-gold transition-colors font-light">Collections</a></li>
              <li><a href="#featured" className="text-gray-400 hover:text-gold transition-colors font-light">Featured</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-gold transition-colors font-light">Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-gold transition-colors font-light">Book Appointment</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 font-light">
                <MapPin size={18} className="text-gold shrink-0 mt-1" />
                <span>{storeDetails.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 font-light">
                <Phone size={18} className="text-gold shrink-0" />
                <span>{storeDetails.phone1} <br/> {storeDetails.phone2}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 font-light">
                <Mail size={18} className="text-gold shrink-0" />
                <span>{storeDetails.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm font-light mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {storeDetails.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm font-light">
            Designed with elegance.
          </p>
        </div>
      </div>
    </footer>
  );
}

