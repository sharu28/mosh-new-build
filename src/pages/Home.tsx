import React, { useState } from 'react';
import { Page } from '../types';
import HeroSection from '../components/HeroSection';
import { SERVICES, PRODUCTS } from '../data/salonData';
import { 
  Heart, CheckCircle2, Star, Quote, ArrowRight,
  ChevronLeft, ChevronRight, ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
  setPreselectedServiceId: (id: string) => void;
}

export default function Home({ setCurrentPage, setPreselectedServiceId }: HomeProps) {
  // Navigation actions helpers
  const handleBookNow = () => {
    setCurrentPage('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLearnMore = () => {
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuggestAndBook = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setCurrentPage('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  // Highlights 3 elite services matching the screenshot bottom section
  const highlights = SERVICES.slice(0, 3);

  // Popular Products Carousel Slider
  const [productIndex, setProductIndex] = useState(0);
  const popularProducts = PRODUCTS.filter(p => p.isPopular);

  // Wedding Switcher
  const [weddingTab, setWeddingTab] = useState<'brides' | 'grooms'>('brides');

  const nextProduct = () => {
    setProductIndex((prev) => (prev + 1) % popularProducts.length);
  };

  const prevProduct = () => {
    setProductIndex((prev) => (prev - 1 + popularProducts.length) % popularProducts.length);
  };

  return (
    <div className="flex flex-col w-full" id="home-page-container">
      {/* 1. Hero Module */}
      <HeroSection 
        onBookAppointment={handleBookNow} 
        onExploreServices={handleLearnMore} 
      />

      {/* 4. Expert Premium Services Tailored For You Section */}
      <section className="py-20 bg-white border-t border-peach-dark/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans">
                Our Services
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-charcoal-deep leading-tight mt-2">
                Expert premium hair <br />
                services tailored for you
              </h2>
            </div>
            
            <button
              onClick={handleLearnMore}
              className="px-6 py-3 bg-charcoal-deep text-white hover:bg-salon-accent text-xs font-semibold rounded-full font-sans transition-all shadow-sm"
            >
              See All Services
            </button>
          </div>

          {/* Highlights grids of services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-cream-white/20 border border-peach-dark rounded-3xl overflow-hidden shadow-sm group hover:border-salon-accent hover:shadow-lg transition-all duration-300"
              >
                {item.imageUrl && (
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-salon-accent text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      From Rs. {item.priceLKR.toLocaleString()}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <span className="text-[9px] uppercase tracking-wider text-salon-accent font-bold font-sans">
                    {item.tagline || 'Popular Request'}
                  </span>
                  
                  <h3 className="font-serif text-lg font-bold text-charcoal-deep mt-1 leading-snug">
                    {item.name}
                  </h3>
                  
                  <p className="text-xs text-charcoal-light font-sans mt-2.5 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="border-t border-peach-light pt-4 mt-6 flex items-center justify-between">
                    <span className="text-[10px] text-charcoal-light font-mono bg-peach-light px-2.5 py-0.5 rounded">
                      ⏱ Duration: {item.durationMinutes} Mins
                    </span>

                    <button
                      onClick={() => handleSuggestAndBook(item.id)}
                      className="text-xs font-bold font-sans text-salon-accent hover:text-charcoal-deep transition-colors cursor-pointer"
                    >
                      Book treatment
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4.5 Most Popular Products Carousel Slider Section */}
      <section className="py-20 bg-cream-soft border-t border-peach-dark/30 overflow-hidden" id="popular-products-gallery">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans">
                Boutique Best-Sellers
              </span>
              <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-charcoal-deep leading-tight mt-1.5">
                Most popular salon care <br />
                available for home glow
              </h2>
              <p className="text-xs text-charcoal-light font-sans mt-3 max-w-md leading-relaxed">
                Exquisite, internationally certified hair repair formulas and protective elixirs recommended by our Colombo master artists to sustain professional results.
              </p>
            </div>

            {/* Slider triggers */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevProduct}
                className="p-3 bg-white border border-peach-dark hover:bg-salon-accent hover:text-white text-charcoal-deep rounded-full transition-all duration-300 shadow-sm hover:scale-105"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextProduct}
                className="p-3 bg-white border border-peach-dark hover:bg-salon-accent hover:text-white text-charcoal-deep rounded-full transition-all duration-300 shadow-sm hover:scale-105"
                aria-label="Next product"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => { setCurrentPage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="ml-2 px-6 py-3 bg-charcoal-deep hover:bg-salon-accent text-cream-soft hover:text-white text-xs font-semibold rounded-full font-sans transition-all shadow-sm flex items-center gap-2 group"
              >
                <span>Visit Boutique Shop</span> 
                <ArrowRight className="w-4 h-4 text-salon-accent group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Slider content wrapper */}
          <div className="relative">
            {/* Soft backdrop blur decoration */}
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-salon-accent/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-salon-accent/10 rounded-full blur-2xl pointer-events-none" />

            {/* Carousel track wrapper */}
            <div className="overflow-hidden py-4">
              <motion.div 
                className="flex gap-6"
                animate={{ 
                  x: `-${productIndex * (100 / popularProducts.length)}%` 
                }}
                transition={{ type: 'spring', damping: 28, stiffness: 120 }}
                style={{ 
                  width: `${popularProducts.length * 100}%` 
                }}
              >
                {popularProducts.map((prod) => (
                  <div 
                    key={prod.id} 
                    style={{ width: `${100 / popularProducts.length}%` }}
                    className="px-2"
                  >
                    <div className="bg-white border border-peach-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[450px]">
                      <div>
                        {/* Image aspect box */}
                        <div className="h-56 overflow-hidden relative bg-peach-light/20">
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 bg-charcoal-deep text-cream-soft text-[8px] tracking-widest font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm">
                            {prod.brand}
                          </div>
                          
                          {/* Unit Stock Warning */}
                          {prod.stock <= 15 && (
                            <div className="absolute top-3 right-3 bg-salon-accent text-white text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-sm">
                              LIMITED STOCK
                            </div>
                          )}
                        </div>

                        {/* Text details */}
                        <div className="p-5">
                          <span className="text-[9px] uppercase tracking-wider text-salon-accent font-bold font-sans">
                            {prod.category} Therapy Core
                          </span>
                          <h3 className="font-serif text-base font-semibold text-charcoal-deep mt-1 leading-snug line-clamp-1">
                            {prod.name}
                          </h3>
                          <p className="text-xs text-charcoal-light font-sans mt-2.5 line-clamp-2 leading-relaxed">
                            {prod.description}
                          </p>
                          
                          {/* Rating score stars */}
                          <div className="flex items-center gap-1.5 mt-3">
                            <div className="flex text-charcoal-deep">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <span className="text-[10px] text-charcoal-light font-sans font-medium">({prod.reviewsCount} reviews)</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer price & trigger */}
                      <div className="p-5 pt-0 border-t border-peach-light/40 mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-charcoal-light block">Boutique price</span>
                          <span className="font-mono text-xs font-extrabold text-charcoal-deep">
                            {prod.priceLKR.toLocaleString()} LKR
                          </span>
                        </div>
                        
                        <button
                          onClick={() => {
                            setCurrentPage('shop');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex items-center gap-1.5 text-xs font-bold font-sans text-salon-accent hover:text-charcoal-deep transition-colors group/btn"
                        >
                          Shop Product <ShoppingBag className="w-4 h-4 text-salon-accent group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Visual Indicators Indicator Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {popularProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setProductIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    productIndex === idx ? 'w-6 bg-salon-accent' : 'w-2 bg-peach-dark'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 4.8 Weddings & Bridal Artistry Section - Brides By Mosh & Grooms By Mosh */}
      <section className="py-24 bg-white border-t border-peach-dark/30 relative overflow-hidden" id="weddings-bridal-showcase">
        {/* Ambient absolute glow effects */}
        <div className="absolute right-0 top-1/4 w-72 h-72 bg-peach-light/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-salon-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 text-center flex flex-col items-center">
            <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans bg-peach-light/50 px-4 py-1.5 rounded-full self-center">
              Timeless Colombo Luxury
            </span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-normal text-charcoal-deep leading-tight mt-3">
              Crafting timeless elegance <br />
              <span className="font-serif italic text-salon-accent">for your sacred moments</span>
            </h2>
            <p className="text-xs text-charcoal-light font-sans mt-3 max-w-xl leading-relaxed">
              We understand that your wedding day defines a lifetime. Our master hair designers, contour artists, and drapers create cohesive, modern-traditional styles tailored to radiate beautifully under any lens.
            </p>

            {/* Interactive Tab Switcher for Brides / Grooms */}
            <div className="flex justify-center gap-3 mt-8 bg-cream-soft p-1.5 rounded-full border border-peach-dark">
              <button
                onClick={() => setWeddingTab('brides')}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold font-sans transition-all duration-300 flex items-center gap-2 ${
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
                className={`px-6 py-2.5 rounded-full text-xs font-semibold font-sans transition-all duration-300 flex items-center gap-2 ${
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

          {/* Tab content with spring transition container */}
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
                  {/* Brides Text Left */}
                  <div className="lg:col-span-5 text-left space-y-6">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-salon-accent block font-sans">
                      BRIDES BY MOSH SITEMAP EXCLUSIVE
                    </span>
                    <h3 className="font-serif text-2.5xl md:text-3.5xl font-normal text-charcoal-deep leading-tight">
                      Traditional Kandyan & <br />Modern Western Brides
                    </h3>
                    <p className="text-xs text-charcoal-light font-sans leading-relaxed">
                      Our signature brides represent an exquisite harmony of biological hair styling, lightweight high-definition facial sculpting, and perfect heritage draping. We specialize in Kandyan, South-Indian, and luxury Western wedding bridal styles using premier hypoallergenic cosmetics.
                    </p>

                    <div className="space-y-3.5 py-2">
                      <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                        <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                        <div><strong>Complete Trial Included:</strong> Full hair mockups and HD airbrush contour matches 3 weeks prior.</div>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                        <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                        <div><strong>Flower & Pearl Hair Weaving:</strong> Custom fresh jasmine weave and structural crown pin-ups.</div>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                        <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                        <div><strong>Bespoke Saree & Veil Draping:</strong> Meticulous placement support for heavy traditional pleats.</div>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleSuggestAndBook('bridal-royal')}
                        className="px-6 py-3 bg-salon-accent hover:bg-charcoal-deep text-white text-xs font-semibold rounded-full font-sans transition-all shadow-md shadow-salon-accent/10"
                        id="btn-book-royal-bridal"
                      >
                        Book Royal Bridal (Rs 85,000)
                      </button>
                      <button
                        onClick={() => handleSuggestAndBook('bridal-traditional')}
                        className="px-6 py-3 border border-peach-dark hover:bg-peach-light text-charcoal-deep text-xs font-semibold rounded-full font-sans transition-all"
                        id="btn-book-traditional-bridal"
                      >
                        Traditional Bridal (Rs 72,000)
                      </button>
                    </div>
                  </div>

                  {/* Brides Images Right */}
                  <div className="lg:col-span-7 grid grid-cols-12 gap-4">
                    <div className="col-span-8 h-[400px] rounded-3xl overflow-hidden shadow-lg border border-peach-dark relative group">
                      <img
                        src="https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=700&q=80"
                        alt="Brides by Mosh Luxury Traditional Bridal Dressing Sri Lanka"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-transparent flex items-end p-6 text-left">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest font-extrabold text-salon-accent block font-sans">Elite Bridal Portrait</span>
                          <h4 className="font-serif text-lg text-white font-medium">Bespoke Royal Hair Design & Crown</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-4 flex flex-col gap-4">
                      <div className="h-[192px] rounded-3xl overflow-hidden shadow-md border border-peach-dark">
                        <img
                          src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=400&q=80"
                          alt="Detailed bridal makeup jewelry by Mosh"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="h-[192px] rounded-3xl overflow-hidden shadow-md border border-peach-dark bg-cream-soft p-5 flex flex-col justify-between text-left">
                        <Quote className="w-5 h-5 text-salon-accent" />
                        <p className="font-serif italic text-[11px] text-charcoal-deep leading-relaxed">
                          "Felt like absolute royalty on my wedding day. Sophia's hands on my hair styling and saree drape pins were flawless!"
                        </p>
                        <span className="text-[9px] font-bold text-salon-accent uppercase tracking-wider font-sans block">— Menaka Perera, Galle Face Bride</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Grooms Images Left */}
                  <div className="lg:col-span-7 grid grid-cols-12 gap-4">
                    <div className="col-span-4 flex flex-col gap-4">
                      <div className="h-[192px] rounded-3xl overflow-hidden shadow-md border border-peach-dark">
                        <img
                          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80"
                          alt="Professional hair detail cuts for grooms by Mosh"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="h-[192px] rounded-3xl overflow-hidden shadow-md border border-peach-dark bg-charcoal-deep p-5 flex flex-col justify-between text-left text-white">
                        <Quote className="w-5 h-5 text-salon-accent" />
                        <p className="font-serif italic text-[11px] text-cream-soft/90 leading-relaxed">
                          "The thermal beard sculpting combined with a calming scalp massage completely eased pre-wedding jitters. Fully recommended."
                        </p>
                        <span className="text-[9px] font-bold text-salon-accent uppercase tracking-wider font-sans block">— Kaveen Dissanayake, Colombo Groom</span>
                      </div>
                    </div>

                    <div className="col-span-8 h-[400px] rounded-3xl overflow-hidden shadow-lg border border-peach-dark relative group">
                      <img
                        src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=80"
                        alt="Grooms by Mosh Grooming Lounge Gentlemen Service"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-transparent flex items-end p-6 text-left">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest font-extrabold text-salon-accent block font-sans">Premium Men's Lounge</span>
                          <h4 className="font-serif text-lg text-white font-medium">Gentlemen Grooming Luxe</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grooms Text Right */}
                  <div className="lg:col-span-5 text-left space-y-6">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-salon-accent block font-sans">
                      GROOMS BY MOSH SITEMAP EXCLUSIVE
                    </span>
                    <h3 className="font-serif text-2.5xl md:text-3.5xl font-normal text-charcoal-deep leading-tight">
                      Exclusively tailored for <br />the elite modern groom
                    </h3>
                    <p className="text-xs text-charcoal-light font-sans leading-relaxed">
                      Look pristine and commanding on your big day. Grooms by Mosh is an elite suite of razor detailing, beard sculpting, micro-exfoliation clay mask therapies, and premium hair molding to guarantee a sharp silhouette under all angles.
                    </p>

                    <div className="space-y-3.5 py-2">
                      <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                        <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                        <div><strong>Sharp Beard Sculpting:</strong> Clean hot-towel straight-cut shave, line definition & organic beard oil.</div>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                        <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                        <div><strong>Thermal Oxygen Facial:</strong> De-clogs pores, repairs dry cells, and restores healthy camera-ready glow.</div>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                        <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                        <div><strong>Groomsmen Group Slots:</strong> Coordinated group styling scheduling to keep entire party synchronized.</div>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleSuggestAndBook('groom-royal')}
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

          {/* Quick FAQ / Detail notice below */}
          <div className="mt-16 p-6 bg-cream-soft rounded-2xl border border-peach-dark flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div>
              <h4 className="text-sm font-semibold text-charcoal-deep font-serif">Planning an out-of-Colombo luxury wedding?</h4>
              <p className="text-[11px] text-charcoal-light mt-0.5">Our certified bridal master draping artists operate premium travel-ready mobile units for islandwide hotel dressing.</p>
            </div>
            <button
              onClick={() => {
                const footer = document.getElementById('footer-salon-contacts');
                if (footer) {
                  footer.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
              }}
              className="px-5 py-2.5 bg-white hover:bg-salon-accent hover:text-white border border-peach-dark hover:border-salon-accent transition-all duration-300 text-xs font-bold uppercase tracking-wider rounded-xl font-sans shrink-0 hover:scale-102"
              id="btn-inquire-wedding"
            >
              Contact Wedding Desk
            </button>
          </div>

        </div>
      </section>

      {/* 5. Elegant Introduction Section: "Hair salon where style and care come together" */}
      <section className="py-24 bg-cream-soft border-t border-peach-dark/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 h-[480px] rounded-3xl overflow-hidden border-4 border-white shadow-xl relative order-2 lg:order-1 group">
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" 
              alt="Mosh luxurious hair salon space Colombo 07" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-end p-8 text-left">
              <div>
                <p className="font-serif text-lg italic text-white leading-tight">Flower Road, Colombo 07 Studio</p>
                <p className="text-xs text-cream-soft/80 font-sans mt-0.5 uppercase tracking-wide">Elite style parlor rooms</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2 text-left">
            <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans">
              About Mosh.lk
            </span>
            
            <h2 className="font-serif text-3.5xl md:text-5xl font-normal text-charcoal-deep leading-tight">
              Hair salon where style <br />
              and care come together
            </h2>

            <div className="flex flex-col gap-4 font-sans text-xs md:text-sm text-charcoal-light leading-relaxed max-w-2xl">
              <p>
                Positioned in Sri Lanka’s premier retail residential precinct Flower Road (Colombo 07), **MOSH** represents a sanctuaries space devoted purely to luxurious styling, specialized moisture therapies, and precision cuts.
              </p>
              <p className="font-medium text-charcoal-deep">
                "Our philosophy is simple: we never compromise hair biology for brief trending styling. Every formula is customized; every shade handpainted."
              </p>
              <p>
                Whether you visiting for a master balayage highlights coloring, an intense thermal bond-rebuilding steam reconstruction, or traditional modern bridal arrangements, our certified specialists ensure gorgeous results that nurture hair follicles beautifully.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-peach-dark max-w-xl">
              <div>
                <h4 className="font-serif text-2xl font-bold text-salon-accent">12+ Yrs</h4>
                <p className="text-[10px] text-charcoal-light uppercase font-semibold font-sans mt-1">Global Experience</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-salon-accent">5.0 ★</h4>
                <p className="text-[10px] text-charcoal-light uppercase font-semibold font-sans mt-1">Google Colombo reviews</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-salon-accent">100%</h4>
                <p className="text-[10px] text-charcoal-light uppercase font-semibold font-sans mt-1">Damage-Free Pledge</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleBookNow}
                className="px-8 py-3.5 bg-charcoal-deep text-white font-semibold text-xs rounded-full hover:bg-salon-accent font-sans transition-all"
              >
                Schedule Consultation Appointment
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
