import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { Menu, X, Calendar, PhoneCall, ChevronDown, Activity, Heart, Eye } from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const basicNavItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'process' as Page, label: 'Our Stylists' },
    { id: 'gallery' as Page, label: 'Gallery' },
    { id: 'shop' as Page, label: 'Shop' }
  ];

  const servicesDropdownItems = [
    { id: 'hair' as Page, label: 'Hair Care', path: 'Premium Hair Care', desc: 'Keratin, colors & nanoplastia' },
    { id: 'skin' as Page, label: 'Skin Clinic', path: 'Dermal Aesthetics', desc: 'Korea glass skin & micro-needling' },
    { id: 'slimming' as Page, label: 'Slimming Care', path: 'Body Contouring', desc: 'Fat freezing & EMS contouring' },
    { id: 'weddings' as Page, label: 'Weddings & Bridal', path: 'Modern Nuptials', desc: 'Brides & Grooms by Mosh' },
    { id: 'services' as Page, label: 'Search All Services', path: 'Interactive Menu', desc: 'Complete interactive catalog & quiz' }
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isServicesActive = servicesDropdownItems.some(item => item.id === currentPage);

  return (
    <header className="sticky top-0 z-50 bg-cream-soft/90 backdrop-blur-md border-b border-peach-dark/40 py-4 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo — official MOSH AESTHETICS wordmark */}
        <div
          id="brand-logo"
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group"
        >
          <img
            src="/mosh-logo.png"
            alt="MOSH Aesthetics"
            className="h-9 md:h-10 w-auto object-contain group-hover:opacity-70 transition-opacity duration-300"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Home Link */}
          <button
            onClick={() => handleNavClick('home')}
            className={`relative py-1 font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
              currentPage === 'home' 
                ? 'text-salon-accent' 
                : 'text-charcoal-light hover:text-salon-accent/85'
            }`}
          >
            Home
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-salon-accent rounded-full" />
            )}
          </button>

          {/* Services Dropdown Trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`flex items-center gap-1 py-1 font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 focus:outline-none ${
                isServicesActive 
                  ? 'text-salon-accent' 
                  : 'text-charcoal-light hover:text-salon-accent/85'
              }`}
            >
              Our Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-salon-accent' : ''}`} />
            </button>

            {/* Dropdown Card */}
            {dropdownOpen && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white rounded-2xl border border-peach-dark shadow-xl py-3 px-2 z-50 animate-fadeIn"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-1 border-b border-peach-light pb-2 mb-2">
                  <p className="text-[8px] font-mono font-extrabold text-salon-accent tracking-widest uppercase">
                    Our Core Services
                  </p>
                </div>
                <div className="space-y-0.5">
                  {servicesDropdownItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleNavClick(subItem.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex flex-col gap-0.5 font-sans ${
                        currentPage === subItem.id
                          ? 'bg-peach-light/50 border-l-4 border-salon-accent'
                          : 'hover:bg-cream-soft border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-charcoal-deep">{subItem.label}</span>
                      </div>
                      <span className="text-[10px] text-charcoal-light leading-none">{subItem.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Remaining basic nav items */}
          {basicNavItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative py-1 font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                currentPage === item.id 
                  ? 'text-salon-accent' 
                  : 'text-charcoal-light hover:text-salon-accent/85'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-salon-accent rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('bookings')}
            className="flex items-center gap-2 px-5 py-2.5 bg-charcoal-deep text-cream-soft rounded-full text-xs font-semibold hover:bg-salon-accent hover:text-white transition-all duration-300 shadow-sm shadow-charcoal-deep/10"
          >
            <Calendar className="w-3.5 h-3.5 text-salon-accent" />
            Book Online
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => handleNavClick('bookings')}
            className="p-2 bg-salon-accent text-white rounded-full hover:bg-salon-accent/90 transition-all"
            title="Book Appt"
          >
            <Calendar className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-charcoal-deep hover:text-salon-accent hover:bg-peach-light/50 rounded-xl transition-all"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cream-white shadow-xl py-6 px-6 border-b border-peach-dark flex flex-col gap-4 animate-fadeIn">
          {/* Main Pages */}
          <p className="text-[9px] font-semibold text-salon-accent tracking-widest uppercase border-b border-peach-light pb-1">Primary Pages</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-1 text-sm font-semibold font-sans transition-all ${
                currentPage === 'home' ? 'text-salon-accent font-bold pl-2 border-l-2 border-salon-accent' : 'text-charcoal-light pl-1'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('process')}
              className={`text-left py-1 text-sm font-semibold font-sans transition-all ${
                currentPage === 'process' ? 'text-salon-accent font-bold pl-2 border-l-2 border-salon-accent' : 'text-charcoal-light pl-1'
              }`}
            >
              Our Stylists & Process
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`text-left py-1 text-sm font-semibold font-sans transition-all ${
                currentPage === 'gallery' ? 'text-salon-accent font-bold pl-2 border-l-2 border-salon-accent' : 'text-charcoal-light pl-1'
              }`}
            >
              Gallery Portfolio
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`text-left py-1 text-sm font-semibold font-sans transition-all ${
                currentPage === 'shop' ? 'text-salon-accent font-bold pl-2 border-l-2 border-salon-accent' : 'text-charcoal-light pl-1'
              }`}
            >
              Organic Shop
            </button>
          </div>

          {/* Sitemap Care Pillars Accordion Section */}
          <p className="text-[9px] font-semibold text-salon-accent tracking-widest uppercase border-b border-peach-light pb-1 mt-2">Clinic Pillars</p>
          <div className="grid grid-cols-2 gap-2">
            {servicesDropdownItems.map((subItem) => (
              <button
                key={subItem.id}
                onClick={() => handleNavClick(subItem.id)}
                className={`text-left p-2 rounded-xl border font-sans text-xs transition-all flex flex-col gap-0.5 ${
                  currentPage === subItem.id
                    ? 'bg-peach-light border-salon-accent text-salon-accent font-bold'
                    : 'bg-cream-soft border-peach-dark/30 text-charcoal-deep'
                }`}
              >
                <span className="font-bold">{subItem.label}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-peach-light pt-4 mt-2 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('bookings')}
              className="flex items-center justify-center gap-2 w-full py-3 bg-salon-accent text-white rounded-xl text-sm font-semibold hover:bg-salon-accent-hover transition-all duration-300 shadow-md shadow-salon-accent/20"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment Now
            </button>
            <a
              href="tel:+94112345678"
              className="flex items-center justify-center gap-2 w-full py-3 bg-peach-light text-salon-accent border border-salon-accent/20 rounded-xl text-sm font-semibold hover:bg-peach-dark/30 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              Call +94 11 234 5678
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
