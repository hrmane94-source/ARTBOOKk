import React from 'react';
import { Palette, ShieldCheck, Heart, Sparkles, Phone, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { openRegisterArtistModal, setActiveCategory } = useApp();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-500 to-amber-500 p-0.5">
                <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center">
                  <Palette className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-bold font-serif-luxury text-amber-200 tracking-tight">
                Artbook
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              India's premier verified bridal & artisanal talent marketplace. Discover, view video portfolios, chat directly, and book artists with transparent pricing.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>₹39 Nominal Verification Guarantee</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => { setActiveCategory('Mehendi Designer'); window.scrollTo({ top: 350, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  Bridal Mehendi Designers
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('Bridal Makeup'); window.scrollTo({ top: 350, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  HD & Airbrush Makeup Artists
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('Rangoli Artist'); window.scrollTo({ top: 350, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  3D & Sanskar Bharti Rangoli
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('Hairstylist'); window.scrollTo({ top: 350, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  Bridal Hairstylists & Poola Jada
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('Nail Artist'); window.scrollTo({ top: 350, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  Russian Manicure & 3D Nail Art
                </button>
              </li>
            </ul>
          </div>

          {/* For Artists */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              For Creative Artists
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={openRegisterArtistModal} className="hover:text-amber-300 font-semibold text-rose-400 flex items-center gap-1">
                  <span>Join as Artist (Pay ₹39 Once)</span>
                  <span>→</span>
                </button>
              </li>
              <li><span>0% Booking Commission</span></li>
              <li><span>Unlimited Video Reels & Portfolios</span></li>
              <li><span>Direct End-to-End Client Chat</span></li>
              <li><span>Artbook Verified Pro Badge</span></li>
            </ul>
          </div>

          {/* Trust & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Direct & Safe Booking
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <p>Clients never pay commission fees on Artbook. Direct connect with artisans.</p>
              <div className="pt-2 text-[11px] text-stone-500">
                Support: <span className="text-stone-300">support@artbook.in</span>
              </div>
              <div className="text-[11px] text-stone-500">
                Helpline: <span className="text-stone-300">+91 1800-ARTBOOK (Mon-Sat)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div>
            © 2026 Artbook Technologies. Built for wedding & festive artisans across India.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Verified Authenticity</span>
            <span>•</span>
            <span>Direct Artist Payouts</span>
            <span>•</span>
            <span>End-to-End Chat</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
