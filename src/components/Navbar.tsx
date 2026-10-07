import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  CalendarCheck, 
  User, 
  LogOut, 
  PlusCircle, 
  Heart,
  LayoutDashboard,
  Menu,
  X,
  Palette
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';

const CITIES = [
  'All Cities',
  'Mumbai',
  'Delhi NCR',
  'Jaipur',
  'Bangalore',
  'Pune',
  'Ahmedabad',
  'Goa',
  'Kolkata',
  'Hyderabad',
  'Chennai'
];

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    searchQuery, 
    setSearchQuery, 
    selectedCity, 
    setSelectedCity, 
    savedArtistIds,
    conversations,
    bookings,
    openLoginModal, 
    openRegisterArtistModal, 
    openUserDashboard, 
    openArtistDashboard,
    openChatById,
    logout 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const activeBookingsCount = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
  const isArtist = currentUser?.role === 'artist';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100/80 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
        <span>Artists: Get Verified & Showcase your portfolio to thousands of bridal clients for just <strong>₹39</strong>!</span>
        <button 
          onClick={openRegisterArtistModal}
          className="underline hover:text-amber-200 font-bold ml-1 cursor-pointer"
        >
          Join as Artist
        </button>
      </div>

      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-500 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center">
                <Palette className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-700 via-rose-600 to-amber-900 bg-clip-text text-transparent font-serif-luxury">
                Artbook
              </span>
              <span className="hidden sm:block text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
                Verified Artist Booking
              </span>
            </div>
          </button>

          {/* City Selector */}
          <div className="hidden md:flex items-center bg-stone-100/90 hover:bg-stone-200/80 px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 border border-stone-200/60 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1.5 shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Filter artists by city"
              className="bg-transparent border-none outline-none cursor-pointer pr-1 text-stone-800 font-semibold"
            >
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search artists, bridal mehendi, 3D rangoli, makeup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 hover:bg-stone-100/80 focus:bg-white text-xs sm:text-sm rounded-full border border-stone-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200/50 outline-none transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Navigation & CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          
          {/* Register Artist CTA */}
          <button
            onClick={openRegisterArtistModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full text-xs font-semibold shadow-sm hover:shadow-md hover:brightness-105 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-100" />
            <span>Artist Sign Up</span>
            <span className="bg-stone-900/30 text-[10px] px-1.5 py-0.5 rounded-full font-mono">₹39</span>
          </button>

          {/* Quick Shortcuts for Logged-In User */}
          {currentUser && (
            <>
              {/* Messages / Chat Shortcut */}
              <button
                onClick={() => {
                  if (conversations.length > 0) {
                    openChatById(conversations[0].id);
                  } else {
                    openUserDashboard();
                  }
                }}
                className="relative p-2 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                title="Direct Messages"
              >
                <MessageSquare className="w-5 h-5" />
                {conversations.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Bookings / Dashboard */}
              <button
                onClick={isArtist ? openArtistDashboard : openUserDashboard}
                className="relative p-2 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                title={isArtist ? 'Artist Dashboard' : 'My Bookings'}
              >
                {isArtist ? <LayoutDashboard className="w-5 h-5" /> : <CalendarCheck className="w-5 h-5" />}
                {activeBookingsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 px-1.5 py-0.2 bg-rose-600 text-white text-[10px] font-bold rounded-full ring-2 ring-white">
                    {activeBookingsCount}
                  </span>
                )}
              </button>
            </>
          )}

          {/* User Auth Profile / Login */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 bg-stone-100 hover:bg-stone-200/80 rounded-full border border-stone-200 transition-colors cursor-pointer"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-rose-400" 
                />
                <span className="text-xs font-semibold text-stone-800 hidden md:inline max-w-[90px] truncate">
                  {currentUser.name}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                  isArtist ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {currentUser.role}
                </span>
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-amber-700 font-semibold">
                      {isArtist ? '⭐ Verified Artbook Artist' : '🎨 Artbook Client (Free)'}
                    </div>
                  </div>

                  <div className="py-1">
                    {isArtist ? (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          openArtistDashboard();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4 text-amber-600" />
                        Artist Dashboard & Rates
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          openUserDashboard();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                      >
                        <CalendarCheck className="w-4 h-4 text-rose-600" />
                        My Bookings & Favorites
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openUserDashboard();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      Saved Artists ({savedArtistIds.length})
                    </button>
                  </div>

                  <div className="border-t border-stone-100 pt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openLoginModal('client')}
                className="px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => openLoginModal('client')}
                className="px-3.5 py-1.5 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
              >
                Sign Up (Free)
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Expand */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search artists, bridal mehendi, makeup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 rounded-xl border border-stone-200 text-sm outline-none"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-stone-100">
            <span className="text-xs font-semibold text-stone-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" /> Select City:
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Filter artists by city (mobile)"
              className="text-xs font-bold text-stone-800 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200"
            >
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openRegisterArtistModal();
              }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-rose-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              Artist Registration & Verification (₹39)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
