import React, { useState } from 'react';
import { Page } from '../types';
import { STYLISTS, FAQS } from '../data/salonData';
import { 
  Sliders, Scissors, Check, ChevronDown, 
  ChevronUp, HelpCircle, CalendarRange, Star, Quote, Award 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProcessPageProps {
  setCurrentPage: (page: Page) => void;
}

export default function ProcessPage({ setCurrentPage }: ProcessPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const steps = [
    {
      num: '01',
      title: 'Consultation',
      subtitle: 'Analyze Biology & Design Goals',
      description: 'Our certified experts take the necessary time to carefully understand your exact hair structure, chemical history, and formatting goals before introducing scissor cuts or pigmentation formulas.'
    },
    {
      num: '02',
      title: 'Custom Treatment',
      subtitle: 'Tailored Mixes & Bond Repairs',
      description: 'Whether dealing with an intricate handpainted balayage gloss or a reconstructive steam ritual, we custom-bind advanced professional products to accent your hair density safely.'
    },
    {
      num: '03',
      title: 'Final Touch',
      subtitle: 'Expert Styling & Volume Sealing',
      description: 'We finalize your look utilizing long-lasting bouncy blowouts, curls, or traditional saree cascades, applying thermal protectants so your finish stays smooth, crisp and completely flawless.'
    }
  ];

  const handleBookNow = () => {
    setCurrentPage('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="process-page-container">
      
      {/* 1. Header Hero section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans">
          The Journey Experience
        </span>
        <h1 className="font-serif text-3.5xl md:text-5xl font-normal text-charcoal-deep leading-tight mt-2">
          How Mosh works & <br />
          Our Expert Stylists
        </h1>
        <p className="text-xs text-charcoal-light font-sans mt-3 max-w-lg mx-auto leading-relaxed">
          Behind every transformational makeover lies our core three-step workflow engineered to preserve cellular health and ensure flawless elegance.
        </p>
      </div>

      {/* 2. Process Section: "How it works" - Staggered layout matching image 3 precisely */}
      <section className="bg-white border border-peach-dark rounded-3xl p-6 md:p-10 mb-20 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Beautiful action photo from design inspiration */}
          <div className="lg:col-span-5 h-[480px] rounded-2xl overflow-hidden shadow-md relative group border border-peach-dark/40">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
              alt="Professional hair curling treatment session"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Dynamic floating element block */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur shadow p-3 rounded-xl max-w-[180px] text-left border border-peach-light">
              <span className="text-[8px] uppercase tracking-widest text-salon-accent font-extrabold block">Purity Pledge</span>
              <p className="text-[10px] font-medium leading-tight text-charcoal-deep mt-1">100% Organic Moisture Shield formulas</p>
            </div>
          </div>

          {/* Right panel: Custom steps registry matching image layout */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-salon-accent font-bold font-sans">Our Workflow</span>
              <h2 className="font-serif text-2xl md:text-3.5xl font-medium tracking-tight text-charcoal-deep mt-1">Bringing your hair back to life</h2>
            </div>

            <div className="flex flex-col gap-6">
              {steps.map((st) => (
                <div key={st.num} className="flex gap-4 sm:gap-6 group items-start">
                  {/* Step Num Circle */}
                  <span className="w-10 h-10 rounded-full border border-salon-accent text-salon-accent font-mono text-sm font-extrabold flex items-center justify-center shrink-0 bg-peach-light/40 group-hover:bg-salon-accent group-hover:text-white transition-colors duration-300">
                    {st.num}
                  </span>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                      <h3 className="font-serif text-base font-semibold text-charcoal-deep group-hover:text-salon-accent transition-colors">
                        {st.title}
                      </h3>
                      <span className="text-[10px] text-salon-accent font-medium font-sans sm:before:content-['•'] sm:before:mx-2 block">
                        {st.subtitle}
                      </span>
                    </div>
                    
                    <p className="text-xs text-charcoal-light font-sans leading-relaxed mt-1.5 max-w-xl">
                      {st.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Meet the Experts behind your hairs - Exact Match to Design */}
      <section className="mb-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans">
            Our Elite Masters
          </span>
          <h2 className="font-serif text-3xl md:text-4.5xl font-normal text-charcoal-deep leading-tight mt-1">
            Meet the experts behind <br />
            your perfect hairs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STYLISTS.map((sty) => (
            <div
              key={sty.id}
              className="bg-white border border-peach-dark rounded-2xl overflow-hidden p-4 text-center shadow-sm hover:shadow-lg hover:border-salon-accent transition-all duration-300 group relative flex flex-col justify-between"
            >
              {/* Award seal overlay */}
              <div className="absolute top-6 right-6 p-1 bg-white/90 backdrop-blur rounded-full border border-peach-dark shadow text-salon-accent">
                <Award className="w-4 h-4" />
              </div>

              <div>
                <div className="w-full h-64 rounded-xl overflow-hidden mb-4 border border-peach-light">
                  <img
                    src={sty.photoUrl}
                    alt={sty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-left px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base font-bold text-charcoal-deep leading-snug">
                      {sty.name}
                    </h3>
                    <div className="flex items-center gap-0.5 text-xs text-salon-accent font-bold shrink-0 font-sans">
                      <span>★</span>
                      <span>{sty.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] uppercase tracking-wider text-salon-accent font-bold font-sans mt-0.5">
                    {sty.role}
                  </p>

                  <p className="text-[11px] text-charcoal-light font-sans mt-2.5 leading-snug line-clamp-3">
                    {sty.bio}
                  </p>
                </div>
              </div>

              {/* Interactive Stylist Schedule draft triggering */}
              <div className="pt-4 mt-6 border-t border-peach-light text-left px-1 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-charcoal-light block">Client reviews</span>
                  <span className="text-[11px] font-bold font-sans text-charcoal-deep">{sty.reviewsCount} verified</span>
                </div>

                <button
                  onClick={handleBookNow}
                  className="px-3.5 py-2 bg-peach-light text-salon-accent hover:bg-salon-accent hover:text-white transition-all text-[11px] font-bold font-sans rounded-lg"
                >
                  Book Slot
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. FAQs Section: "Answers to your most common questions" */}
      <section className="bg-peach-light/20 border border-peach-dark rounded-3xl p-6 md:p-10 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans justify-center flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-salon-accent" />
            Support Help desk
          </span>
          <h2 className="font-serif text-2xl md:text-3.5xl font-normal text-charcoal-deep mt-1 leading-tight">
            Answers to your most <br />
            common questions
          </h2>
        </div>

        {/* Accordions mapping */}
        <div className="flex flex-col gap-4 text-left">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-peach-dark rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-sm md:text-base font-semibold text-charcoal-deep hover:text-salon-accent transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-salon-accent shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-charcoal-light shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-peach-light"
                    >
                      <div className="p-5 text-xs md:text-sm text-charcoal-light font-sans leading-relaxed bg-cream-soft/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
