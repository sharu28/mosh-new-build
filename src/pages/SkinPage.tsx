import React from 'react';
import { Page, Service } from '../types';
import { SERVICES } from '../data/salonData';
import { Clock, CheckCircle2, Heart, ShieldCheck, CornerDownRight } from 'lucide-react';

interface SkinPageProps {
  setCurrentPage: (page: Page) => void;
  setPreselectedServiceId: (id: string) => void;
}

export default function SkinPage({ setCurrentPage, setPreselectedServiceId }: SkinPageProps) {
  // Only display SKIN category services from database
  const skinServices = SERVICES.filter(s => s.category === 'skin');

  const handleBookNow = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setCurrentPage('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="skin-sitemap-page">
      {/* 1. Header Section */}
      <div className="text-left mb-16 max-w-3xl">
        <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans bg-peach-light/50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-salon-accent" /> Premium Skin Clinic • mosh.lk/skin
        </span>
        <h1 className="font-serif text-4xl md:text-5.5xl font-normal text-charcoal-deep leading-tight mt-4">
          Dermal therapies that <br />
          <span className="italic font-serif text-salon-accent">unveil brilliant clarity</span>
        </h1>
        <p className="text-xs text-charcoal-light font-sans mt-4 max-w-xl leading-relaxed">
          Welcome to the Mosh Skin Sanctuary. We employ medical-grade pore vacuums, customized salicylic acids, collagen induction devices, and Korean double-infusions designed to restore hydration and tighten your natural dermal barrier.
        </p>
      </div>

      {/* 2. Highlight Callouts mapped to the exact sitemap nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-20">
        {[
          { title: 'Acne Erase', path: 'mosh.lk/acnetreatment', desc: 'Salicylic extraction & LED' },
          { title: 'White Science', path: 'mosh.lk/Whitescience', desc: 'Sunspot blemish brighten' },
          { title: 'Korean Glass', path: 'mosh.lk/koreanglassskin', desc: 'Luminescent translucent glow' },
          { title: 'HydraFacial', path: 'mosh.lk/hydrafacial', desc: 'Pore cleaning serum boost' },
          { title: 'Anti Aging', path: 'mosh.lk/antiaging', desc: 'Microcurrent dermal lifting' },
          { title: 'Micro Needling', path: 'mosh.lk/microneedling', desc: 'Sterile collagen induction' }
        ].map((node, i) => (
          <div 
            key={i} 
            className="bg-cream-soft border border-peach-dark/80 rounded-2xl p-5 hover:border-salon-accent transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div>
              <span className="text-[9px] font-mono font-bold text-salon-accent tracking-widest block uppercase">Node 0{i+1}</span>
              <h3 className="font-serif text-xs font-semibold text-charcoal-deep mt-1 leading-tight">{node.title}</h3>
              <p className="text-[10px] text-charcoal-light mt-1 pb-4 leading-relaxed">{node.desc}</p>
            </div>
            <div className="border-t border-peach-light/60 pt-3 flex items-center justify-between text-[9px] font-mono text-charcoal-light group-hover:text-salon-accent transition-colors">
              <span>{node.path}</span>
              <CornerDownRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform font-bold" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Skin Services Cards Grid */}
      <div className="space-y-16">
        {skinServices.map((service, index) => (
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
                CLINICAL SKIN CARE PILLAR
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
                  <div><strong>Clinically Certified Complex:</strong> Multi-layer exfoliation with zero post-treatment downtime.</div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-charcoal-deep font-sans">
                  <CheckCircle2 className="w-4 h-4 text-salon-accent shrink-0 mt-0.5" />
                  <div><strong>Advanced Laser Cleansing:</strong> Hypoallergenic serums tailored for tropical atmospheric values and pH.</div>
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

      {/* 4. Bottom Banner */}
      <div className="mt-28 bg-white border border-peach-dark rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <Heart className="w-8 h-8 text-salon-accent animate-pulse" />
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-charcoal-deep leading-tight">Book skin diagnostic trial</h2>
          <p className="text-xs text-charcoal-light font-sans leading-relaxed">
            Interested in starting a full course of skin treatments but want a customized diagnostic consultation? Come visit our clinic, where our specialist dermo-consultants will analyze your deep sebum structure.
          </p>
          <button
            onClick={() => handleBookNow('skin-hydra')}
            className="px-6 py-3 bg-salon-accent hover:bg-charcoal-deep text-white text-xs font-bold rounded-full font-sans transition-all duration-300"
          >
            Schedule Diagnostic HydraFacial (Rs. 21,000)
          </button>
        </div>
      </div>
    </div>
  );
}
