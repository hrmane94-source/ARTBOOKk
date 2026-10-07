import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Video, 
  Image as ImageIcon, 
  Award, 
  Calendar, 
  MessageSquare, 
  Heart, 
  CheckCircle2, 
  Clock, 
  Share2, 
  Check, 
  Play, 
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  ThumbsUp,
  Ban
} from 'lucide-react';
import { Artist, PricingPackage, PortfolioItem, CertificateItem } from '../types';
import { useApp } from '../context/AppContext';
import { AvailabilityCalendar } from './AvailabilityCalendar';

export const ArtistDetailModal: React.FC = () => {
  const { 
    selectedArtist, 
    closeModal, 
    openBookingModal, 
    openChatWithArtist, 
    openReviewModal, 
    savedArtistIds, 
    bookings,
    toggleSaveArtist 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'portfolio' | 'rates' | 'schedule' | 'certificates' | 'reviews'>('portfolio');
  const [selectedMedia, setSelectedMedia] = useState<PortfolioItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedArtist) return null;

  const isSaved = savedArtistIds.includes(selectedArtist.id);
  const videoItems = selectedArtist.portfolio.filter(p => p.type === 'video');
  const photoItems = selectedArtist.portfolio.filter(p => p.type === 'photo');
  const artistBookings = bookings.filter(b => b.artistId === selectedArtist.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-stone-50 w-full max-w-5xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Close & Action Buttons */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/20"
            title="Share Artist Profile"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => toggleSaveArtist(selectedArtist.id)}
            aria-label={isSaved ? `Remove ${selectedArtist.name} from favorites` : `Save ${selectedArtist.name} to favorites`}
            className={`p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer border border-white/20 ${
              isSaved ? 'bg-rose-500 text-white' : 'bg-black/50 hover:bg-black/70 text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={closeModal}
            aria-label="Close artist details dialog"
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1">
          
          {/* Cover Hero Banner */}
          <div className="relative h-64 sm:h-80 bg-stone-900">
            <img 
              src={selectedArtist.coverImage || selectedArtist.portfolio[0]?.url} 
              alt={selectedArtist.name} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            
            {/* Header Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedArtist.avatar} 
                  alt={selectedArtist.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-amber-400/80 shadow-2xl shrink-0" 
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-luxury">
                      {selectedArtist.name}
                    </h2>
                    {selectedArtist.isVerified && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/90 text-stone-950 text-xs font-bold shadow-md">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Artbook Verified Pro</span>
                      </span>
                    )}
                  </div>

                  <p className="text-amber-200 text-xs sm:text-sm font-medium mt-1">
                    {selectedArtist.category} • {selectedArtist.experienceYears} Years Experience
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-xs text-stone-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {selectedArtist.city} ({selectedArtist.address})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {selectedArtist.rating.toFixed(1)} ({selectedArtist.reviewCount} Reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Tag in Header */}
              <div className="bg-stone-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-500/30 text-right shrink-0">
                <div className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider">Starting Rate</div>
                <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                  ₹{selectedArtist.startingPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">✓ Nominal rates • Direct booking</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="sticky top-0 z-10 bg-white border-b border-stone-200 px-6 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-6 py-1">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`py-3 px-2 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'portfolio' 
                    ? 'border-rose-600 text-rose-600' 
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Portfolio & Reels ({selectedArtist.portfolio.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('rates')}
                className={`py-3 px-2 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'rates' 
                    ? 'border-rose-600 text-rose-600' 
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Packages & Rates ({selectedArtist.pricingPackages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`py-3 px-2 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'schedule' 
                    ? 'border-rose-600 text-rose-600' 
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Calendar className="w-4 h-4 text-rose-500" />
                <span>Availability Calendar ({selectedArtist.busyDates?.length || 0} Busy)</span>
              </button>

              <button
                onClick={() => setActiveTab('certificates')}
                className={`py-3 px-2 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'certificates' 
                    ? 'border-rose-600 text-rose-600' 
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Award className="w-4 h-4 text-amber-600" />
                <span>Certificates ({selectedArtist.certificates.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-2 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeTab === 'reviews' 
                    ? 'border-rose-600 text-rose-600' 
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Star className="w-4 h-4 text-amber-500" />
                <span>Reviews ({selectedArtist.reviewCount})</span>
              </button>
            </div>

            {/* Availability Days Badge */}
            <div className="hidden md:flex items-center gap-1 text-[11px] text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Available: {selectedArtist.availabilityDays.join(', ')}</span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6">
            
            {/* TAB 1: PORTFOLIO & REELS */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                
                {/* Artist Bio & Highlights */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                  <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    About {selectedArtist.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {selectedArtist.bio}
                  </p>
                  
                  {/* Badges list */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-stone-100">
                    {selectedArtist.badges.map((b, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-semibold border border-amber-200/80 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-amber-600" />
                        {b}
                      </span>
                    ))}
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {selectedArtist.completedBookingsCount}+ Completed Bookings
                    </span>
                  </div>
                </div>

                {/* Video Reels Section (if available) */}
                {videoItems.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                        <Video className="w-4 h-4 text-rose-500" />
                        <span>Live Video Reels & Time-Lapses</span>
                      </h4>
                      <span className="text-xs text-stone-500">{videoItems.length} Video{videoItems.length > 1 ? 's' : ''}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {videoItems.map(item => (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedMedia(item)}
                          className="bg-black rounded-2xl overflow-hidden shadow-md group cursor-pointer relative aspect-video border border-stone-800"
                        >
                          <video 
                            src={item.url} 
                            poster={item.thumbnail}
                            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                            muted
                            playsInline
                            onMouseEnter={(e) => {
                              try { e.currentTarget.play(); } catch {}
                            }}
                            onMouseLeave={(e) => {
                              try { e.currentTarget.pause(); } catch {}
                            }}
                          />
                          
                          {/* Play Overlay Icon */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                            <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl">
                              <Play className="w-6 h-6 fill-white ml-1" />
                            </div>
                          </div>

                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 text-white">
                            <div className="text-xs font-bold">{item.title}</div>
                            <div className="text-[10px] text-stone-300">{item.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photo Gallery Grid */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-600" />
                      <span>Artwork & Bridal Portfolio Photos</span>
                    </h4>
                    <span className="text-xs text-stone-500">{photoItems.length} Photo{photoItems.length > 1 ? 's' : ''}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {photoItems.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedMedia(item)}
                        className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-2xs hover:shadow-lg cursor-pointer transition-all"
                      >
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white">
                          <div>
                            <div className="text-xs font-bold">{item.title}</div>
                            <div className="text-[10px] text-stone-200">{item.categoryTag}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: PACKAGES & RATES */}
            {activeTab === 'rates' && (
              <div className="space-y-4">
                <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-amber-950">Transparent & Direct Pricing</div>
                      <div className="text-[11px] text-amber-800">All prices in INR (₹). No hidden marketplace surcharges.</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-stone-700">
                    Starting @ ₹{selectedArtist.startingPrice.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedArtist.pricingPackages.map(pkg => (
                    <div 
                      key={pkg.id}
                      className={`bg-white rounded-2xl p-5 border flex flex-col justify-between transition-all relative ${
                        pkg.popular 
                          ? 'border-rose-400 shadow-lg ring-2 ring-rose-300/40' 
                          : 'border-stone-200 shadow-2xs hover:border-stone-300'
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 right-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-sm">
                          ★ MOST POPULAR
                        </div>
                      )}

                      <div>
                        <div className="text-base font-bold text-stone-900 font-serif-luxury">
                          {pkg.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>Duration: {pkg.duration}</span>
                        </div>

                        <div className="my-3 text-2xl font-black text-rose-600 font-mono">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </div>

                        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                          {pkg.description}
                        </p>

                        <div className="space-y-2 mb-6">
                          <div className="text-[11px] font-bold text-stone-800 uppercase tracking-wider">Package Inclusions:</div>
                          {pkg.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => openBookingModal(selectedArtist, pkg)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          pkg.popular
                            ? 'bg-gradient-to-r from-rose-500 to-amber-500 hover:brightness-105 text-white shadow-md'
                            : 'bg-stone-900 hover:bg-stone-800 text-white'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book This Package</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SCHEDULE & AVAILABILITY CALENDAR */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      <span>{selectedArtist.name}'s Real-Time Availability</span>
                    </h3>
                    <p className="text-xs text-stone-500">
                      Check which days are open for bridal bookings and events before scheduling.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openBookingModal(selectedArtist)}
                      className="py-2 px-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md cursor-pointer"
                    >
                      Book Free Date Now
                    </button>
                  </div>
                </div>

                {/* Interactive Calendar Component */}
                <AvailabilityCalendar
                  artistId={selectedArtist.id}
                  isArtistMode={false}
                  artistBookings={artistBookings}
                />
              </div>
            )}

            {/* TAB 3: CERTIFICATES & AWARDS */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                  <h3 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    Verified Credentials & Academy Accreditations
                  </h3>
                  <p className="text-xs text-stone-500">
                    Artbook verifies official certification, identity, and background to ensure only genuine masters and stylists are listed.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedArtist.certificates.map(cert => (
                    <div 
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md cursor-pointer transition-all group p-4 flex gap-4 items-center"
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative">
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] text-white bg-black/70 px-2 py-0.5 rounded">View</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-bold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Artbook Verified Certificate</span>
                        </div>
                        <h4 className="font-bold text-stone-900 text-sm mt-0.5 truncate">
                          {cert.title}
                        </h4>
                        <div className="text-xs text-stone-500 mt-0.5">
                          Issued by: <strong className="text-stone-700">{cert.issuer}</strong>
                        </div>
                        <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-2">
                          <span>Year: {cert.year}</span>
                          {cert.credentialId && (
                            <>
                              <span>•</span>
                              <span className="font-mono bg-stone-100 px-1.5 py-0.2 rounded text-stone-600">
                                ID: {cert.credentialId}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CLIENT REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                
                {/* Rating Overview */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-amber-900 font-mono">
                        {selectedArtist.rating.toFixed(1)}
                      </span>
                      <div className="flex items-center text-amber-500 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-stone-900">Overall Client Satisfaction</h4>
                      <p className="text-xs text-stone-500">Based on {selectedArtist.reviewCount} verified client bookings</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-emerald-700 font-semibold">
                        <span>✓ 100% On-time Arrival</span>
                        <span>•</span>
                        <span>✓ Professional Hygiene</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openReviewModal(selectedArtist)}
                    className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Review Cards List */}
                <div className="space-y-3">
                  {selectedArtist.reviews.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-stone-200">
                      <Star className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                      <p className="text-sm font-bold text-stone-700">No reviews yet for this artist</p>
                      <p className="text-xs text-stone-400 mt-1">Be the first client to book and review {selectedArtist.name}!</p>
                    </div>
                  ) : (
                    selectedArtist.reviews.map(rev => (
                      <div key={rev.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img 
                              src={rev.userAvatar} 
                              alt={rev.userName} 
                              className="w-9 h-9 rounded-full object-cover ring-1 ring-stone-200" 
                            />
                            <div>
                              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                <span>{rev.userName}</span>
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                                  Verified Client
                                </span>
                              </div>
                              <div className="text-[10px] text-stone-400">
                                {rev.serviceUsed} • {rev.date}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                          "{rev.comment}"
                        </p>

                        {rev.photos && rev.photos.length > 0 && (
                          <div className="flex gap-2 pt-1">
                            {rev.photos.map((ph, idx) => (
                              <img 
                                key={idx} 
                                src={ph} 
                                alt="Review attachment" 
                                className="w-14 h-14 rounded-xl object-cover border border-stone-200"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Modal Bottom Sticky CTA Bar */}
        <div className="bg-white border-t border-stone-200 p-4 px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-stone-900">
              Need custom bridal packages or party bulk discount?
            </div>
            <div className="text-[11px] text-stone-500">
              Send a direct message to {selectedArtist.name} to discuss dates and custom themes.
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* DM Button */}
            <button
              onClick={() => openChatWithArtist(selectedArtist)}
              className="flex-1 sm:flex-none py-3 px-5 bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-xl text-xs sm:text-sm font-bold border border-stone-300/80 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-rose-600" />
              <span>Direct Message (DM)</span>
            </button>

            {/* Instant Book CTA */}
            <button
              onClick={() => openBookingModal(selectedArtist)}
              className="flex-1 sm:flex-none py-3 px-6 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Media Lightbox Viewer */}
        {selectedMedia && (
          <div 
            className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-5 right-5 p-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
              {selectedMedia.type === 'video' ? (
                <video 
                  src={selectedMedia.url} 
                  controls 
                  autoPlay 
                  className="max-h-[75vh] w-full rounded-2xl shadow-2xl bg-black"
                />
              ) : (
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.title} 
                  className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
                />
              )}
              <div className="text-white text-center mt-3">
                <h4 className="font-bold text-base">{selectedMedia.title}</h4>
                <p className="text-xs text-stone-400">{selectedMedia.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Zoom Lightbox */}
        {selectedCert && (
          <div 
            className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSelectedCert(null)}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 p-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-2xl w-full bg-white rounded-3xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Artisan Certificate • Artbook Trust Network</span>
              </div>
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title} 
                className="w-full max-h-[60vh] object-contain rounded-xl border border-stone-200"
              />
              <div className="mt-4 text-left">
                <h3 className="font-bold text-stone-900 text-base">{selectedCert.title}</h3>
                <p className="text-xs text-stone-600">Issued by: <strong>{selectedCert.issuer}</strong> ({selectedCert.year})</p>
                {selectedCert.credentialId && (
                  <p className="text-xs font-mono text-stone-400 mt-1">Verification Code: {selectedCert.credentialId}</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
