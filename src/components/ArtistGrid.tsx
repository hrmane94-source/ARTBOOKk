import React from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  ShieldCheck, 
  Star, 
  ArrowUpDown, 
  Search,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ArtistCard } from './ArtistCard';

export const ArtistGrid: React.FC = () => {
  const { 
    artists, 
    activeCategory, 
    searchQuery, 
    setSearchQuery,
    selectedCity, 
    minRating, 
    setMinRating, 
    maxPrice, 
    setMaxPrice, 
    onlyVerified, 
    setOnlyVerified,
    sortBy,
    setSortBy,
    setActiveCategory,
    setSelectedCity
  } = useApp();

  // Filter pipeline
  const filteredArtists = artists.filter(artist => {
    // 1. Category filter
    if (activeCategory !== 'All' && artist.category !== activeCategory) {
      return false;
    }

    // 2. City filter
    if (selectedCity !== 'All Cities' && !artist.city.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }

    // 3. Search query (name, category, tagline, city, keywords)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = artist.name.toLowerCase().includes(q);
      const matchCategory = artist.category.toLowerCase().includes(q);
      const matchTagline = artist.tagline.toLowerCase().includes(q);
      const matchCity = artist.city.toLowerCase().includes(q);
      const matchPackage = artist.pricingPackages.some(p => 
        p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
      if (!matchName && !matchCategory && !matchTagline && !matchCity && !matchPackage) {
        return false;
      }
    }

    // 4. Rating filter
    if (minRating > 0 && artist.rating < minRating) {
      return false;
    }

    // 5. Price filter
    if (maxPrice < 50000 && artist.startingPrice > maxPrice) {
      return false;
    }

    // 6. Verified filter
    if (onlyVerified && !artist.isVerified) {
      return false;
    }

    return true;
  });

  // Sort pipeline
  const sortedArtists = [...filteredArtists].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'price_low') {
      return a.startingPrice - b.startingPrice;
    }
    if (sortBy === 'price_high') {
      return b.startingPrice - a.startingPrice;
    }
    if (sortBy === 'experience') {
      return b.experienceYears - a.experienceYears;
    }
    // Default 'featured'
    return (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0);
  });

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSelectedCity('All Cities');
    setMinRating(0);
    setMaxPrice(50000);
    setOnlyVerified(false);
    setSortBy('featured');
  };

  return (
    <div id="explore-artists" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Filter and Sorting Control Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        
        {/* Left Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          
          {/* Min Rating dropdown */}
          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl font-medium text-stone-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <select
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
              aria-label="Filter by minimum rating"
              className="bg-transparent outline-none cursor-pointer pr-1 font-semibold text-stone-800"
            >
              <option value="0">All Ratings</option>
              <option value="4.9">⭐ 4.9+ Top Rated</option>
              <option value="4.8">⭐ 4.8+ Stars</option>
              <option value="4.5">⭐ 4.5+ Stars</option>
            </select>
          </div>

          {/* Max Price dropdown */}
          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl font-medium text-stone-700">
            <span className="font-bold text-stone-500 font-mono">₹</span>
            <select
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              aria-label="Filter by maximum price"
              className="bg-transparent outline-none cursor-pointer pr-1 font-semibold text-stone-800"
            >
              <option value="50000">Any Budget</option>
              <option value="2500">Under ₹2,500</option>
              <option value="5000">Under ₹5,000</option>
              <option value="10000">Under ₹10,000</option>
              <option value="20000">Under ₹20,000</option>
            </select>
          </div>

          {/* Verified Only Pill */}
          <button
            onClick={() => setOnlyVerified(!onlyVerified)}
            className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              onlyVerified
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${onlyVerified ? 'text-amber-600' : 'text-stone-400'}`} />
            <span>₹39 Verified Pro Only</span>
          </button>

          {/* Active filter count / Reset */}
          {(activeCategory !== 'All' || searchQuery || selectedCity !== 'All Cities' || minRating > 0 || maxPrice < 50000 || onlyVerified) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1 px-2 py-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

        </div>

        {/* Right Sort Control */}
        <div className="flex items-center gap-2 justify-end text-xs">
          <span className="text-stone-500 font-medium hidden sm:inline flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            aria-label="Sort artists by"
            className="bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-stone-800 px-3 py-1.5 rounded-xl font-bold outline-none cursor-pointer"
          >
            <option value="featured">Featured Artisans</option>
            <option value="rating">Highest Rated (⭐ 5.0)</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="experience">Most Experienced</option>
          </select>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-stone-800">
          Showing <span className="text-rose-600 font-black">{sortedArtists.length}</span> verified artist{sortedArtists.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && <span> in <span className="text-stone-900 font-serif-luxury">{activeCategory}</span></span>}
          {selectedCity !== 'All Cities' && <span> • {selectedCity}</span>}
        </div>
      </div>

      {/* Artist Cards Grid */}
      {sortedArtists.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900 font-serif-luxury">
            No artists match your current filters
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your budget, selecting another category or city, or resetting all filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 cursor-pointer transition-colors inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}

    </div>
  );
};
