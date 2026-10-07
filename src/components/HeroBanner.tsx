import React from 'react';
import { Sparkles, ShieldCheck, Video, MessageCircle, Star, Award, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroBanner: React.FC = () => {
  const { openRegisterArtistModal, setActiveCategory } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-amber-950/95 to-stone-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-900/40">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>India's Premier Verified Artist & Artisan Marketplace</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-serif-luxury text-amber-50">
              Discover & Hire Top Artists with <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">Verified Portfolios</span>
            </h1>

            {/* Description */}
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore authentic high-definition artwork photos, video reels, verified academy certificates, transparent service rates, and connect directly with Mehendi masters, Rangoli artists, Bridal MUAs, and Hairstylists.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-stone-800/60 backdrop-blur-sm border border-stone-700/50 p-3 rounded-xl flex items-center gap-2.5">
                <Video className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-stone-100">Live Video Reels</div>
                  <div className="text-[10px] text-stone-400">Authentic Artworks</div>
                </div>
              </div>

              <div className="bg-stone-800/60 backdrop-blur-sm border border-stone-700/50 p-3 rounded-xl flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-stone-100">Verified Certs</div>
                  <div className="text-[10px] text-stone-400">Academy Badges</div>
                </div>
              </div>

              <div className="bg-stone-800/60 backdrop-blur-sm border border-stone-700/50 p-3 rounded-xl flex items-center gap-2.5">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-stone-100">Direct Chat (DM)</div>
                  <div className="text-[10px] text-stone-400">End-to-End Chat</div>
                </div>
              </div>

              <div className="bg-stone-800/60 backdrop-blur-sm border border-stone-700/50 p-3 rounded-xl flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-stone-100">₹39 Verification</div>
                  <div className="text-[10px] text-stone-400">Zero Spam Profiles</div>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#explore-artists"
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-full font-bold text-sm shadow-lg shadow-rose-900/30 hover:brightness-110 hover:shadow-rose-900/50 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Browse Artists & Portfolios</span>
                <span>↓</span>
              </a>

              <button
                onClick={openRegisterArtistModal}
                className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/40 rounded-full font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Join as Artist (Pay ₹39 Once)</span>
              </button>
            </div>
          </div>

          {/* Right Hero Showcase Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              
              {/* Stacked Showcase Card 1 */}
              <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
                <div className="relative rounded-xl overflow-hidden aspect-video mb-3.5 group">
                  <img 
                    src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=800&auto=format&fit=crop&q=80" 
                    alt="Mehendi and Art Showcase" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3.5">
                    <div className="w-full flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Royal Rajasthani Henna</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <div className="text-[10px] text-amber-200">Starting @ ₹3,500 • Jaipur</div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>4.95</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Micro Category Pills */}
                <div className="flex items-center justify-between text-xs text-stone-300 border-t border-stone-800 pt-3">
                  <div className="flex items-center gap-1 text-[11px] text-stone-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>100+ Artists Online</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-medium">
                    ⚡ Instant Booking Confirmation
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge Card */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white text-stone-900 rounded-xl p-3 shadow-xl border border-stone-200 flex items-center gap-3 animate-bounce-subtle">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-stone-900 flex items-center gap-1">
                    <span>Artbook Verified</span>
                    <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">₹39</span>
                  </div>
                  <div className="text-[10px] text-stone-500">Zero Fake Accounts Guaranteed</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
