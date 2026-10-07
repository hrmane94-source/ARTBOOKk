import React, { useState } from 'react';
import { 
  X, 
  CalendarCheck, 
  Heart, 
  MessageSquare, 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Trash2,
  Eye,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UserDashboardModal: React.FC = () => {
  const { 
    currentUser, 
    closeModal, 
    bookings, 
    savedArtistIds, 
    artists, 
    openArtistDetail, 
    openChatWithArtist, 
    openReviewModal, 
    toggleSaveArtist 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'saved'>('bookings');

  if (!currentUser) return null;

  const userBookings = bookings.filter(b => b.clientId === currentUser.id || b.clientEmail === currentUser.email);
  const savedArtists = artists.filter(a => savedArtistIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div 
        className="bg-stone-50 w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-5 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-11 h-11 rounded-full object-cover ring-2 ring-rose-400"
            />
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif-luxury text-amber-100">
                {currentUser.name}'s Bookings & Favorites
              </h2>
              <p className="text-xs text-stone-300">
                {currentUser.email} • Client Member (100% Free Account)
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            aria-label="Close client dashboard"
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-stone-100 border-b border-stone-200 px-6 flex items-center gap-4 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-2 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>My Bookings ({userBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-2 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Saved Artists ({savedArtists.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: MY BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {userBookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-200">
                  <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-stone-700">No bookings yet</p>
                  <p className="text-xs text-stone-400 mt-1">Explore our verified artists and book your slot!</p>
                </div>
              ) : (
                userBookings.map(bk => {
                  const targetArt = artists.find(a => a.id === bk.artistId);

                  return (
                    <div key={bk.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={bk.artistAvatar} 
                            alt={bk.artistName} 
                            className="w-12 h-12 rounded-xl object-cover ring-1 ring-amber-400 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-stone-900 text-sm">{bk.artistName}</h3>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                bk.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                bk.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                bk.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-600'
                              }`}>
                                {bk.status}
                              </span>
                            </div>
                            <div className="text-xs text-rose-600 font-semibold mt-0.5">{bk.packageName}</div>
                            <div className="text-[11px] text-stone-400">{bk.artistCategory}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-black text-stone-900 font-mono">
                            ₹{bk.price.toLocaleString('en-IN')}
                          </div>
                          <div className="text-xs text-stone-500 font-medium">
                            {bk.eventDate} • {bk.timeSlot}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>Venue: {bk.eventLocation}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-100">
                        {targetArt && (
                          <>
                            <button
                              onClick={() => openChatWithArtist(targetArt)}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-rose-600" />
                              <span>Chat Artist</span>
                            </button>

                            <button
                              onClick={() => openReviewModal(targetArt)}
                              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Star className="w-3.5 h-3.5 fill-stone-950" />
                              <span>Rate & Review</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: SAVED ARTISTS */}
          {activeTab === 'saved' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedArtists.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-dashed border-stone-200">
                  <Heart className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-stone-700">No saved artists</p>
                  <p className="text-xs text-stone-400 mt-1">Click the heart icon on any artist to save for later.</p>
                </div>
              ) : (
                savedArtists.map(art => (
                  <div key={art.id} className="bg-white p-4 rounded-2xl border border-stone-200 flex gap-3 shadow-2xs">
                    <img 
                      src={art.avatar} 
                      alt={art.name} 
                      className="w-16 h-16 rounded-xl object-cover ring-1 ring-amber-400 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-stone-900 truncate">{art.name}</h4>
                        <button
                          onClick={() => toggleSaveArtist(art.id)}
                          aria-label={`Remove ${art.name} from favorites`}
                          className="text-rose-500 hover:text-rose-700"
                        >
                          <Heart className="w-4 h-4 fill-rose-500" />
                        </button>
                      </div>
                      <div className="text-xs text-rose-600 font-semibold">{art.category}</div>
                      <div className="text-xs font-bold text-stone-800 mt-1">Starts @ ₹{art.startingPrice.toLocaleString('en-IN')}</div>
                      
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => openArtistDetail(art)}
                          className="px-2.5 py-1 bg-stone-900 text-white rounded-lg text-[11px] font-bold"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openChatWithArtist(art)}
                          className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg text-[11px] font-bold"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
