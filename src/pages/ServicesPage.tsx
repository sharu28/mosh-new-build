import React, { useState } from 'react';
import { Page, Service } from '../types';
import { SERVICES } from '../data/salonData';
import QuizSection from '../components/QuizSection';
import { Search, Scissors, SlidersHorizontal, Clock, Compass, HelpCircle, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesPageProps {
  setCurrentPage: (page: Page) => void;
  setPreselectedServiceId: (id: string) => void;
}

export default function ServicesPage({ setCurrentPage, setPreselectedServiceId }: ServicesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showQuiz, setShowQuiz] = useState(false);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Hair Care' },
    { id: 'skin', label: 'Skin Clinic' },
    { id: 'slimming', label: 'Slimming Care' },
    { id: 'bridal', label: 'Weddings & Bridal' }
  ];

  // Filtering Logic
  const filteredServices = SERVICES.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookNow = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setCurrentPage('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="services-page-container">
      
      {/* 1. Header Portion with toggleable banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left">
          <span className="text-[10px] font-extrabold uppercase text-salon-accent tracking-widest font-sans">
            Our Menu Directory
          </span>
          <h1 className="font-serif text-3.5xl md:text-5xl font-normal text-charcoal-deep leading-tight mt-2">
            Expert premium services <br />
            tailored for you
          </h1>
          <p className="text-xs text-charcoal-light font-sans mt-3 max-w-xl leading-relaxed">
            Every service contains pre-shampoo conditioning, customized organic serums, and bespoke moisture seals matching Colombo variables.
          </p>
        </div>

        {/* Advisor Floating Button layout */}
        <button
          onClick={() => {
            setShowQuiz(!showQuiz);
            if (!showQuiz) {
              const quizElement = document.getElementById('consultation-advisor-module');
              if (quizElement) {
                quizElement.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          className="flex items-center gap-2 self-start md:self-end px-5 py-3 bg-peach-light border border-salon-accent text-salon-accent hover:bg-salon-accent hover:text-white rounded-full text-xs font-bold font-sans transition-all duration-300"
        >
          <HelpCircle className="w-4 h-4" />
          {showQuiz ? 'Hide Hair Advisor' : 'Take Hair Advisor Quiz'}
        </button>
      </div>

      {/* 2. Interactive Consultation Advisor Quiz Section if active */}
      {showQuiz && (
        <div id="consultation-advisor-module" className="mb-14 scroll-mt-24">
          <QuizSection 
            onSuggestAndBook={(serviceId) => {
              handleBookNow(serviceId);
            }} 
          />
        </div>
      )}

      {/* 3. Search and Category Filtration Tools */}
      <div className="bg-white border border-peach-dark rounded-3xl p-4 md:p-6 mb-10 flex flex-col md:flex-row items-center gap-4 justify-between shadow-sm">
        
        {/* Search bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-salon-accent" />
          <input
            type="text"
            placeholder="Search keratin, micro needling, cavitation, anti-aging..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-cream-soft/40 border border-peach-dark/80 rounded-2xl text-xs text-charcoal-deep font-sans focus:outline-none focus:border-salon-accent transition-colors"
          />
        </div>

        {/* Categories filtration wrap scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar justify-start">
          <SlidersHorizontal className="w-3.5 h-3.5 text-charcoal-light hidden sm:block shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-sans font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-salon-accent text-white shadow-sm shadow-salon-accent/10'
                  : 'bg-peach-light/30 text-charcoal-light hover:bg-peach-light/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* 4. Filtered Services List Grids */}
      {filteredServices.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-peach-dark rounded-3xl bg-white flex flex-col items-center gap-3">
          <p className="font-serif text-lg font-semibold text-charcoal-deep">No Matches Found</p>
          <p className="text-xs text-charcoal-light max-w-sm font-sans">
            We couldn't locate any treatments matching your current filter keywords. Try searching for general terms like 'keratin', 'skin' or 'slimming'.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2 bg-charcoal-deep text-white hover:bg-salon-accent rounded-full text-xs font-semibold mt-2 transition-all font-sans"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-peach-dark rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-salon-accent transition-all duration-300 group flex flex-col h-full"
            >
              {service.imageUrl && (
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-peach-dark/30 text-salon-accent text-[9px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                    {service.category === 'hair' ? 'Hair Care' : service.category === 'skin' ? 'Skin Clinic' : service.category === 'slimming' ? 'Slimming' : 'Weddings'}
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-salon-accent font-extrabold font-sans">
                    {service.tagline || 'Guaranteed Quality'}
                  </span>
                  
                  <h3 className="font-serif text-lg font-bold text-charcoal-deep mt-1 leading-snug">
                    {service.name}
                  </h3>

                  <p className="text-xs text-charcoal-light font-sans mt-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-peach-light/60 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-charcoal-light block">Amount Payable</span>
                    <span className="text-base font-extrabold text-salon-accent font-sans">
                      Rs. {service.priceLKR.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-charcoal-light font-sans flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-salon-accent" />
                      {service.durationMinutes} Mins
                    </span>

                    <button
                      onClick={() => handleBookNow(service.id)}
                      className="px-4 py-2 bg-charcoal-deep hover:bg-salon-accent text-white font-bold text-xs rounded-xl font-sans transition-all cursor-pointer shadow-sm shadow-charcoal-deep/5"
                    >
                      Book Free Slot
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Banner for Quiz */}
      {!showQuiz && (
        <div className="mt-20 bg-charcoal-deep text-cream-soft rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-salon-accent/15 rounded-full blur-2xl" />
          <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
            <Compass className="w-8 h-8 text-salon-accent" />
            <h2 className="font-serif text-2xl md:text-3xl font-normal leading-tight">Unsure which premium service fits your hair history?</h2>
            <p className="text-xs text-cream-soft/70 font-sans leading-relaxed">
              Take our virtual hair advisor digital consultation. We run through weather climate history, chemical records, and style preferences to suggest the best solution.
            </p>
            <button
              onClick={() => {
                setShowQuiz(true);
                setTimeout(() => {
                  const quizElement = document.getElementById('consultation-advisor-module');
                  if (quizElement) {
                    quizElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="px-6 py-3 bg-salon-accent hover:bg-salon-accent-hover text-white rounded-full text-xs font-bold font-sans transition-all mt-2"
            >
              Start Hair Consultation
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
