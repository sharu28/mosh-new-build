import React, { useState, useEffect } from 'react';
import { Booking, Service, Stylist } from '../types';
import { SERVICES, STYLISTS } from '../data/salonData';
import { 
  CalendarDays, Scissors, Check, Eye, Trash2, Tag, 
  Clock, User, AlertCircle, Phone, Mail, 
  MapPin, CheckCircle, ChevronRight, X, Calendar as CalIcon, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingManagerProps {
  preselectedServiceId?: string | null;
  clearPreselectedService?: () => void;
  setCurrentPage?: (page: 'home' | 'services' | 'process' | 'gallery' | 'bookings') => void;
}

export default function BookingManager({ 
  preselectedServiceId, 
  clearPreselectedService,
  setCurrentPage
}: BookingManagerProps) {
  // Booking Form wizard state
  const [step, setStep] = useState(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedStylistId, setSelectedStylistId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Client Details state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Dashboard state (Managing historical bookings)
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Initialize and load local bookings
  useEffect(() => {
    const stored = localStorage.getItem('mosh_lk_appointments');
    if (stored) {
      try {
        setBookingsList(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing booking records', e);
      }
    }
  }, []);

  // Sync preselected service from Quiz recommendations
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceIds([preselectedServiceId]);
      setStep(2); // Go straight to choosing dentist/stylist
    }
  }, [preselectedServiceId]);

  const saveBookings = (list: Booking[]) => {
    setBookingsList(list);
    localStorage.setItem('mosh_lk_appointments', JSON.stringify(list));
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServiceIds(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSelectStylist = (stylistId: string) => {
    setSelectedStylistId(stylistId);
    // Reset date/time if stylist changes to avoid impossible slots
    setSelectedDate('');
    setSelectedTimeSlot('');
  };

  // Generate dynamic date list for the next 7 days in Colombo
  const getNext7Days = () => {
    const days = [];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      const dayName = weekdays[d.getDay()];
      const year = d.getFullYear();
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      const dateNum = String(d.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${monthNum}-${dateNum}`;

      days.push({
        formattedDate,
        dayName,
        dateString: `${d.getDate()} ${months[d.getMonth()]}`
      });
    }
    return days;
  };

  const selectedStylist = STYLISTS.find(s => s.id === selectedStylistId);
  const selectedServices = SERVICES.filter(s => selectedServiceIds.includes(s.id));
  
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.priceLKR, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  // Available slots based on chosen stylist
  const availableHours = selectedStylist ? selectedStylist.availableHours : [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookingsList.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    saveBookings(updated);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert('Please fill out all required contact fields');
      return;
    }

    const stylistNameSelected = selectedStylist?.name || 'Any Expert Artist';
    
    const newBooking: Booking = {
      id: 'MOSH-' + Math.floor(1000 + Math.random() * 9000),
      customerName: clientName,
      customerEmail: clientEmail,
      customerPhone: clientPhone,
      stylistId: selectedStylistId,
      stylistName: stylistNameSelected,
      serviceIds: selectedServiceIds,
      serviceNames: selectedServices.map(s => s.name),
      totalPrice: totalPrice,
      date: selectedDate,
      time: selectedTimeSlot,
      specialNotes: notes,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedList = [newBooking, ...bookingsList];
    saveBookings(updatedList);
    setSuccessBooking(newBooking);
    
    // Clear wizard state
    if (clearPreselectedService) clearPreselectedService();
    setSelectedServiceIds([]);
    setSelectedStylistId('');
    setSelectedDate('');
    setSelectedTimeSlot('');
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNotes('');
    setStep(5); // Success step
  };

  // Filter stylists based on chosen date weekdays
  const chosenWeekday = selectedDate ? (() => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(selectedDate);
    return daysOfWeek[d.getDay()];
  })() : null;

  return (
    <div className="w-full max-w-5xl mx-auto" id="booking-manager">
      
      {/* Top Section Nav Bar toggles Dashboard */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal-deep">
            {showDashboard ? 'Manage Salon Bookings' : 'Schedule Hair Artistry'}
          </h2>
          <p className="text-xs text-charcoal-light font-sans mt-1">
            {showDashboard 
              ? 'View details, cancel, or structure upcoming pamper slots in Colombo.' 
              : 'Complete custom styles, deep reconstructions, or wedding makeovers.'
            }
          </p>
        </div>

        <button
          onClick={() => {
            setShowDashboard(!showDashboard);
            setSuccessBooking(null);
            if (showDashboard) setStep(1); // Reset form
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold font-sans border transition-all duration-300 ${
            showDashboard 
              ? 'border-salon-accent bg-peach-light text-salon-accent hover:bg-peach-dark/30'
              : 'border-charcoal-deep bg-charcoal-deep text-white hover:bg-salon-accent hover:border-salon-accent'
          }`}
        >
          {showDashboard ? (
            <>
              <Scissors className="w-3.5 h-3.5" />
              Open New Booking Scheduler
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              View My Bookings ({bookingsList.filter(b => b.status === 'confirmed').length} Active)
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showDashboard ? (
          /* ========================================================================= */
          /*                       BOOKINGS DASHBOARD MODULE (OFFLINE)                 */
          /* ========================================================================= */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl border border-peach-dark p-6 md:p-8 shadow-sm"
          >
            {bookingsList.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center gap-4">
                <div className="p-4 bg-peach-light rounded-full text-salon-accent">
                  <CalIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold text-charcoal-deep">No Bookings Recorded Yet</p>
                  <p className="text-xs text-charcoal-light max-w-sm mt-1 mx-auto font-sans">
                    You haven’t scheduled any hair therapy sessions yet. Let your locks shine and craft your bespoke reservation today!
                  </p>
                </div>
                <button
                  onClick={() => setShowDashboard(false)}
                  className="px-6 py-2.5 bg-salon-accent text-white rounded-full text-xs font-semibold font-sans hover:bg-salon-accent-hover transition-all"
                >
                  Schedule Your First Session
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="border-b border-peach-light pb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-salon-accent tracking-widest font-sans">
                    Appointment History Registry
                  </span>
                  <span className="text-[10px] font-mono text-charcoal-light bg-peach-light px-3 py-1 rounded">
                    Storage: mosh_lk_appointments ({bookingsList.length} total)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookingsList.map((item) => (
                    <div 
                      key={item.id} 
                      className={`border rounded-2xl p-5 flex flex-col justify-between relative transition-all ${
                        item.status === 'cancelled'
                          ? 'border-gray-200 bg-gray-50/50 opacity-70'
                          : 'border-peach-dark bg-cream-white/20 hover:border-salon-accent hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold text-salon-accent uppercase bg-salon-accent/10 px-2.5 py-0.5 rounded">
                          {item.id}
                        </span>
                        
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          item.status === 'confirmed'
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5 mb-4">
                        <h4 className="font-serif text-base font-semibold text-charcoal-deep">
                          {item.serviceNames.join(', ')}
                        </h4>
                        
                        <div className="flex items-center gap-1.5 text-xs text-charcoal-light font-sans mt-1">
                          <User className="w-3.5 h-3.5 text-salon-accent" />
                          <span>Artist Stylist: <span className="font-semibold text-charcoal-deep">{item.stylistName}</span></span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-charcoal-light font-sans">
                          <Clock className="w-3.5 h-3.5 text-salon-accent" />
                          <span className="font-medium">
                            {item.date} at <span className="text-charcoal-deep font-semibold">{item.time}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-charcoal-light font-sans">
                          <MapPin className="w-3.5 h-3.5 text-salon-accent" />
                          <span className="font-mono text-[10px]">Colombo 07 Studio Room</span>
                        </div>
                      </div>

                      {item.specialNotes && (
                        <div className="bg-peach-light/40 rounded-xl p-2.5 text-[11px] text-charcoal-light italic font-sans mb-4 border border-peach-light">
                          Note: "{item.specialNotes}"
                        </div>
                      )}

                      <div className="border-t border-peach-light pt-3 flex items-center justify-between mt-auto">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-charcoal-light">Total Price Paid</p>
                          <p className="text-sm font-extrabold text-charcoal-deep">Rs. {item.totalPrice.toLocaleString()}</p>
                        </div>

                        {item.status === 'confirmed' && (
                          <button
                            onClick={() => {
                              if (confirm('Cancel this active salon booking?')) {
                                handleCancelBooking(item.id);
                              }
                            }}
                            className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-red-600 hover:text-red-800 transition-colors cursor-pointer border border-red-200/50 hover:bg-red-50/50 p-2 rounded-xl"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Cancel booking
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          /* ========================================================================= */
          /*                        STEP-BY-STEP RESERVATION FLOW                      */
          /* ========================================================================= */
          <motion.div
            key="scheduler-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Step Wizard Container */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-peach-dark p-6 md:p-8 shadow-sm">
              
              {/* Wizard Steps Progress indicators */}
              <div className="flex items-center justify-between gap-2 border-b border-peach-light pb-5 mb-8 overflow-x-auto no-scrollbar">
                {[
                  { stepNum: 1, label: 'Select Services' },
                  { stepNum: 2, label: 'Choose Artist' },
                  { stepNum: 3, label: 'Pick Schedule' },
                  { stepNum: 4, label: 'Confirm Info' }
                ].map((s) => (
                  <div key={s.stepNum} className="flex items-center gap-2 shrink-0">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border transition-all ${
                      step === s.stepNum 
                        ? 'bg-salon-accent text-white border-salon-accent shadow-sm'
                        : step > s.stepNum 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : 'bg-peach-light text-charcoal-light border-peach-dark/40'
                    }`}>
                      {step > s.stepNum ? <Check className="w-3.5 h-3.5" /> : s.stepNum}
                    </span>
                    <span className={`text-xs font-semibold font-sans ${step === s.stepNum ? 'text-charcoal-deep font-bold' : 'text-charcoal-light/60'}`}>
                      {s.label}
                    </span>
                    {s.stepNum < 4 && <ChevronRight className="w-3.5 h-3.5 text-charcoal-light/30" />}
                  </div>
                ))}
              </div>

              {/* ======================= STEP 1: SERVICES MENU ======================= */}
              {step === 1 && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal-deep">Select Hair & Beauty Treatments</h3>
                    <p className="text-xs text-charcoal-light font-sans">Choose as many premium services as you like. We merge them seamlessly into your personal schedule.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SERVICES.map((serv) => {
                      const isChecked = selectedServiceIds.includes(serv.id);
                      return (
                        <div
                          key={serv.id}
                          onClick={() => handleToggleService(serv.id)}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer relative ${
                            isChecked 
                              ? 'border-salon-accent bg-peach-light/20 shadow-sm'
                              : 'border-peach-dark hover:border-salon-accent'
                          }`}
                        >
                          <div className={`mt-1 shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            isChecked ? 'bg-salon-accent border-salon-accent text-white' : 'border-peach-dark/80 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 text-white" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-serif text-xs sm:text-sm font-semibold text-charcoal-deep truncate">
                                {serv.name}
                              </h4>
                            </div>
                            <p className="text-[11px] text-charcoal-light font-sans leading-tight mt-0.5 line-clamp-2">
                              {serv.description}
                            </p>
                            <div className="flex items-center gap-2.5 mt-2 text-[10px] text-charcoal-light font-sans">
                              <span className="font-bold text-salon-accent">Rs. {serv.priceLKR.toLocaleString()}</span>
                              <span>•</span>
                              <span>{serv.durationMinutes} Mins</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-peach-light pt-6 mt-4 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={selectedServiceIds.length === 0}
                      className={`px-8 py-3.5 rounded-full font-semibold text-xs font-sans flex items-center gap-1.5 transition-all ${
                        selectedServiceIds.length > 0
                          ? 'bg-charcoal-deep text-white hover:bg-salon-accent cursor-pointer shadow-md'
                          : 'bg-charcoal-deep/15 text-charcoal-light/40 cursor-not-allowed'
                      }`}
                    >
                      Choose Hair Stylist Expert
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ======================= STEP 2: STYLIST EXPERT ======================= */}
              {step === 2 && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal-deep">Meet the experts behind your hair</h3>
                    <p className="text-xs text-charcoal-light font-sans">Each master is highly certified. Pick your preferred artistry stylist, or select any expert.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Any stylist option card */}
                    <div
                      onClick={() => handleSelectStylist('any-stylist')}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer hover:shadow-md ${
                        selectedStylistId === 'any-stylist' || selectedStylistId === ''
                          ? 'border-salon-accent bg-peach-light/20'
                          : 'border-peach-dark'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-peach-dark flex items-center justify-center text-salon-accent font-bold">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-charcoal-deep">Any Stylist</h4>
                        <p className="text-[11px] text-charcoal-light font-sans mt-0.5">We will pair you with the best matching stylist available for your selected hour.</p>
                      </div>
                    </div>

                    {STYLISTS.map((sty) => {
                      const isSelected = selectedStylistId === sty.id;
                      return (
                        <div
                          key={sty.id}
                          onClick={() => handleSelectStylist(sty.id)}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer hover:shadow-md ${
                            isSelected
                              ? 'border-salon-accent bg-peach-light/20'
                              : 'border-peach-dark'
                          }`}
                        >
                          <img
                            src={sty.photoUrl}
                            alt={sty.name}
                            className="w-14 h-14 rounded-full object-cover shrink-0 border border-peach-light"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-serif text-sm font-semibold text-charcoal-deep truncate">
                                {sty.name}
                              </h4>
                              <span className="text-[10px] font-bold text-salon-accent shrink-0">★ {sty.rating}</span>
                            </div>
                            <p className="text-[10px] text-salon-accent font-medium font-sans uppercase tracking-wider">{sty.role}</p>
                            <p className="text-[11px] text-charcoal-light font-sans leading-tight mt-1 line-clamp-2">{sty.specialty}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-peach-light pt-6 mt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-bold font-sans text-charcoal-light hover:text-salon-accent cursor-pointer"
                    >
                      Back to Services
                    </button>
                    
                    <button
                      onClick={() => setStep(3)}
                      className="px-8 py-3.5 bg-charcoal-deep text-white rounded-full font-semibold text-xs font-sans flex items-center gap-1.5 hover:bg-salon-accent transition-all cursor-pointer shadow-md"
                    >
                      Choose Date & Slot
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ======================= STEP 3: SCHEDULE & HOURS ======================= */}
              {step === 3 && (
                <div className="flex flex-col gap-6 animate-fadeIn border-peach-light">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal-deep">Pick Date and Time Slot</h3>
                    <p className="text-xs text-charcoal-light font-sans">
                      Our Colombo 07 salon operates daily. Selecting{' '}
                      {selectedStylist?.name ? (
                        <span className="font-bold text-salon-accent">{selectedStylist.name}</span>
                      ) : (
                        <span>the next talented expert</span>
                      )}.
                    </p>
                  </div>

                  {/* Date Grid selector */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[11px] uppercase font-bold tracking-widest text-salon-accent font-sans">
                      Select Date (Upcoming Week)
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {getNext7Days().map((day) => {
                        const isSelectedDate = selectedDate === day.formattedDate;
                        return (
                          <button
                            key={day.formattedDate}
                            onClick={() => setSelectedDate(day.formattedDate)}
                            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                              isSelectedDate
                                ? 'bg-salon-accent text-white border-salon-accent shadow-sm'
                                : 'bg-cream-white/50 border-peach-dark/80 hover:border-salon-accent text-charcoal-deep hover:bg-white'
                            }`}
                          >
                            <span className="text-[9px] uppercase font-semibold opacity-80">{day.dayName.slice(0, 3)}</span>
                            <span className="text-sm font-extrabold tracking-tight mt-0.5">{day.dateString.split(' ')[0]}</span>
                            <span className="text-[8px] font-mono opacity-70 uppercase tracking-tighter">{day.dateString.split(' ')[1]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots Bubbles selection */}
                  {selectedDate && (
                    <div className="flex flex-col gap-3 mt-2 animate-fadeIn">
                      <label className="text-[11px] uppercase font-bold tracking-widest text-salon-accent font-sans">
                        Available Hours for {selectedDate}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {availableHours.map((slot) => {
                          const isSelectedSlot = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 px-3 rounded-xl border font-mono text-xs font-semibold cursor-pointer transition-all ${
                                isSelectedSlot
                                  ? 'bg-charcoal-deep text-white border-charcoal-deep shadow-sm'
                                  : 'bg-peach-light/20 border-peach-dark text-charcoal-light hover:bg-white hover:border-salon-accent'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-peach-light pt-6 mt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs font-bold font-sans text-charcoal-light hover:text-salon-accent cursor-pointer"
                    >
                      Back to Stylists
                    </button>
                    
                    <button
                      onClick={() => setStep(4)}
                      disabled={!selectedDate || !selectedTimeSlot}
                      className={`px-8 py-3.5 rounded-full font-semibold text-xs font-sans flex items-center gap-1.5 transition-all ${
                        selectedDate && selectedTimeSlot
                          ? 'bg-charcoal-deep text-white hover:bg-salon-accent cursor-pointer shadow-md'
                          : 'bg-charcoal-deep/15 text-charcoal-light/40 cursor-not-allowed'
                      }`}
                    >
                      Confirm Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ======================= STEP 4: CLIENT CONTACT CONTROLS ======================= */}
              {step === 4 && (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 animate-fadeIn">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-charcoal-deep">Complete Your Booking Request</h3>
                    <p className="text-xs text-charcoal-light font-sans">Provide your contact info beneath. We will issue your appointment parameters safely.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-charcoal-light font-sans">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-salon-accent" />
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g., Sanduni Perera"
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-white border border-peach-dark rounded-xl text-xs text-charcoal-deep focus:scale-[1.01] transition-transform font-sans"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-charcoal-light font-sans">Mobile Phone No *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-salon-accent" />
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="e.g., +94 77 123 4567"
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-white border border-peach-dark rounded-xl text-xs text-charcoal-deep focus:scale-[1.01] transition-transform font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-charcoal-light font-sans">E-mail Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-salon-accent" />
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g., sanduni@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-cream-white border border-peach-dark rounded-xl text-xs text-charcoal-deep focus:scale-[1.01] transition-transform font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-charcoal-light font-sans">Special Requests / Hair Concerns</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="e.g. Please mention if you have highly damaged porous blonde curls or sensitive scalp..."
                      className="w-full p-3 bg-cream-white border border-peach-dark rounded-xl text-xs text-charcoal-deep focus:scale-[1.01] transition-transform font-sans"
                    />
                  </div>

                  {/* Safety Alert Disclaimer */}
                  <div className="flex gap-2.5 bg-peach-light rounded-xl p-3 border border-peach-dark mt-1">
                    <AlertCircle className="w-4 h-4 text-charcoal-deep shrink-0 mt-0.5" />
                    <p className="text-[11px] text-charcoal-light leading-tight font-sans">
                      By scheduling, you agree to show up 10 minutes prior for scalp assessment. No prepayment required. Pay at salon room Colombo 07.
                    </p>
                  </div>

                  <div className="border-t border-peach-light pt-6 mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs font-bold font-sans text-charcoal-light hover:text-salon-accent cursor-pointer"
                    >
                      Back to Schedule
                    </button>
                    
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-salon-accent text-white font-bold text-xs font-sans rounded-full hover:bg-salon-accent-hover shadow-md shadow-salon-accent/20 cursor-pointer flex items-center gap-1.5"
                    >
                      Confirm and Complete Reservation
                    </button>
                  </div>
                </form>
              )}

              {/* ======================= STEP 5: SUCCESS REDIRECT ======================= */}
              {step === 5 && successBooking && (
                <div className="flex flex-col items-center text-center py-8 animate-fadeIn">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-5 animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-green-600 bg-green-50 px-3 py-1 rounded border border-green-200/40">
                    Salon Slot Secured
                  </span>

                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-charcoal-deep mt-4">
                    See you ready, {successBooking.customerName}!
                  </h3>
                  
                  <p className="text-xs text-charcoal-light max-w-sm font-sans mt-2 leading-relaxed">
                    We have successfully drafted your customized beauty session at our Flower Road, Colombo 07 studio. Detailed parameters are mapped below:
                  </p>

                  <div className="w-full max-w-md bg-peach-light/20 border border-peach-dark/80 rounded-2xl p-5 my-6 text-left">
                    <div className="flex justify-between items-center pb-2 border-b border-peach-light">
                      <span className="font-mono text-xs font-bold text-salon-accent">{successBooking.id}</span>
                      <span className="text-[10px] text-charcoal-light font-sans">{successBooking.createdAt}</span>
                    </div>

                    <div className="py-4 flex flex-col gap-2 border-b border-peach-light/60">
                      <p className="font-serif text-base font-semibold text-charcoal-deep leading-tight">
                        {successBooking.serviceNames.join(', ')}
                      </p>
                      <p className="text-xs font-medium font-sans text-charcoal-light">
                        Expert Artist: <span className="text-charcoal-deep font-semibold">{successBooking.stylistName}</span>
                      </p>
                      <p className="text-xs font-medium font-sans text-charcoal-light">
                        Date Scheduled: <span className="text-charcoal-deep font-semibold">{successBooking.date}</span> at <span className="text-charcoal-deep font-semibold">{successBooking.time}</span>
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between">
                      <span className="text-[10px] text-charcoal-light uppercase tracking-wider">Total at Salon Counter</span>
                      <span className="text-sm font-extrabold text-salon-accent">Rs. {successBooking.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        setShowDashboard(true);
                        setSuccessBooking(null);
                      }}
                      className="px-6 py-2.5 bg-charcoal-deep text-white rounded-full text-xs font-semibold font-sans hover:bg-salon-accent transition-all duration-300"
                    >
                      View in My Dashboard
                    </button>
                    
                    <button
                      onClick={() => {
                        setStep(1);
                        setSuccessBooking(null);
                        if (setCurrentPage) {
                          setCurrentPage('home');
                        }
                      }}
                      className="px-6 py-2.5 bg-peach-light/40 hover:bg-peach-light border border-peach-dark rounded-full text-xs font-semibold font-sans text-charcoal-deep transition-all duration-300"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Live Invoice Summary Card Column */}
            {!successBooking && (
              <div className="lg:col-span-1 flex flex-col gap-6">
                
                {/* Rolling summary estimation */}
                <div className="bg-cream-white rounded-3xl border border-peach-dark p-6 shadow-sm sticky top-28">
                  <span className="text-[9px] uppercase font-bold text-salon-accent tracking-widest font-sans">
                    Reservation Bill Estimator
                  </span>

                  <h3 className="font-serif text-lg font-semibold text-charcoal-deep leading-none mt-1">
                    Your Style Draft
                  </h3>

                  <div className="border-t border-b border-peach-light/80 py-4 my-5 flex flex-col gap-3">
                    {selectedServices.length === 0 ? (
                      <p className="text-[11px] text-charcoal-light italic font-sans leading-relaxed text-center py-4">
                        Please tick customized haircuts or bond reconstruction elements from the list to populate the rolling bill estimator.
                      </p>
                    ) : (
                      selectedServices.map(s => (
                        <div key={s.id} className="flex justify-between items-start gap-4">
                          <div className="flex items-start gap-2 max-w-[70%]">
                            <Scissors className="w-3.5 h-3.5 text-salon-accent shrink-0 mt-0.5" />
                            <p className="text-xs font-medium text-charcoal-deep leading-snug">{s.name}</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-charcoal-deep">
                            Rs. {s.priceLKR.toLocaleString()}
                          </span>
                        </div>
                      ))
                    )}

                    {selectedStylist && selectedStylist.id !== 'any-stylist' && (
                      <div className="pt-2 flex justify-between items-center text-xs border-t border-dashed border-peach-light mt-1">
                        <span className="text-charcoal-light font-sans text-[11px]">Selected Stylist Artist:</span>
                        <span className="font-serif font-bold text-charcoal-deep">{selectedStylist.name}</span>
                      </div>
                    )}

                    {(selectedDate || selectedTimeSlot) && (
                      <div className="pt-2 flex flex-col text-[11px] text-charcoal-light border-t border-dashed border-peach-light mt-1 font-sans">
                        {selectedDate && <p>Date: <span className="font-semibold text-charcoal-deep">{selectedDate}</span></p>}
                        {selectedTimeSlot && <p>Hours: <span className="font-semibold text-charcoal-deep">{selectedTimeSlot}</span></p>}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-charcoal-light">Estimated Total Hours</p>
                      <p className="text-xs font-mono font-bold text-charcoal-deep">
                        {totalDuration > 0 ? `${totalDuration} Minutes` : '0 Mins'}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-wider text-charcoal-light">LKR Amount Due</p>
                      <p className="text-base font-extrabold text-salon-accent">
                        Rs. {totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Colombo information box */}
                <div className="bg-charcoal-deep text-cream-soft rounded-3xl p-5 border border-charcoal-deep shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-salon-accent pb-2 border-b border-white/5">
                    <MapPin className="w-4 h-4 text-salon-accent" />
                    <span className="text-xs font-extrabold uppercase tracking-widest font-sans">
                      Our Colombo Studio
                    </span>
                  </div>
                  <p className="text-[11px] text-cream-soft/75 leading-relaxed font-sans">
                    Conveniently positioned in the elite residential Flower Road district, Colombo 07. Valet street parking available for bridal drapes and pamper retreats.
                  </p>
                </div>

              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
