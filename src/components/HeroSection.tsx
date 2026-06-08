import React from 'react';
import { Page } from '../types';
import { Star, ShieldCheck, Heart, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onBookAppointment: () => void;
  onExploreServices: () => void;
}

export default function HeroSection({ onBookAppointment, onExploreServices }: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden ambient-peach-glow">
      {/* Dynamic Background Glow Rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-salon-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col items-center text-center">
        
        {/* Social Proof Badges with micro avatars */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 mb-6 px-4 py-1.5 bg-white/70 backdrop-blur-md rounded-full border border-peach-dark/30 shadow-sm"
        >
          <div className="flex -space-x-2">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=50&q=80" 
              alt="Customer 1" 
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=50&q=80" 
              alt="Customer 2" 
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=50&q=80" 
              alt="Customer 3" 
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs font-semibold text-charcoal-deep font-sans">
            32K+ Happy customers in Sri Lanka
          </span>
        </motion.div>

        {/* Serif Headings: "Let your hair shine with strength & beauty" */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6.5xl font-normal leading-tight tracking-tight text-charcoal-deep max-w-4xl"
        >
          Let your hair shine with <br />
          <span className="italic font-medium text-salon-accent relative inline-block">
            strength & beauty
          </span>
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-charcoal-light max-w-xl font-sans leading-relaxed"
        >
          A haircut is just the beginning. Experience hair artistry in Sri Lanka that enhances your natural beauty, restores chemical bonds, and boosts your inner confidence.
        </motion.p>

        {/* Action button matching the warm orange pill from image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onBookAppointment}
            className="px-8 py-3.5 bg-salon-accent text-white font-semibold text-sm rounded-full hover:bg-salon-accent-hover transition-all duration-300 shadow-md shadow-salon-accent/20 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Book an appointment
          </button>
          
          <button
            onClick={onExploreServices}
            className="px-8 py-3.5 bg-white text-charcoal-deep border border-peach-dark font-semibold text-sm rounded-full hover:bg-peach-light/50 transition-all duration-300 shadow-sm cursor-pointer"
          >
            Explore Services
          </button>
        </motion.div>

        {/* Staggered Tilted Image Gallery - Exact Match to the Layout */}
        <div className="mt-16 w-full max-w-5xl flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8 px-4">
          
          {/* Image 1: Left Tilted Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -30, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 50, delay: 0.4 }}
            className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-white/95 shrink-0 transform -rotate-4 hover:rotate-0 transition-transform duration-500 cursor-pointer relative group"
            onClick={onExploreServices}
          >
            <img 
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=500&q=80" 
              alt="Hair coloring session" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-left">
              <span className="text-[10px] uppercase tracking-wider text-salon-accent font-bold font-sans">Precision Prep</span>
              <p className="text-xs text-white font-medium">Bespoke Coloring Setup</p>
            </div>
          </motion.div>

          {/* Image 2: Center Floating Elegant Portrait with Hair Flow */}
          <motion.div 
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 50, delay: 0.5 }}
            className="w-72 h-88 rounded-2xl overflow-hidden shadow-xl border-4 border-white shrink-0 z-10 transform scale-105 hover:scale-110 transition-transform duration-500 cursor-pointer relative group"
            onClick={onExploreServices}
          >
            <img 
              src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=500&q=80" 
              alt="Beautiful blonde balayage glowing hair model" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-left">
              <span className="text-[10px] uppercase tracking-wider text-salon-accent font-bold font-sans animate-pulse">Signature Style</span>
              <p className="text-sm text-white font-serif italic">Mosh Honey Balayage</p>
            </div>
          </motion.div>

          {/* Image 3: Right Tilted Frame with Curler */}
          <motion.div 
            initial={{ opacity: 0, x: 30, rotate: 8 }}
            animate={{ opacity: 1, x: 0, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 50, delay: 0.6 }}
            className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-white/95 shrink-0 transform rotate-4 hover:rotate-0 transition-transform duration-500 cursor-pointer relative group"
            onClick={onExploreServices}
          >
            <img 
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80" 
              alt="Stylist warming/curling locks of blonde hair" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-left">
              <span className="text-[10px] uppercase tracking-wider text-salon-accent font-bold font-sans">Final Touch</span>
              <p className="text-xs text-white font-medium">Delicate Spiral Curls</p>
            </div>
          </motion.div>

        </div>

        {/* Featured Testimonial Under the Tilted Reels */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 max-w-xl flex flex-col items-center gap-3"
        >
          {/* Reviews Rating Stars */}
          <div className="flex items-center gap-0.5" id="stars-row">
            {[1, 2, 3, 4, 5].map((index) => (
              <Star key={index} className="w-4.5 h-4.5 fill-salon-accent text-salon-accent" />
            ))}
          </div>
          
          <p className="font-serif text-lg md:text-xl italic font-normal text-charcoal-deep leading-relaxed">
            "The stylists at Mosh guided me through every step of my hair transformation with amazing expert care."
          </p>

          <div className="flex items-center gap-3 mt-1 text-left">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" 
              alt="Sarah Johnson Client" 
              className="w-10 h-10 rounded-full object-cover border border-peach-dark"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-xs font-bold text-charcoal-deep tracking-tight font-sans">Sarah Johnson</p>
              <p className="text-[10px] text-charcoal-light font-sans uppercase">Balayage & Styling client</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
