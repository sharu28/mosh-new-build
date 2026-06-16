import React, { useState } from 'react';
import { Page } from '../types';
import { CheckCircle2, Quote, Clock, Heart, Crown, Landmark, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WeddingsPageProps {
  setCurrentPage: (page: Page) => void;
  setPreselectedServiceId: (id: string) => void;
}

export default function WeddingsPage({ setCurrentPage, setPreselectedServiceId }: WeddingsPageProps) {
  // Wedding Switcher
  const [weddingTab, setWeddingTab] = useState<'brides' | 'grooms'>('brides');

  const handleBookNow = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setCurrentPage('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="weddings-sitemap-page">
      {/* 1. Header Portion */}
      <div className="text-center max-w-4xl mx-auto mb-16 text-center flex flex-col items-center">
        <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans bg-peach-light/50 px-4 py-1.5 rounded-full flex items-center gap-1.5 self-center">
          <Crown className="w-3.5 h-3.5 text-salon-accent" /> Elite Colombo Nuptials
        </span>
        <h1 className="font-serif text-4.5xl md:text-6xl font-normal text-charcoal-deep leading-tight mt-4">
          Timeless elegance styled <br />
          <span className="italic text-salon-accent">for your sacred day of union</span>
        </h1>
        <p className="text-xs text-charcoal-light font-sans mt-4 max-w-xl leading-relaxed">
          We believe your wedding day represents a lifetime defining memory. Our master bridal hair drapers, contour technicians, and gentlemen grooming barbers create cohesive designs radiating pristine luster.
        </p>

        {/* Interactive Tab Switcher for Brides / Grooms with exact sitemap identifiers */}
        <div className="flex justify-center gap-3 mt-10 bg-white p-2 rounded-full border border-peach-dark shadow-sm">
          <button
            onClick={() => setWeddingTab('brides')}
            className={`px-8 py-3 rounded-full text-xs font-semibold font-sans transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              weddingTab === 'brides'
                ? 'bg-salon-accent text-white shadow-md'
                : 'text-charcoal-deep hover:text-salon-accent'
            }`}
            id="tab-brides-by-mosh"
          >
            👰‍♀️ Brides By Mosh
          </button>
          <button
            onClick={() => setWeddingTab('grooms')}
            className={`px-8 py-3 rounded-full text-xs font-semibold font-sans transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              weddingTab === 'grooms'
                ? 'bg-charcoal-deep text-cream-soft shadow-md'
                : 'text-charcoal-deep hover:text-salon-accent'
            }`}
            id="tab-grooms-by-mosh"
          >
            🤵‍♂️ Grooms By Mosh
          </button>
        </div>
      </div>

      {/* 2. Portfolio and Info layouts */}
      <AnimatePresence mode="wait">
        <motion.div
          key={weddingTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {weddingTab === 'brides' ? (
            <>
              {/* Brides Left */}
              <div className="lg:col-span-5 text-left space-y-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-salon-accent block font-sans">
                  EXCLUSIVELY FOR BRIDES BY MOSH
                </span>
                <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-charcoal-deep leading-tight">
                  Traditional Kandyan & <br />Modern Western Brides
                </h2>
                <p className="text-xs text-charcoal-light font-sans leading-relaxed">
                  Our signature bridal designs represent an exquisite balance of biological hair sculpting, delicate lightfast cosmetics, and perfect family drape support. We specialize in Kandyan Mul Saree, South-Indian silk, and luxury lace Western dressings.
                </p>

                <div className="space-y-3.5 py-2">
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                    <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                    <div><strong>Mockup Preparation trial:</strong> Full trial of customized hair layouts 2-3 weeks ahead.</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                    <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                    <div><strong>Flower & Pearl Hair Weave:</strong> Real jasmine flowers and crown arrangements pinned with security.</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                    <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                    <div><strong>Bespoke Saree & Veil Drapes:</strong> Perfect alignment for heavy traditional weights.</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleBookNow('bridal-royal')}
                    className="px-6 py-3 bg-salon-accent hover:bg-charcoal-deep text-white text-xs font-semibold rounded-full font-sans transition-all shadow-md"
                    id="btn-book-royal-bridal"
                  >
                    Book Royal Bridal (Rs 85,000)
                  </button>
                  <button
                    onClick={() => handleBookNow('bridal-traditional')}
                    className="px-6 py-3 border border-peach-dark hover:bg-peach-light text-charcoal-deep text-xs font-semibold rounded-full font-sans transition-all"
                    id="btn-book-traditional-bridal"
                  >
                    Traditional Bridal (Rs 72,000)
                  </button>
                </div>
              </div>

              {/* Brides Right */}
              <div className="lg:col-span-7 grid grid-cols-12 gap-4">
                <div className="col-span-8 h-[440px] rounded-3xl overflow-hidden shadow-lg border border-peach-dark relative group">
                  <img
                    src="https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=800&q=80"
                    alt="Brides by Mosh Luxury Traditional Bridal Dressing Sri Lanka"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-transparent flex items-end p-6 text-left">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-extrabold text-salon-accent block font-sans">Signature Bride Styling</span>
                      <h4 className="font-serif text-lg text-white font-medium">Bespoke Royal Hair Design & Crown Placement</h4>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 flex flex-col gap-4">
                  <div className="h-[212px] rounded-3xl overflow-hidden shadow-md border border-peach-dark">
                    <img
                      src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=400&q=80"
                      alt="Detailed bridal makeup jewelry by Mosh"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="h-[212px] rounded-3xl overflow-hidden shadow-md border border-peach-dark bg-cream-soft p-5 flex flex-col justify-between text-left">
                    <Quote className="w-5 h-5 text-salon-accent" />
                    <p className="font-serif italic text-[11px] text-charcoal-deep leading-relaxed">
                      "Felt absolutely incredible on my Kandyan ceremony! Mosh's draping didn't move an inch all day."
                    </p>
                    <span className="text-[9px] font-bold text-salon-accent uppercase tracking-wider font-sans block">— Menaka Perera, Galle Face Bride</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Grooms Left */}
              <div className="lg:col-span-7 grid grid-cols-12 gap-4">
                <div className="col-span-4 flex flex-col gap-4">
                  <div className="h-[212px] rounded-3xl overflow-hidden shadow-md border border-peach-dark">
                    <img
                      src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80"
                      alt="Professional hair detail cuts for grooms by Mosh"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="h-[212px] rounded-3xl overflow-hidden shadow-md border border-peach-dark bg-charcoal-deep p-5 flex flex-col justify-between text-left text-white">
                    <Quote className="w-5 h-5 text-salon-accent" />
                    <p className="font-serif italic text-[11px] text-cream-soft/90 leading-relaxed">
                      "My haircut and hot straight razor trim lines were absolutely pristine. Fully recomend!"
                    </p>
                    <span className="text-[9px] font-bold text-salon-accent uppercase tracking-wider font-sans block">— Kaveen Dissanayake, Colombo Groom</span>
                  </div>
                </div>

                <div className="col-span-8 h-[440px] rounded-3xl overflow-hidden shadow-lg border border-peach-dark relative group">
                  <img
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
                    alt="Grooms by Mosh Grooming Lounge Gentlemen Service"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-transparent flex items-end p-6 text-left">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-extrabold text-salon-accent block font-sans font-mono">Signature Groom Styling</span>
                      <h4 className="font-serif text-lg text-white font-medium">Gentlemen Grooming Luxury Lounge</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grooms Right */}
              <div className="lg:col-span-5 text-left space-y-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-salon-accent block font-sans">
                  EXCLUSIVELY FOR GROOMS BY MOSH
                </span>
                <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-charcoal-deep leading-tight">
                  Exclusively tailored for <br />the elite modern groom
                </h2>
                <p className="text-xs text-charcoal-light font-sans leading-relaxed">
                  Look dominant and flawless from your entry to final toast. Under Grooms by Mosh, discover hot towel straight-razor detailing, skin scrubbing clay mask remedies, and micro-styling hair waxes that sustain structural mold under video cameras.
                </p>

                <div className="space-y-3.5 py-2">
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                    <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                    <div><strong>Hot Straight Shave:</strong> Premium razor-thin line trimming with hydrating oils.</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                    <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                    <div><strong>Thermal Oxygen Facial:</strong> De-clogs impurities to guarantee clean camera-ready glow.</div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                    <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                    <div><strong>Group Groomsmen Bookings:</strong> Simultaneous stylist slots for bridal parties.</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleBookNow('bridal-groom')}
                    className="px-6 py-3 bg-charcoal-deep hover:bg-salon-accent text-cream-soft hover:text-white text-xs font-semibold rounded-full font-sans transition-all shadow-md"
                    id="btn-book-groom-luxe"
                  >
                    Book Gentlemen Groom Luxe (Rs 24,000)
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 3. Destination Wedding Travel details */}
      <div className="mt-28 bg-cream-soft border border-peach-dark rounded-3xl p-8 md:p-12 text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-2">
          <h3 className="font-serif text-xl md:text-2.5xl font-semibold text-charcoal-deep">Planning a luxury beach or hill country wedding?</h3>
          <p className="text-xs text-charcoal-light font-sans leading-relaxed">
            Our certified bridal team operates fully travel-ready mobile dressings units equipped with backup lights, premium cosmetics, and pro structural pins to serve major luxury resorts islandwide (Bentota, Galle Fort, Kandy, Nuwara Eliya).
          </p>
        </div>
        <div className="md:col-span-4 text-left md:text-right">
          <button
            onClick={() => {
              const footer = document.getElementById('footer-salon-contacts');
              if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3.5 bg-salon-accent hover:bg-charcoal-deep text-white text-xs font-extrabold uppercase tracking-widest rounded-xl font-sans transition-all inline-flex items-center gap-2 shadow-md hover:scale-103"
          >
            Contact Wedding Desk <CornerDownRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
