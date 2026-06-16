import React from 'react';
import { Page } from '../types';
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-deep text-cream-soft pt-16 pb-8 px-6 md:px-12 border-t border-charcoal-deep/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-cream-soft/10">
        
        {/* Brand Brief */}
        <div className="md:col-span-1.5 flex flex-col gap-4">
          <div className="flex items-center">
            <img
              src="/mosh-logo.png"
              alt="MOSH Aesthetics"
              className="h-10 w-auto object-contain invert"
            />
          </div>
          <p className="text-xs text-cream-soft/70 leading-relaxed max-w-sm font-sans">
            Your destination for professional beauty — salon-quality haircare &amp; skincare from globally trusted brands, delivered islandwide across Sri Lanka.
          </p>
          <div className="flex items-center gap-3 mt-2 text-cream-soft/50">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-cream-soft/5 hover:bg-white hover:text-charcoal-deep rounded-full transition-all duration-300">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-cream-soft/5 hover:bg-white hover:text-charcoal-deep rounded-full transition-all duration-300">
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-cream-soft/5 hover:bg-white hover:text-charcoal-deep rounded-full transition-all duration-300">
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase font-semibold text-white tracking-widest font-sans">Menu</p>
          <ul className="flex flex-col gap-2.5 text-xs text-cream-soft/70 font-sans">
            <li>
              <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors">
                About & Reviews
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('hair')} className="hover:text-white transition-colors">
                Hair Care
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('skin')} className="hover:text-white transition-colors">
                Skin Clinic
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('slimming')} className="hover:text-white transition-colors">
                Slimming Care
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('weddings')} className="hover:text-white transition-colors">
                Weddings & Bridal
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('services')} className="hover:text-white transition-colors">
                Browse All Services
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('process')} className="hover:text-white transition-colors">
                Our Master Stylists
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('gallery')} className="hover:text-white transition-colors">
                Transformations Gallery
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('shop')} className="hover:text-white transition-colors">
                Premium Apothecary Shop
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('bookings')} className="hover:text-white transition-colors font-medium text-white">
                Book an Appointment
              </button>
            </li>
          </ul>
        </div>

        {/* Social / Media Columns */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase font-semibold text-white tracking-widest font-sans">Socials</p>
          <ul className="flex flex-col gap-2.5 text-xs text-cream-soft/70 font-sans">
            <li><a href="#instagram" className="hover:text-white transition-colors">Instagram Portfolio</a></li>
            <li><a href="#pinterest" className="hover:text-white transition-colors">Pinterest Board</a></li>
            <li><a href="#youtube" className="hover:text-white transition-colors">YouTube Video Guides</a></li>
            <li><a href="#facebook" className="hover:text-white transition-colors font-sans">Facebook Community</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase font-semibold text-white tracking-widest font-sans">Info & Contacts</p>
          <ul className="flex flex-col gap-3 text-xs text-cream-soft/70 font-sans">
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-cream-soft/40 uppercase">E-mail</p>
                <a href="mailto:appointments@mosh.lk" className="hover:text-white transition-colors">appointments@mosh.lk</a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-cream-soft/40 uppercase">Phone Call</p>
                <a href="tel:+94112345678" className="hover:text-white transition-colors">+94 (11) 234-5678</a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-cream-soft/40 uppercase">Our Studio</p>
                <span className="leading-snug">42 Flower Road, Colombo 07, Sri Lanka</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Deep Footer details & credits */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream-soft/40 font-sans">
        <p>© 2026 Mosh. All rights reserved. Crafted with hair artistry passion.</p>
        <p className="flex items-center gap-1">
          Made in Sri Lanka with <Heart className="w-3 h-3 text-white fill-white" />
        </p>
      </div>
    </footer>
  );
}
