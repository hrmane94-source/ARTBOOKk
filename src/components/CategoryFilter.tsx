import React from 'react';
import { 
  Sparkles, 
  Palette, 
  Flame, 
  Crown, 
  Scissors, 
  Heart, 
  Feather, 
  Flower2, 
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';

interface CategoryItem {
  id: CategoryType;
  label: string;
  icon: React.ElementType;
  gradient: string;
  description: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'All',
    label: 'All Artists',
    icon: Layers,
    gradient: 'from-amber-600 to-rose-600',
    description: 'Explore full artisan directory'
  },
  {
    id: 'Mehendi Designer',
    label: 'Mehendi Designer',
    icon: Sparkles,
    gradient: 'from-amber-700 to-amber-900',
    description: 'Bridal, Rajasthani, Arabic'
  },
  {
    id: 'Rangoli Artist',
    label: 'Rangoli Artist',
    icon: Palette,
    gradient: 'from-orange-600 to-amber-600',
    description: '3D Floor Art, Sanskar Bharti, Flowers'
  },
  {
    id: 'Bridal Makeup',
    label: 'Bridal Makeup',
    icon: Crown,
    gradient: 'from-rose-600 to-pink-600',
    description: 'HD Glow, Airbrush, Reception Look'
  },
  {
    id: 'Hairstylist',
    label: 'Hairstylist',
    icon: Scissors,
    gradient: 'from-purple-600 to-indigo-600',
    description: 'Bridal Updos, Poola Jada, Hollywood Curls'
  },
  {
    id: 'Nail Artist',
    label: 'Nail Artist',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
    description: '3D Acrylics, Russian Gel, Chrome'
  },
  {
    id: 'Tattoo & Body Art',
    label: 'Tattoo & Body Art',
    icon: Flame,
    gradient: 'from-stone-800 to-stone-950',
    description: 'Fine-Line, Dotwork, Custom Ink'
  },
  {
    id: 'Event & Floral Decor',
    label: 'Event & Floral Decor',
    icon: Flower2,
    gradient: 'from-emerald-600 to-teal-700',
    description: 'Haldi Backdrops, Mandap Flowers'
  },
  {
    id: 'Calligraphy & Canvas',
    label: 'Calligraphy & Canvas',
    icon: Feather,
    gradient: 'from-amber-800 to-stone-800',
    description: 'Gold Leaf Vows, Mirror Signs'
  }
];

export const CategoryFilter: React.FC = () => {
  const { activeCategory, setActiveCategory, artists } = useApp();

  const getArtistCount = (cat: CategoryType) => {
    if (cat === 'All') return artists.length;
    return artists.filter(a => a.category === cat).length;
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-stone-900 flex items-center gap-2">
            <span>Explore Creative Categories</span>
            <span className="text-xs font-sans font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              {artists.length} Verified Talents
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Select a specialty to view curated video reels, price packages, and portfolio galleries.
          </p>
        </div>
      </div>

      {/* Categories Scrollable Bar / Grid */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          const count = getArtistCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`snap-start shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md scale-102 ring-2 ring-rose-400/40'
                  : 'bg-white hover:bg-amber-50/70 text-stone-700 border-stone-200/80 hover:border-amber-300 shadow-2xs'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isSelected 
                  ? 'bg-gradient-to-tr ' + cat.gradient + ' text-white shadow-inner' 
                  : 'bg-stone-100 text-stone-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {count}
                  </span>
                </div>
                <div className={`text-[10px] truncate max-w-[130px] ${
                  isSelected ? 'text-stone-300' : 'text-stone-400'
                }`}>
                  {cat.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
