import React, { useState } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';

// Core Sub-Pages
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ProcessPage from './pages/ProcessPage';
import GalleryPage from './pages/GalleryPage';
import BookingsPage from './pages/BookingsPage';
import ShopPage from './pages/ShopPage';
import HairPage from './pages/HairPage';
import SkinPage from './pages/SkinPage';
import SlimmingPage from './pages/SlimmingPage';
import WeddingsPage from './pages/WeddingsPage';

// Motion animations
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  // Carry recommended quiz selections to booking step!
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  const clearPreselectedService = () => {
    setPreselectedServiceId(null);
  };

  // Render subpage dynamically based on active state
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            setPreselectedServiceId={setPreselectedServiceId} 
          />
        );
      case 'services':
        return (
          <ServicesPage 
            setCurrentPage={setCurrentPage} 
            setPreselectedServiceId={setPreselectedServiceId} 
          />
        );
      case 'hair':
        return (
          <HairPage 
            setCurrentPage={setCurrentPage} 
            setPreselectedServiceId={setPreselectedServiceId} 
          />
        );
      case 'skin':
        return (
          <SkinPage 
            setCurrentPage={setCurrentPage} 
            setPreselectedServiceId={setPreselectedServiceId} 
          />
        );
      case 'slimming':
        return (
          <SlimmingPage 
            setCurrentPage={setCurrentPage} 
            setPreselectedServiceId={setPreselectedServiceId} 
          />
        );
      case 'weddings':
        return (
          <WeddingsPage 
            setCurrentPage={setCurrentPage} 
            setPreselectedServiceId={setPreselectedServiceId} 
          />
        );
      case 'process':
        return (
          <ProcessPage 
            setCurrentPage={setCurrentPage} 
          />
        );
      case 'gallery':
        return (
          <GalleryPage 
            setCurrentPage={setCurrentPage} 
            setPreselectedServiceId={setPreselectedServiceId} 
          />
        );
      case 'bookings':
        return (
          <BookingsPage 
            preselectedServiceId={preselectedServiceId}
            clearPreselectedService={clearPreselectedService}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'shop':
        return (
          <ShopPage 
            setCurrentPage={setCurrentPage}
            setPreselectedServiceId={setPreselectedServiceId}
          />
        );
      default:
        return <Home setCurrentPage={setCurrentPage} setPreselectedServiceId={setPreselectedServiceId} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-cream-soft text-charcoal-deep font-sans flex flex-col justify-between overflow-x-hidden select-none">
      
      {/* Exquisite Top Navigation Menu Bar */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />

      {/* Main Container Layer with Silky Slide-Fade Transitions */}
      <main className="flex-1 w-full relative ambient-bg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Elegant High-End Footer with Contact coordinates */}
      <Footer 
        setCurrentPage={setCurrentPage} 
      />

    </div>
  );
}
