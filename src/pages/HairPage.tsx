import React from 'react';
import { Page, Service } from '../types';
import { SERVICES } from '../data/salonData';
import { Clock, CheckCircle2, Heart, ArrowRight, CornerDownRight } from 'lucide-react';

interface HairPageProps {
  setCurrentPage: (page: Page) => void;
  setPreselectedServiceId: (id: string) => void;
}

export default function HairPage({ setCurrentPage, setPreselectedServiceId }: HairPageProps) {
  // Only display HAIR category services from database
  const hairServices = SERVICES.filter(s => s.category === 'hair');

  const handleBookNow = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setCurrentPage('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="hair-sitemap-page">
      {/* 1. Header Section */}
      <div className="text-left mb-16 max-w-3xl">
        <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans bg-peach-light/50 px-3.5 py-1.5 rounded-full inline-flex">
          Boutique Hair Clinic
        </span>
        <h1 className="font-serif text-4xl md:text-5.5xl font-normal text-charcoal-deep leading-tight mt-4">
          Catering to your hair’s <br />
          <span className="italic font-serif text-salon-accent">deepest biological needs</span>
        </h1>
        <p className="text-xs text-charcoal-light font-sans mt-4 max-w-xl leading-relaxed">
          Colombo's premier hair destination. Explore our specialized, high-performance services designed using internationally certified formulas to achieve straight glass-like finishes, vivid high-gloss colors, and total fiber restoration.
        </p>
      </div>

      {/* 2. Highlight Callouts mapped to the exact sitemap nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
        {[
          { title: 'Keratin Care', type: 'Hair Therapy', desc: 'Anti-frizz humidity sealing' },
          { title: 'Colors & Glow', type: 'Hair Therapy', desc: 'Dimensional hand-paint' },
          { title: 'Nanoplastia', type: 'Hair Therapy', desc: 'Cellular alignment therapy' },
          { title: 'Hair Botox', type: 'Hair Therapy', desc: 'Deep collagen plumping' },
          { title: 'Scalp & Care', type: 'Hair Therapy', desc: 'Ultrasonic steam detox' }
        ].map((node, i) => (
          <div 
            key={i} 
            className="bg-cream-soft border border-peach-dark/80 rounded-2xl p-5 hover:border-salon-accent transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div>
              <span className="text-[9px] font-mono font-bold text-salon-accent tracking-widest block uppercase">Node 0{i+1}</span>
              <h3 className="font-serif text-sm font-semibold text-charcoal-deep mt-1">{node.title}</h3>
              <p className="text-[11px] text-charcoal-light mt-1 pb-4">{node.desc}</p>
            </div>
            <div className="border-t border-peach-light/60 pt-3 flex items-center justify-between text-[9px] font-mono text-charcoal-light group-hover:text-salon-accent transition-colors">
              <span>{node.type}</span>
              <CornerDownRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. High-Fidelity Hair Services Cards Grid */}
      <div className="space-y-16">
        {hairServices.map((service, index) => (
          <div 
            key={service.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 border-b border-peach-dark/30 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Box */}
            <div className={`col-span-12 lg:col-span-6 relative rounded-3xl overflow-hidden h-[340px] md:h-[400px] border border-peach-dark ${
              index % 2 === 1 ? 'lg:order-last' : ''
            }`}>
              {service.imageUrl && (
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
              )}
              {/* Sitemap badge */}
              <div className="absolute top-4 left-4 bg-charcoal-deep text-cream-soft text-[8px] font-mono tracking-widest font-extrabold uppercase px-3 py-1 rounded-md shadow-md">
                {service.tagline}
              </div>
            </div>

            {/* Content Details */}
            <div className="col-span-12 lg:col-span-6 text-left space-y-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-salon-accent block font-sans">
                SITEMAP CATEGORY PILLAR
              </span>
              <h2 className="font-serif text-2.5xl md:text-3.5xl font-normal text-charcoal-deep leading-tight">
                {service.name}
              </h2>
              <p className="text-xs text-charcoal-light font-sans leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-3 py-2">
                <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                  <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                  <div><strong>Thermodynamic Sealing:</strong> Ideal for Sri Lankan air factors.</div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                  <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                  <div><strong>Hypoallergenic Products:</strong> Infused completely with organic proteins.</div>
                </div>
              </div>

              <div className="pt-4 border-t border-peach-light/40 flex items-center justify-between">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-charcoal-light block font-mono">Boutique Package cost</span>
                  <span className="font-sans text-xl font-extrabold text-salon-accent">
                    Rs. {service.priceLKR.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-charcoal-light font-mono flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-salon-accent" /> {service.durationMinutes} MIN
                  </span>
                  
                  <button
                    onClick={() => handleBookNow(service.id)}
                    className="px-6 py-3 bg-charcoal-deep hover:bg-salon-accent text-white hover:scale-102 font-bold text-xs rounded-xl font-sans transition-all cursor-pointer shadow-md"
                  >
                    Reserve Selected Slot
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bottom Consult banner */}
      <div className="mt-28 bg-white border border-peach-dark rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <Heart className="w-8 h-8 text-salon-accent animate-pulse" />
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-charcoal-deep leading-tight">Need custom assistance?</h2>
          <p className="text-xs text-charcoal-light font-sans leading-relaxed">
            Not sure which biological treatment suits your current hair length or previous chemical pigments? Speak to our expert stylists directly at our boutique in Colombo 07.
          </p>
          <button
            onClick={() => setCurrentPage('services')}
            className="px-6 py-3 bg-salon-accent hover:bg-charcoal-deep text-white text-xs font-bold rounded-full font-sans transition-all duration-300"
          >
            Take Recommendation Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
