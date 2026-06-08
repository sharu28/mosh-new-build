import React from 'react';
import BookingManager from '../components/BookingManager';

interface BookingsPageProps {
  preselectedServiceId: string | null;
  clearPreselectedService: () => void;
  setCurrentPage: (page: 'home' | 'services' | 'process' | 'gallery' | 'bookings') => void;
}

export default function BookingsPage({ 
  preselectedServiceId, 
  clearPreselectedService,
  setCurrentPage
}: BookingsPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12" id="bookings-page-container">
      {/* Dynamic Background Glow Rings */}
      <div className="relative z-10">
        <BookingManager 
          preselectedServiceId={preselectedServiceId}
          clearPreselectedService={clearPreselectedService}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
