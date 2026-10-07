import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  CreditCard,
  Lock,
  User as UserIcon,
  Phone,
  Mail,
  AlertTriangle,
  Ban,
  MessageSquare,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PricingPackage } from '../types';
import { AvailabilityCalendar } from './AvailabilityCalendar';

export const BookingModal: React.FC = () => {
  const { 
    selectedArtist, 
    selectedPackage, 
    closeModal, 
    createBooking, 
    currentUser, 
    bookings,
    openLoginModal,
    openChatWithArtist 
  } = useApp();

  const [activePackage, setActivePackage] = useState<PricingPackage>(
    selectedPackage || (selectedArtist?.pricingPackages[0] as PricingPackage)
  );

  const [eventDate, setEventDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  
  const [showCalendarWidget, setShowCalendarWidget] = useState(true);
  const [timeSlot, setTimeSlot] = useState('Morning (09:00 AM - 01:00 PM)');
  const [eventLocation, setEventLocation] = useState(currentUser?.city ? `${currentUser.city}, Venue Address` : 'Mumbai, Hotel / Home Venue');
  const [clientName, setClientName] = useState(currentUser?.name || 'Priya Mukherjee');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || 'priya.client@artbook.in');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '+91 98200 12345');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!selectedArtist) return null;

  const isSelectedDateBusy = selectedArtist.busyDates?.includes(eventDate);
  const artistBookings = bookings.filter(b => b.artistId === selectedArtist.id);
  const isSelectedDateBooked = artistBookings.some(b => b.eventDate === eventDate && b.status === 'confirmed');

  const timeSlots = [
    'Morning (09:00 AM - 01:00 PM)',
    'Afternoon (02:00 PM - 06:00 PM)',
    'Evening (06:00 PM - 10:00 PM)',
    'Full Day Bridal Event'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      openLoginModal('client');
      return;
    }

    createBooking({
      artistId: selectedArtist.id,
      artistName: selectedArtist.name,
      artistAvatar: selectedArtist.avatar,
      artistCategory: selectedArtist.category,
      clientId: currentUser.id,
      clientName: clientName || currentUser.name,
      clientEmail: clientEmail || currentUser.email,
      clientPhone: clientPhone || '+91 99999 00000',
      servicePackageId: activePackage.id,
      packageName: activePackage.title,
      price: activePackage.price,
      eventDate,
      timeSlot,
      eventLocation,
      notes: isSelectedDateBusy ? `[NOTE: Date marked busy by artist - Inquiring for special slot] ${notes}` : notes
    });

    setBookingSuccess(true);
    setTimeout(() => {
      closeModal();
      openChatWithArtist(selectedArtist);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-4 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src={selectedArtist.avatar} 
              alt={selectedArtist.name} 
              className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-400 shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm sm:text-base font-serif-luxury text-amber-100">
                  Book {selectedArtist.name}
                </h3>
                <span className="flex items-center gap-0.5 px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs text-stone-300">
                {selectedArtist.category} • {selectedArtist.city}
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            aria-label="Close booking dialog"
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {bookingSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold font-serif-luxury text-stone-900">
                Booking Request Sent Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                {selectedArtist.name} has been notified and a direct message thread with your booking details has been created.
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Package Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  1. Select Service Package / Rate Tier:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedArtist.pricingPackages.map(pkg => (
                    <div
                      key={pkg.id}
                      onClick={() => setActivePackage(pkg)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        activePackage.id === pkg.id
                          ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-400/40'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900">{pkg.title}</span>
                        <span className="font-mono font-bold text-sm text-rose-600">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Date & Slot Selection with Availability Calendar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>2. Select Event Date & Check Availability *</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCalendarWidget(!showCalendarWidget)}
                    className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                  >
                    {showCalendarWidget ? 'Hide Calendar' : 'View Availability Calendar'}
                  </button>
                </div>

                {/* Calendar Selector Component */}
                {showCalendarWidget && (
                  <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                    <AvailabilityCalendar
                      artistId={selectedArtist.id}
                      isArtistMode={false}
                      selectedDate={eventDate}
                      onSelectDate={(d) => setEventDate(d)}
                      artistBookings={artistBookings}
                    />
                  </div>
                )}

                {/* Date Input and Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">Chosen Date (YYYY-MM-DD)</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
                      className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-semibold outline-none border transition-all ${
                        isSelectedDateBusy 
                          ? 'bg-rose-50 border-rose-400 text-rose-900 focus:ring-2 focus:ring-rose-200' 
                          : 'bg-stone-50 border-stone-300 focus:bg-white focus:border-rose-400'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">Preferred Time Slot *</label>
                    <select
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:bg-white focus:border-rose-400"
                    >
                      {timeSlots.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Warning notice if date is marked busy */}
                {isSelectedDateBusy && (
                  <div className="bg-rose-50 border border-rose-300 p-3.5 rounded-2xl animate-in fade-in space-y-2">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-rose-900">
                          {selectedArtist.name} has marked this date as BUSY / UNAVAILABLE
                        </div>
                        <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                          This artist is currently occupied or on leave on <strong>{eventDate}</strong>. You can choose any white/green available date from the calendar above, or submit this request as an emergency inquiry.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          closeModal();
                          openChatWithArtist(selectedArtist);
                        }}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat Artist for Custom Slot</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Info if already booked */}
                {isSelectedDateBooked && !isSelectedDateBusy && (
                  <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl flex items-center gap-2 text-xs text-amber-900 font-semibold">
                    <CalendarCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Note: Another client has booked a session on this date. Please check with the artist on exact hour availability.</span>
                  </div>
                )}
              </div>

              {/* Step 3: Venue & Contact Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    4. Event Venue Address / Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Palace Banquet, MG Road, Mumbai"
                    value={eventLocation}
                    onChange={e => setEventLocation(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-rose-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Special Notes / Bridal Theme Reference</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need natural dark stain henna, traditional peacock motifs, bride + 4 bridesmaids..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none resize-none"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Package Base Price:</span>
                  <span className="font-mono font-bold">₹{activePackage.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Artist Doorstep Travel & Kits:</span>
                  <span className="text-emerald-600 font-semibold">Included (FREE)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Artbook Client Platform Fee:</span>
                  <span className="text-emerald-600 font-semibold">₹0 (100% Free)</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between font-bold text-stone-900 text-sm">
                  <span>Total Amount:</span>
                  <span className="text-rose-600 font-mono text-base font-black">
                    ₹{activePackage.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Footer Submit */}
          {!bookingSuccess && (
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:brightness-110 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Submit Booking Request</span>
              </button>
              <p className="text-center text-[11px] text-stone-500 mt-2">
                ✓ Pay advance securely or on-spot after artist confirmation
              </p>
            </div>
          )}

        </form>

      </div>
    </div>
  );
};
