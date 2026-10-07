import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CalendarCheck, 
  Sparkles, 
  Plus, 
  Video, 
  Image as ImageIcon, 
  Award, 
  Check, 
  Trash2, 
  Clock, 
  DollarSign, 
  MessageSquare,
  Eye,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Share2,
  Calendar as CalendarIcon,
  Ban
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PricingPackage, PortfolioItem, CertificateItem } from '../types';
import { AvailabilityCalendar } from './AvailabilityCalendar';

export const ArtistDashboardModal: React.FC = () => {
  const { 
    currentUser, 
    closeModal, 
    artists, 
    bookings, 
    updateBookingStatus, 
    openChatWithArtist,
    addArtistPortfolioItem,
    addArtistCertificate,
    updateArtistProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'availability' | 'portfolio' | 'packages' | 'certificates'>('bookings');

  // New artwork states
  const [artworkType, setArtworkType] = useState<'photo' | 'video'>('photo');
  const [artworkUrl, setArtworkUrl] = useState('');
  const [artworkTitle, setArtworkTitle] = useState('');
  const [artworkDesc, setArtworkDesc] = useState('');

  // New certificate states
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certYear, setCertYear] = useState('2026');
  const [certImage, setCertImage] = useState('https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80');

  if (!currentUser || currentUser.role !== 'artist') return null;

  const currentArtist = artists.find(a => a.id === currentUser.artistId || a.email === currentUser.email) || artists[0];
  const artistBookings = bookings.filter(b => b.artistId === currentArtist.id || b.artistName === currentArtist.name);

  const totalEarnings = artistBookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);

  const handleAddArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artworkUrl.trim()) return;

    addArtistPortfolioItem(currentArtist.id, {
      type: artworkType,
      url: artworkUrl,
      thumbnail: artworkType === 'video' ? 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80' : undefined,
      title: artworkTitle || 'New Showcase Artwork',
      description: artworkDesc || undefined,
      categoryTag: currentArtist.category
    });

    setArtworkUrl('');
    setArtworkTitle('');
    setArtworkDesc('');
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim() || !certIssuer.trim()) return;

    addArtistCertificate(currentArtist.id, {
      title: certTitle,
      issuer: certIssuer,
      year: certYear,
      image: certImage,
      credentialId: 'ARTBOOK-CERT-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    });

    setCertTitle('');
    setCertIssuer('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div 
        className="bg-stone-50 w-full max-w-5xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-5 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <img 
              src={currentArtist.avatar} 
              alt={currentArtist.name} 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-serif-luxury text-amber-100">
                  {currentArtist.name} Studio
                </h2>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Artbook Verified Pro (₹39 Paid)</span>
                </span>
              </div>
              <p className="text-xs text-stone-300">
                {currentArtist.category} • {currentArtist.city} • Starting @ ₹{currentArtist.startingPrice.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            aria-label="Close studio dashboard"
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-white border-b border-stone-200 text-stone-800 p-4 gap-3 shrink-0">
          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100">
            <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Total Revenue</div>
            <div className="text-lg font-black text-amber-950 font-mono">
              ₹{totalEarnings.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-emerald-600 font-medium">0% Commission kept</div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Bookings</div>
            <div className="text-lg font-black text-stone-900 font-mono">
              {artistBookings.length}
            </div>
            <div className="text-[10px] text-stone-500">{artistBookings.filter(b => b.status === 'pending').length} Pending Requests</div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Rating Score</div>
            <div className="text-lg font-black text-stone-900 font-mono flex items-center gap-1">
              <span>★ {currentArtist.rating.toFixed(1)}</span>
            </div>
            <div className="text-[10px] text-stone-500">{currentArtist.reviewCount} Verified Reviews</div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Live Portfolio</div>
            <div className="text-lg font-black text-stone-900 font-mono">
              {currentArtist.portfolio.length} Items
            </div>
            <div className="text-[10px] text-stone-500">{currentArtist.certificates.length} Academy Certs</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-100 border-b border-stone-200 px-6 flex items-center gap-4 text-xs font-bold shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-2 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'bookings'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Booking Requests ({artistBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('availability')}
            className={`py-3 px-2 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'availability'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <CalendarIcon className="w-4 h-4 text-amber-600" />
            <span>Availability Calendar ({currentArtist.busyDates?.length || 0} Blocked)</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-3 px-2 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'portfolio'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Add Artwork & Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-2 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'packages'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Price Packages ({currentArtist.pricingPackages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`py-3 px-2 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'certificates'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>Certificates</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: BOOKING REQUESTS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {artistBookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-200">
                  <CalendarCheck className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-stone-700">No client bookings yet</p>
                  <p className="text-xs text-stone-400 mt-1">Clients who book your services will appear here for confirmation.</p>
                </div>
              ) : (
                artistBookings.map(bk => (
                  <div key={bk.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">{bk.packageName}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            bk.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            bk.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            bk.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {bk.status}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          Client: <strong>{bk.clientName}</strong> ({bk.clientPhone} • {bk.clientEmail})
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-black text-rose-600 font-mono">
                          ₹{bk.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-stone-400">Date: {bk.eventDate} ({bk.timeSlot})</div>
                      </div>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 space-y-1">
                      <div><strong>Venue:</strong> {bk.eventLocation}</div>
                      {bk.notes && <div><strong>Client Notes:</strong> "{bk.notes}"</div>}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-100">
                      <button
                        onClick={() => openChatWithArtist(currentArtist)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-rose-600" />
                        <span>Chat Client</span>
                      </button>

                      {bk.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(bk.id, 'declined')}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold cursor-pointer"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => updateBookingStatus(bk.id, 'confirmed')}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept & Confirm</span>
                          </button>
                        </>
                      )}

                      {bk.status === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(bk.id, 'completed')}
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Mark Event Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: AVAILABILITY & BUSY DATES CALENDAR */}
          {activeTab === 'availability' && (
            <div className="space-y-6">
              
              {/* Informative Guidance Banner */}
              <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-amber-600" />
                    <span>Realtime Schedule & Availability Manager</span>
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                    Click any day on the calendar to mark yourself as <strong>Busy / Unavailable</strong>. Clients attempting to book appointments on those dates will be warned or asked to pick alternate free slots.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="px-3 py-1.5 bg-rose-100 border border-rose-300 rounded-xl text-xs font-bold text-rose-800 flex items-center gap-1.5">
                    <Ban className="w-3.5 h-3.5 text-rose-600" />
                    <span>{currentArtist.busyDates?.length || 0} Blocked Dates</span>
                  </div>
                </div>
              </div>

              {/* Interactive Calendar Component */}
              <AvailabilityCalendar
                artistId={currentArtist.id}
                isArtistMode={true}
                artistBookings={artistBookings}
              />

              {/* Booking schedule list summary */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  Upcoming Confirmed Client Reserved Dates ({artistBookings.filter(b => b.status === 'confirmed').length})
                </h4>

                {artistBookings.filter(b => b.status === 'confirmed').length === 0 ? (
                  <p className="text-xs text-stone-400">No confirmed bookings yet. Free slots are open for clients.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {artistBookings.filter(b => b.status === 'confirmed').map(b => (
                      <div key={b.id} className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-stone-900">{b.eventDate} ({b.timeSlot})</div>
                          <div className="text-[11px] text-stone-500">{b.clientName} • {b.packageName}</div>
                        </div>
                        <div className="font-mono font-bold text-rose-600">₹{b.price.toLocaleString('en-IN')}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: PORTFOLIO & REELS */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              {/* Form to add artwork */}
              <form onSubmit={handleAddArtwork} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-rose-600" />
                  Upload New Artwork or Video Reel
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Media Type</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setArtworkType('photo')}
                        className={`flex-1 p-2 rounded-xl text-xs font-bold border ${
                          artworkType === 'photo' ? 'bg-stone-900 text-white' : 'bg-stone-50 text-stone-700'
                        }`}
                      >
                        📷 Artwork Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setArtworkType('video')}
                        className={`flex-1 p-2 rounded-xl text-xs font-bold border ${
                          artworkType === 'video' ? 'bg-rose-600 text-white' : 'bg-stone-50 text-stone-700'
                        }`}
                      >
                        🎬 Video Reel (MP4)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Title / Caption *</label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Bridal Feet Henna"
                      value={artworkTitle}
                      onChange={e => setArtworkTitle(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Image or Video URL *</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or https://domain.com/reel.mp4"
                    value={artworkUrl}
                    onChange={e => setArtworkUrl(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Publish to Live Artbook Portfolio
                </button>
              </form>

              {/* Current portfolio list */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-3">Live Portfolio Items ({currentArtist.portfolio.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentArtist.portfolio.map(p => (
                    <div key={p.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
                      <div className="aspect-square bg-stone-100 relative">
                        {p.type === 'video' ? (
                          <div className="w-full h-full bg-stone-900 flex items-center justify-center text-white">
                            <Video className="w-8 h-8 text-rose-500" />
                          </div>
                        ) : (
                          <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                        )}
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded bg-black/70 text-white text-[9px] font-bold uppercase">
                          {p.type}
                        </span>
                      </div>
                      <div className="p-2">
                        <div className="text-xs font-bold text-stone-900 truncate">{p.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PACKAGES & RATES */}
          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentArtist.pricingPackages.map(pkg => (
                  <div key={pkg.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900">{pkg.title}</span>
                      <span className="font-mono font-bold text-rose-600">₹{pkg.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="text-[11px] text-stone-500">Duration: {pkg.duration}</div>
                    <p className="text-xs text-stone-600">{pkg.description}</p>
                    <div className="text-[10px] text-stone-400">
                      Features: {pkg.features.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <form onSubmit={handleAddCert} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  Add Academy Certificate / Award
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Certificate Title"
                    value={certTitle}
                    onChange={e => setCertTitle(e.target.value)}
                    className="p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Issuing Academy / Board"
                    value={certIssuer}
                    onChange={e => setCertIssuer(e.target.value)}
                    className="p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g. 2026)"
                    value={certYear}
                    onChange={e => setCertYear(e.target.value)}
                    className="p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Certificate
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentArtist.certificates.map(c => (
                  <div key={c.id} className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center gap-3 shadow-2xs">
                    <img src={c.image} alt={c.title} className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-900">{c.title}</div>
                      <div className="text-[11px] text-stone-500">{c.issuer} ({c.year})</div>
                      <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Artbook Verified</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
