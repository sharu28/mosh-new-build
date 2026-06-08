import React, { useState } from 'react';
import { Page, GalleryItem } from '../types';
import { GALLERY, SERVICES } from '../data/salonData';
import { 
  Instagram, Scissors, SlidersHorizontal, Check, 
  ArrowRight, Heart, RefreshCw, Star, Trash2, Layers, HelpCircle, FileCheck, Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryPageProps {
  setCurrentPage: (page: Page) => void;
  setPreselectedServiceId: (id: string) => void;
}

export default function GalleryPage({ setCurrentPage, setPreselectedServiceId }: GalleryPageProps) {
  // Gallery filtering categories
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Before/After split toggle states (mapping item ID to active state)
  const [showAfterState, setShowAfterState] = useState<Record<string, boolean>>({
    'g-1': true,
    'g-2': true,
    'g-3': true
  });

  // Hairstyle Moodboard Draft Builder interactive State
  const [draftLength, setDraftLength] = useState('long');
  const [draftColor, setDraftColor] = useState('honey');
  const [draftTexture, setDraftTexture] = useState('frizzy');
  const [compiledResult, setCompiledResult] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'Color Transformation', label: 'Color Makeovers' },
    { id: 'Cut & Re-Style', label: 'Structural Cuts' },
    { id: 'Treatment Cure', label: 'Fiber Repairs' }
  ];

  const filteredGallery = activeCategory === 'all' 
    ? GALLERY 
    : GALLERY.filter(item => item.category === activeCategory);

  const toggleBeforeAfter = (id: string) => {
    setShowAfterState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleBookService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setCurrentPage('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compile custom hairstyle moodboard formula
  const handleCompileMoodboard = () => {
    let suggestedServiceId = 'haircut-precision';
    let suggestedTitle = 'Classic Textured Shear Transformation';
    let suggestedFormulaCode = 'MOSH-TX4-HNY';
    
    // Mapping rules
    if (draftTexture === 'frizzy') {
      suggestedServiceId = 'hair-care';
      suggestedTitle = 'Anti-Frizz Steam reconstruction with Honey Gloss';
    } else if (draftColor === 'copper') {
      suggestedServiceId = 'hair-colors';
      suggestedTitle = 'Infused Copper Pigment High-Gloss Treatment';
    } else if (draftColor === 'honey') {
      suggestedServiceId = 'hair-colors';
      suggestedTitle = 'Precision Long Wave Balayage Warm Honey Formula';
    } else if (draftLength === 'short') {
      suggestedServiceId = 'hair-nanoplastia';
      suggestedTitle = 'Signature Shag Bob & Detail fringe Cut';
    }

    const matchedService = SERVICES.find(s => s.id === suggestedServiceId) || SERVICES[0];

    setCompiledResult({
      title: suggestedTitle,
      length: draftLength,
      color: draftColor,
      texture: draftTexture,
      formulaCode: suggestedFormulaCode,
      matchedService: matchedService,
      tip: `Recommended and tuned for Sri Lankan weather patterns. Protect hair cells using organic hydrating formulas.`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="gallery-page-container">
      
      {/* 1. Header Portion matching design inspiration screenshot 2 */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[10px] font-bold uppercase text-charcoal-light tracking-widest font-sans flex items-center gap-1 justify-center">
          — — Gallery
        </span>
        <h1 className="font-serif text-3.5xl md:text-5xl font-normal text-charcoal-deep leading-tight mt-3">
          Explore our transformations <br />
          and hair makeovers
        </h1>
        
        {/* Instagram Pill Button - Exact copy from design screenshot */}
        <div className="mt-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-full hover:bg-salon-accent transition-colors duration-300 font-sans shadow shadow-black/10"
          >
            <Instagram className="w-3.5 h-3.5 text-salon-accent" />
            More on Instagram
          </a>
        </div>
      </div>

      {/* 2. Before & After Interactive Transformations Slider/Listing */}
      <section className="mb-20">
        <div className="flex border-b border-peach-light pb-4 mb-8 justify-between items-end flex-col sm:flex-row gap-4">
          <div>
            <span className="text-[10px] text-salon-accent font-extrabold uppercase tracking-widest font-sans">Real Success Stories</span>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal-deep mt-1 leading-none">Interactive Client Transformations</h2>
          </div>

          {/* Categories filter caps */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 sm:pb-0 no-scrollbar">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-1.5 text-[11px] font-sans font-bold rounded-full transition-all cursor-pointer ${
                  activeCategory === c.id 
                    ? 'bg-charcoal-deep text-white shadow'
                    : 'bg-peach-light/40 text-charcoal-light hover:bg-peach-light/90'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transformation Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredGallery.map((item) => {
            const isShowingAfter = showAfterState[item.id] !== false;
            return (
              <div
                key={item.id}
                className="bg-white border border-peach-dark rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group h-full justify-between"
              >
                <div>
                  {/* Photo Container with toggle view */}
                  <div className="relative h-72 overflow-hidden bg-peach-dark">
                    <img
                      src={isShowingAfter ? item.afterUrl : item.beforeUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Before After Toggle Badge overlay */}
                    <button
                      onClick={() => toggleBeforeAfter(item.id)}
                      className="absolute bottom-4 right-4 bg-white/95 backdrop-blur border border-peach-dark px-3 py-1.5 rounded-xl text-[10px] font-bold font-sans text-charcoal-deep shadowHover flex items-center gap-1 hover:text-salon-accent transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                      View {isShowingAfter ? 'Before Model' : 'After Result'}
                    </button>

                    <div className="absolute top-4 left-4 bg-charcoal-deep/80 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-widest font-sans px-3 py-1 rounded-full">
                      {isShowingAfter ? 'AFTER MAKE-OVER' : 'BEFORE MODEL'}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] font-bold text-salon-accent uppercase tracking-wider font-sans bg-peach-light/40 px-2 rounded">
                      {item.category}
                    </span>
                    
                    <h3 className="font-serif text-base font-semibold text-charcoal-deep mt-2 leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-charcoal-light font-sans mt-3 leading-relaxed">
                      {item.description}
                    </p>

                    {item.reviewText && (
                      <div className="mt-4 bg-peach-light/25 border border-peach-light rounded-2xl p-4 relative">
                        <Quote className="absolute top-3 left-3 w-4 h-4 text-salon-accent/20" />
                        <p className="text-[11px] text-charcoal-light italic font-sans leading-relaxed pl-4">
                          "{item.reviewText}"
                        </p>
                        <p className="text-[10px] font-bold text-charcoal-deep font-sans mt-2.5 text-right">— {item.clientName}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto border-t border-peach-light/45 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-charcoal-light">Satisfied score</span>
                    <div className="flex text-salon-accent text-xs">★★★★★</div>
                  </div>
                  
                  {/* Select corresponding recommended service instantly */}
                  <button
                    onClick={() => {
                      if (item.id === 'g-1') handleBookService('hair-colors');
                      if (item.id === 'g-2') handleBookService('hair-nanoplastia');
                      if (item.id === 'g-3') handleBookService('hair-keratin');
                    }}
                    className="text-xs font-bold font-sans text-salon-accent hover:text-charcoal-deep transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Select this style
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive Hair Color & Length Visualizer / Moodboard Draft Tool */}
      <section className="bg-peach-light/35 border border-peach-dark rounded-3xl p-6 md:p-10">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans flex items-center gap-1.5 justify-center">
            <Scissors className="w-3.5 h-3.5" />
            Style Drafting Labs
          </span>
          <h2 className="font-serif text-2xl md:text-3.5xl font-normal text-charcoal-deep mt-1 leading-tight">
            Design Your Custom Hairstyle Moodboard
          </h2>
          <p className="text-xs text-charcoal-light font-sans mt-2 leading-relaxed">
            Experiment with lengths, textures, and color highlights. Our interactive compounder drafts custom formulas and highlights matching salon procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Config Controls */}
          <div className="lg:col-span-6 bg-white border border-peach-dark/80 rounded-2xl p-5 md:p-6 flex flex-col gap-6 text-left">
            {/* Length selector */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase font-bold text-salon-accent tracking-wider font-sans">
                1. Intended Length / Cut
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'short', label: 'Short Bob', desc: 'Sassy chin frame' },
                  { id: 'medium', label: 'Medium Shag', desc: 'Shoulder bounce' },
                  { id: 'long', label: 'Long Waves', desc: 'Luxurious fall-out' }
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setDraftLength(l.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      draftLength === l.id 
                        ? 'border-salon-accent bg-peach-light/20 shadow-sm'
                        : 'border-peach-dark bg-cream-white/20 hover:bg-white'
                    }`}
                  >
                    <p className="text-xs font-bold text-charcoal-deep">{l.label}</p>
                    <p className="text-[9px] text-charcoal-light mt-0.5">{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Target highlight color */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase font-bold text-salon-accent tracking-wider font-sans">
                2. Target Color highlights
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'honey', label: 'Honey Warm', colorCode: 'bg-amber-400' },
                  { id: 'caramel', label: 'Caramel Blush', colorCode: 'bg-amber-600' },
                  { id: 'ash', label: 'Platinum Ash', colorCode: 'bg-slate-300' },
                  { id: 'copper', label: 'Vibrant Copper', colorCode: 'bg-orange-600' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setDraftColor(c.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center cursor-pointer transition-all ${
                      draftColor === c.id 
                        ? 'border-salon-accent bg-peach-light/20 shadow-sm'
                        : 'border-peach-dark bg-cream-white/20 hover:bg-white'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full ${c.colorCode} border border-white shadow-sm`} />
                    <p className="text-[9px] font-bold text-charcoal-deep mt-1 text-center truncate w-full">{c.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Current locks texture */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase font-bold text-salon-accent tracking-wider font-sans">
                3. Current Hair Condition / texture
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'frizzy', label: 'Frizzy or Dry', desc: 'Stressed follicles' },
                  { id: 'thin', label: 'Thin & Flat', desc: 'Needs shape support' },
                  { id: 'curly', label: 'Curly or Coils', desc: 'Needs rich definition' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setDraftTexture(t.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      draftTexture === t.id 
                        ? 'border-salon-accent bg-peach-light/20 shadow-sm'
                        : 'border-peach-dark bg-cream-white/20 hover:bg-white'
                    }`}
                  >
                    <p className="text-xs font-bold text-charcoal-deep">{t.label}</p>
                    <p className="text-[9px] text-charcoal-light mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCompileMoodboard}
              className="mt-2 w-full py-3.5 bg-charcoal-deep hover:bg-salon-accent text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow flex items-center justify-center gap-1.5 font-sans"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Compile Custom Style Moodboard
            </button>
          </div>

          {/* Compiled Output Formula and suggestion */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {compiledResult ? (
                <motion.div
                  key="compiled-details"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="bg-white border border-peach-dark rounded-2xl p-6 text-left flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex justify-between items-center pb-3 border-b border-peach-light">
                      <span className="text-[9px] uppercase tracking-widest font-extrabold text-salon-accent bg-peach-light px-2.5 py-0.5 rounded border border-salon-accent/10">
                        Synthesized Formula
                      </span>
                      <span className="font-mono text-xs font-bold text-charcoal-light">{compiledResult.formulaCode}</span>
                    </div>

                    <h3 className="font-serif text-lg md:text-xl font-semibold text-charcoal-deep leading-tight mt-4">
                      {compiledResult.title}
                    </h3>

                    {/* Meta tag bubbles */}
                    <div className="flex flex-wrap gap-2 mt-3 text-[10px] text-charcoal-light uppercase font-bold font-sans">
                      <span className="bg-peach-light/40 px-3 py-1 rounded-full border border-peach-light">Length: {compiledResult.length}</span>
                      <span className="bg-peach-light/40 px-3 py-1 rounded-full border border-peach-light">Color: {compiledResult.color}</span>
                      <span className="bg-peach-light/40 px-3 py-1 rounded-full border border-peach-light">Texture: {compiledResult.texture}</span>
                    </div>

                    <div className="mt-5 p-4 bg-cream-soft/60 border border-peach-light rounded-xl">
                      <p className="text-xs text-charcoal-light italic font-sans leading-relaxed">
                        "{compiledResult.tip}"
                      </p>
                    </div>

                    {/* Suggested matching treatment service */}
                    <div className="bg-peach-light/10 border border-peach-dark/60 rounded-xl p-4 mt-5 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-salon-accent font-bold block">Best Matching service</span>
                        <p className="font-serif text-sm font-semibold text-charcoal-deep leading-none mt-0.5">{compiledResult.matchedService.name}</p>
                        <p className="text-[11px] font-sans text-charcoal-light mt-1 font-bold">Rs. {compiledResult.matchedService.priceLKR.toLocaleString()}</p>
                      </div>

                      <span className="text-[10px] text-charcoal-light font-mono bg-peach-light px-2.5 py-0.5 rounded shrink-0">
                        ⏱ {compiledResult.matchedService.durationMinutes} Mins
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-peach-light flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => handleBookService(compiledResult.matchedService.id)}
                      className="w-full py-3 bg-salon-accent hover:bg-salon-accent-hover text-white rounded-full text-xs font-semibold font-sans shadow-md shadow-salon-accent/20 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <FileCheck className="w-4 h-4" />
                      Add to Booking and Schedule
                    </button>
                    
                    <button
                      onClick={() => setCompiledResult(null)}
                      className="w-full sm:w-auto py-3 px-5 bg-white hover:bg-peach-light/30 border border-peach-dark rounded-full text-xs font-semibold text-charcoal-light cursor-pointer"
                    >
                      Reset Draft
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white/40 border border-dashed border-peach-dark rounded-2xl p-8 text-center flex flex-col items-center justify-center h-full min-h-[360px] gap-3">
                  <div className="p-3 bg-peach-light rounded-full text-salon-accent animate-bounce">
                    <SlidersHorizontal className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-serif text-base font-semibold text-charcoal-deep">Waiting for config</p>
                    <p className="text-xs text-charcoal-light max-w-xs font-sans mt-1 mx-auto leading-relaxed">
                      Select your intended lengths, target undertones and textures in the adjacent control panel to generate your custom style formula!
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  );
}
