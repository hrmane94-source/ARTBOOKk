import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Phone,
  Building2,
  LogIn
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_USER } from '../data/mockArtists';

export const AuthModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    login, 
    registerClient, 
    openRegisterArtistModal, 
    artists 
  } = useApp();

  const isArtistDefault = activeModal === 'login-artist';
  const [activeTab, setActiveTab] = useState<'client-login' | 'client-register' | 'artist-login'>(
    isArtistDefault ? 'artist-login' : 'client-login'
  );

  // Client form
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('Mumbai');

  // Artist Login Form
  const [artistEmail, setArtistEmail] = useState('pooja.mehendi@artbook.in');

  if (!activeModal || (!activeModal.startsWith('login') && activeModal !== 'auth')) return null;

  const handleClientRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    registerClient(clientName, clientEmail, clientPhone, clientCity);
  };

  const handleArtistLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundArtist = artists.find(a => a.email.toLowerCase() === artistEmail.toLowerCase()) || artists[0];
    login({
      id: 'user-' + foundArtist.id,
      name: foundArtist.name,
      email: foundArtist.email,
      phone: foundArtist.phone,
      role: 'artist',
      avatar: foundArtist.avatar,
      city: foundArtist.city,
      artistId: foundArtist.id
    });
  };

  const handleQuickDemoClient = () => {
    login(INITIAL_USER);
  };

  const handleQuickDemoArtist = (artistId: string) => {
    const found = artists.find(a => a.id === artistId) || artists[0];
    login({
      id: 'user-' + found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      role: 'artist',
      avatar: found.avatar,
      city: found.city,
      artistId: found.id
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-5 px-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold font-serif-luxury text-amber-100 flex items-center gap-2">
              <span>Welcome to Artbook</span>
            </h2>
            <p className="text-xs text-stone-300">
              Discover verified artists or manage your creative booking studio
            </p>
          </div>

          <button
            onClick={closeModal}
            aria-label="Close login dialog"
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-stone-100 border-b border-stone-200 p-1.5 flex gap-1 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('client-login')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'client-login' 
                ? 'bg-white text-stone-900 shadow-xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Client Login (Free)
          </button>

          <button
            onClick={() => setActiveTab('client-register')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'client-register' 
                ? 'bg-white text-stone-900 shadow-xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign Up (Free)
          </button>

          <button
            onClick={() => setActiveTab('artist-login')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
              activeTab === 'artist-login' 
                ? 'bg-stone-900 text-amber-300 shadow-xs' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Artist Portal</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* 1. CLIENT LOGIN */}
          {activeTab === 'client-login' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-rose-50/70 border border-rose-200 p-3.5 rounded-2xl">
                <div className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-rose-600" />
                  <span>Free Client Account</span>
                </div>
                <p className="text-[11px] text-rose-800 mt-0.5">
                  Browse portfolios, video reels, check rates, and message artists with <strong>₹0 platform fee</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="priya.mukherjee@gmail.com"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm outline-none font-mono"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoClient}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                Log In to Artbook
              </button>

              <div className="text-center">
                <span className="text-xs text-stone-500">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('client-register')}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  Sign up for free
                </button>
              </div>
            </div>
          )}

          {/* 2. CLIENT REGISTRATION (100% FREE) */}
          {activeTab === 'client-register' && (
            <form onSubmit={handleClientRegister} className="space-y-3.5 animate-in fade-in">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Client accounts are 100% FREE forever. No charges or subscription needed!</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Mukherjee"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Email *</label>
                  <input
                    type="email"
                    placeholder="priya@gmail.com"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={clientPhone}
                    onChange={e => setClientPhone(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your City</label>
                <input
                  type="text"
                  placeholder="Mumbai, Delhi, Bangalore..."
                  value={clientCity}
                  onChange={e => setClientCity(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-105 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                Create Free Client Account (₹0)
              </button>
            </form>
          )}

          {/* 3. ARTIST LOGIN & ONBOARDING */}
          {activeTab === 'artist-login' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl">
                <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Verified Artist & Artisan Portal</span>
                </div>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Manage incoming client bookings, update packages, upload video reels, and chat directly with brides.
                </p>
              </div>

              <form onSubmit={handleArtistLoginSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Artist Email</label>
                  <input
                    type="email"
                    value={artistEmail}
                    onChange={e => setArtistEmail(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  Log In to Artist Dashboard
                </button>
              </form>

              {/* New Artist Sign Up CTA */}
              <div className="pt-2 border-t border-stone-100 text-center">
                <p className="text-xs text-stone-600 mb-2">Are you a new Mehendi, Rangoli, Makeup or Hair Artist?</p>
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    openRegisterArtistModal();
                  }}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:brightness-105 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Register as New Artist (Pay ₹39 Once)</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Switcher Cards */}
          <div className="pt-3 border-t border-stone-100">
            <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-2 text-center">
              ⚡ Quick 1-Click Demo Profiles for Testing
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoClient}
                className="p-2 bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-300 rounded-xl text-left cursor-pointer transition-colors"
              >
                <div className="text-[11px] font-bold text-stone-800">👤 Priya (Client)</div>
                <div className="text-[10px] text-stone-500">Free User Profile</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoArtist('artist-1')}
                className="p-2 bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-xl text-left cursor-pointer transition-colors"
              >
                <div className="text-[11px] font-bold text-stone-800">✨ Pooja (Mehendi)</div>
                <div className="text-[10px] text-amber-700 font-medium">Verified Artist</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoArtist('artist-2')}
                className="p-2 bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-300 rounded-xl text-left cursor-pointer transition-colors"
              >
                <div className="text-[11px] font-bold text-stone-800">💄 Ananya (MUA)</div>
                <div className="text-[10px] text-rose-700 font-medium">Verified Artist</div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
