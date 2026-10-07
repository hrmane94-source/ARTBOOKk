import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Check, 
  Ban, 
  Lock, 
  Sparkles, 
  Info, 
  Trash2,
  CalendarCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

interface AvailabilityCalendarProps {
  artistId: string;
  isArtistMode?: boolean; // If true, clicking toggles busy/free; if false, clicking selects a date for booking
  selectedDate?: string;
  onSelectDate?: (dateStr: string) => void;
  artistBookings?: Booking[];
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  artistId,
  isArtistMode = false,
  selectedDate,
  onSelectDate,
  artistBookings = []
}) => {
  const { artists, toggleArtistBusyDate, clearArtistBusyDates } = useApp();
  
  const artist = artists.find(a => a.id === artistId);
  const busyDates = artist?.busyDates || [];

  // Month navigation state
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 9, 1)); // October 2026 default or current

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Helper to format date string YYYY-MM-DD
  const formatDateStr = (d: number): string => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // Check confirmed / pending client bookings on this date
  const getBookingOnDate = (dateStr: string) => {
    return artistBookings.find(b => b.eventDate === dateStr && b.status !== 'cancelled' && b.status !== 'declined');
  };

  const handleDateClick = (dateStr: string) => {
    if (isArtistMode) {
      toggleArtistBusyDate(artistId, dateStr);
    } else {
      if (onSelectDate) {
        onSelectDate(dateStr);
      }
    }
  };

  // Quick actions for artist
  const markNextWeekendBusy = () => {
    // Find upcoming Saturdays and Sundays in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      if (d.getDay() === 0 || d.getDay() === 6) {
        const ds = formatDateStr(day);
        if (!busyDates.includes(ds)) {
          toggleArtistBusyDate(artistId, ds);
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden p-4 sm:p-5 space-y-4">
      
      {/* Calendar Header with Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 font-serif-luxury">
              {monthNames[month]} {year}
            </h3>
            <p className="text-[11px] text-stone-500">
              {isArtistMode 
                ? 'Click dates to toggle your availability' 
                : 'Choose an available date for your event'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-stone-400 uppercase tracking-wider pb-1">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {/* Empty slots for start of month */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9 sm:h-11 rounded-xl bg-stone-50/40 opacity-30" />
        ))}

        {/* Days of Month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDateStr(day);
          const isBusy = busyDates.includes(dateStr);
          const clientBooking = getBookingOnDate(dateStr);
          const isSelected = selectedDate === dateStr;

          // Compute style
          let bgClass = "bg-stone-50 hover:bg-amber-50/80 text-stone-800 border-stone-200/70";
          let badge = null;

          if (isBusy) {
            bgClass = isArtistMode 
              ? "bg-rose-50 border-rose-300 text-rose-900 hover:bg-rose-100 font-bold" 
              : "bg-rose-50/80 border-rose-200 text-rose-800 cursor-not-allowed";
            badge = <span className="text-[9px] text-rose-600 font-bold flex items-center justify-center gap-0.5"><Ban className="w-2.5 h-2.5" /> Busy</span>;
          } else if (clientBooking) {
            bgClass = "bg-amber-50 border-amber-300 text-amber-950 font-bold";
            badge = <span className="text-[9px] text-amber-700 font-bold flex items-center justify-center gap-0.5"><CalendarCheck className="w-2.5 h-2.5" /> Booked</span>;
          } else if (isSelected) {
            bgClass = "bg-stone-900 text-white border-stone-900 shadow-sm ring-2 ring-rose-400";
            badge = <span className="text-[9px] text-amber-300 font-bold flex items-center justify-center">Selected</span>;
          }

          return (
            <button
              type="button"
              key={day}
              onClick={() => handleDateClick(dateStr)}
              className={`h-11 sm:h-13 rounded-xl border p-1 flex flex-col items-center justify-between text-xs transition-all cursor-pointer relative group ${bgClass}`}
            >
              <span className={`font-semibold ${isSelected ? 'text-white font-bold' : ''}`}>
                {day}
              </span>

              {badge || (
                <span className="text-[8px] text-emerald-600/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isArtistMode ? 'Free' : 'Available'}
                </span>
              )}

              {/* Dot indicator */}
              {isBusy && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full" />
              )}
              {clientBooking && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-stone-100 border border-stone-300"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-rose-100 border border-rose-300"></span>
            <span className="font-semibold text-rose-700">Marked Busy ({busyDates.length})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300"></span>
            <span className="font-semibold text-amber-800">Client Reserved</span>
          </div>
        </div>

        {/* Artist controls */}
        {isArtistMode && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markNextWeekendBusy}
              className="text-[11px] px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg font-bold cursor-pointer transition-colors"
            >
              + Block Weekends
            </button>
            {busyDates.length > 0 && (
              <button
                type="button"
                onClick={() => clearArtistBusyDates(artistId)}
                className="text-[11px] px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg font-semibold cursor-pointer"
              >
                Clear All Busy
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
