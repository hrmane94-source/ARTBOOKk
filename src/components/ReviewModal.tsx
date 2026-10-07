import React, { useState } from 'react';
import { X, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReviewModal: React.FC = () => {
  const { selectedArtist, closeModal, addReview, currentUser } = useApp();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [serviceUsed, setServiceUsed] = useState(
    selectedArtist?.pricingPackages[0]?.title || 'Bridal Service'
  );
  const [photoUrl, setPhotoUrl] = useState('');

  if (!selectedArtist) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview(selectedArtist.id, {
      userName: currentUser?.name || 'Verified Client',
      userAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating,
      comment,
      serviceUsed,
      photos: photoUrl.trim() ? [photoUrl.trim()] : undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          aria-label="Close review dialog"
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <img 
            src={selectedArtist.avatar} 
            alt={selectedArtist.name} 
            className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400"
          />
          <div>
            <h3 className="font-bold text-base font-serif-luxury text-stone-900">
              Review {selectedArtist.name}
            </h3>
            <p className="text-xs text-stone-500">{selectedArtist.category}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating Picker */}
          <div className="text-center py-2 bg-amber-50/60 rounded-2xl border border-amber-100">
            <div className="text-xs font-bold text-stone-700 mb-1.5">Rate Your Experience</div>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-stone-300'
                    }`} 
                  />
                </button>
              ))}
            </div>
            <div className="text-xs font-bold text-amber-900 mt-1">
              {rating === 5 ? '⭐⭐⭐⭐⭐ Exceptional (5.0)' :
               rating === 4 ? '⭐⭐⭐⭐ Great (4.0)' :
               rating === 3 ? '⭐⭐⭐ Good (3.0)' : '⭐⭐ Fair (2.0)'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Service Package Booked</label>
            <select
              value={serviceUsed}
              onChange={e => setServiceUsed(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold"
            >
              {selectedArtist.pricingPackages.map(pkg => (
                <option key={pkg.id} value={pkg.title}>{pkg.title} (₹{pkg.price})</option>
              ))}
              <option value="Custom Bridal Package">Custom Bridal Package</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Your Detailed Review *</label>
            <textarea
              rows={3}
              placeholder="Describe punctuality, color stain, makeup longevity, behavior, and artistry..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none focus:bg-white resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Optional Finished Artwork Photo URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... (Photo of mehendi / makeup)"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            Submit Verified Review
          </button>
        </form>
      </div>
    </div>
  );
};
