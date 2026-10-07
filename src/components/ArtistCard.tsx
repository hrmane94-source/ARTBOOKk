import React from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Video, 
  MessageSquare, 
  Calendar, 
  Heart, 
  Award,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Artist } from '../types';
import { useApp } from '../context/AppContext';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const { 
    openArtistDetail, 
    openBookingModal, 
    openChatWithArtist, 
    savedArtistIds, 
    toggleSaveArtist 
  } = useApp();

  const isSaved = savedArtistIds.includes(artist.id);
  const videoCount = artist.portfolio.filter(p => p.type === 'video').length;
  const photoCount = artist.portfolio.filter(p => p.type === 'photo').length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 overflow-hidden flex flex-col group">
      
      {/* Media Showcase Banner */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img 
          src={artist.coverImage || artist.portfolio[0]?.url || 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=600&auto=format&fit=crop&q=80'} 
          alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* Verification Badge */}
          {artist.isVerified ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[11px] font-bold shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Artbook Verified Pro</span>
            </div>
          ) : (
            <span className="bg-stone-800/80 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
              Community Artisan
            </span>
          )}

          {/* Favorite Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveArtist(artist.id);
            }}
            aria-label={isSaved ? `Remove ${artist.name} from favorites` : `Save ${artist.name} to favorites`}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
              isSaved 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-black/40 hover:bg-black/60 text-white border border-white/20'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Media indicators (Videos / Photos) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          {videoCount > 0 && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-bold shadow-xs">
              <Video className="w-3 h-3 animate-pulse" />
              <span>{videoCount} Reel{videoCount > 1 ? 's' : ''}</span>
            </span>
          )}
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-stone-200 text-[10px] font-medium">
            {photoCount} Photos
          </span>
          {artist.certificates.length > 0 && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/80 backdrop-blur-md text-amber-300 text-[10px] font-medium border border-amber-500/30">
              <Award className="w-3 h-3 text-amber-400" />
              <span>{artist.certificates.length} Certs</span>
            </span>
          )}
        </div>

        {/* Starting Price Tag */}
        <div className="absolute bottom-3 right-3 text-right bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/15">
          <div className="text-[9px] uppercase tracking-wider text-stone-300 font-medium">Starts from</div>
          <div className="text-sm font-extrabold text-amber-300 font-mono">
            ₹{artist.startingPrice.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Artist Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Header: Avatar, Name, Category */}
        <div>
          <div className="flex items-start gap-3">
            <img 
              src={artist.avatar} 
              alt={artist.name} 
              className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-400/50 shrink-0 shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h3 
                  onClick={() => openArtistDetail(artist)}
                  className="font-bold text-stone-900 text-base hover:text-rose-600 cursor-pointer truncate transition-colors font-serif-luxury"
                >
                  {artist.name}
                </h3>
                
                {/* Rating Badge */}
                <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-200 text-xs font-bold shrink-0">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{artist.rating.toFixed(1)}</span>
                  <span className="text-[10px] text-stone-400 font-normal">({artist.reviewCount})</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
                <span className="font-semibold text-rose-600">{artist.category}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  {artist.city}
                </span>
                <span>•</span>
                <span>{artist.experienceYears}y exp</span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs text-stone-600 line-clamp-2 mt-2.5 leading-relaxed">
            {artist.tagline}
          </p>

          {/* Badges / Highlights */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {artist.badges.slice(0, 2).map((badge, idx) => (
              <span 
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium border border-stone-200/60"
              >
                {badge}
              </span>
            ))}
            {artist.pricingPackages.length > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-medium border border-amber-200">
                {artist.pricingPackages.length} Packages available
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: View Portfolio, DM Chat, Book */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
          
          {/* DM / Chat Button */}
          <button
            onClick={() => openChatWithArtist(artist)}
            className="p-2.5 bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600 rounded-xl border border-stone-200/70 transition-colors cursor-pointer shrink-0"
            title={`Direct message with ${artist.name}`}
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* View Full Portfolio & Rates */}
          <button
            onClick={() => openArtistDetail(artist)}
            className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>View Portfolio</span>
          </button>

          {/* Book Now Button */}
          <button
            onClick={() => openBookingModal(artist)}
            className="py-2 px-3.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs hover:shadow-md"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book</span>
          </button>
        </div>

      </div>

    </div>
  );
};
