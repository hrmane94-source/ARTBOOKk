import { Artist } from '../types';

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Pooja Rathore',
    email: 'pooja.mehendi@artbook.in',
    phone: '+91 98201 44521',
    tagline: 'Celebrity Rajasthani & Intricate Royal Bridal Henna Artist',
    bio: 'With over 9 years of creating bespoke bridal stories on hands, I specialize in Royal Rajasthani figures, fine portrait mehendi, and Arabic modern fusion. Prepared with 100% natural organic henna guaranteed dark mahogany stain.',
    category: 'Mehendi Designer',
    experienceYears: 9,
    city: 'Jaipur',
    address: 'C-Scheme, Ashok Nagar, Jaipur, Rajasthan',
    avatar: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=1200&auto=format&fit=crop&q=80',
    rating: 4.95,
    reviewCount: 142,
    isVerified: true,
    verifiedDate: '12 Jan 2026',
    badges: ['Artbook Verified Pro', 'Bridal Specialist', 'Top Rated 2026', '100% Organic Henna'],
    startingPrice: 3500,
    completedBookingsCount: 218,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    busyDates: ['2026-10-12', '2026-10-18', '2026-10-24', '2026-10-25', '2026-11-14'],
    pricingPackages: [
      {
        id: 'pkg-m1',
        title: 'Classic Guest & Sider Mehendi',
        price: 1500,
        duration: '2 Hours',
        description: 'Covers up to 5 family members / guests with floral and chic Arabic designs (palm to wrist).',
        features: ['Up to 5 hands covered', 'Organic dark-stain cones', 'Lemon-sugar sealant spray', 'Quick 2-hour completion']
      },
      {
        id: 'pkg-m2',
        title: 'Full Bridal Royal Heritage',
        price: 7500,
        duration: '5 - 6 Hours',
        description: 'Elaborate bridal package: Both hands till elbows (front & back) + Feet till mid-calf with groom portrait & Radha-Krishna motifs.',
        features: ['Elbow length front & back', 'Feet up to mid-calf', 'Custom Dulha-Dulhan portrait story', 'Premium clove-infused organic henna', 'Complimentary touch-up kit'],
        popular: true
      },
      {
        id: 'pkg-m3',
        title: 'Grand Destination Bridal Extravaganza',
        price: 16000,
        duration: 'Full Day Event',
        description: 'Complete package for Destination Weddings: Bride + Mother + 15 close guests with 2 assistant artists.',
        features: ['Main Bridal Henna + 2 Team Assistants', '15+ Guests Covered', 'Unlimited custom motifs', 'Travel assistance available', 'Glitter & Swarovski finish']
      }
    ],
    portfolio: [
      {
        id: 'port-m1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=900&auto=format&fit=crop&q=80',
        title: 'Royal Marwadi Dulhan Henna',
        description: 'Intricate peacock and palanquin storytelling on pure organic henna.',
        categoryTag: 'Bridal Mehendi',
        likes: 384
      },
      {
        id: 'port-m2',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
        title: 'Live Bridal Application Reel',
        description: 'Timelapse of 6-hour bridal henna application in Jaipur palace wedding.',
        categoryTag: 'Timelapse Video',
        likes: 512
      },
      {
        id: 'port-m3',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
        title: 'Arabic Floral & Mandala Fusion',
        description: 'Modern open spaces with dark contrasting shading and bangles.',
        categoryTag: 'Arabic Style',
        likes: 290
      },
      {
        id: 'port-m4',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?w=900&auto=format&fit=crop&q=80',
        title: 'Intricate Feet Bridal Henna',
        description: 'Anklet motif with traditional jaal, lotus work and silver payal.',
        categoryTag: 'Feet Mehendi',
        likes: 198
      }
    ],
    certificates: [
      {
        id: 'cert-m1',
        title: 'Master Henna Artist Certification',
        issuer: 'International Henna Artists Guild (IHAG)',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'IHAG-IND-99420'
      },
      {
        id: 'cert-m2',
        title: 'Gold Trophy - Rajasthan Mehendi Expo',
        issuer: 'State Heritage Craft Council',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'SHCC-EXPO-104'
      }
    ],
    reviews: [
      {
        id: 'rev-m1',
        userName: 'Rhea Singhania',
        userAvatar: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: '28 Sep 2026',
        comment: 'Pooja is an absolute magician! My wedding mehendi was the talk of the entire event. The color developed into a deep maroon within 24 hours. Super polite and patient.',
        serviceUsed: 'Full Bridal Royal Heritage',
        photos: ['https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=500&auto=format&fit=crop&q=80']
      },
      {
        id: 'rev-m2',
        userName: 'Meera Agarwal',
        userAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: '14 Aug 2026',
        comment: 'Very professional, arrived 15 mins before time and handled all 10 bridesmaids with supreme grace and speed. Highly recommended!',
        serviceUsed: 'Classic Guest & Sider Mehendi'
      }
    ]
  },
  {
    id: 'artist-2',
    name: 'Ananya Sharma',
    email: 'ananya.glam@artbook.in',
    phone: '+91 99870 11234',
    tagline: 'Celebrity HD Bridal Makeup & Royal Indian Glow Aesthetician',
    bio: 'Trained at London School of Makeup & Mumbai Film City. Over 7 years of crafting seamless, camera-ready bridal transformations, glass-skin looks, and royal Indian wedding looks using Charlotte Tilbury, MAC, Dior and Huda Beauty.',
    category: 'Bridal Makeup',
    experienceYears: 7,
    city: 'Mumbai',
    address: 'Bandra West, Mumbai, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=80',
    rating: 4.98,
    reviewCount: 189,
    isVerified: true,
    verifiedDate: '04 Feb 2026',
    badges: ['Artbook Verified Pro', 'Celebrity Stylist', 'Luxury Cosmetics', 'Top Rated 2026'],
    startingPrice: 6500,
    completedBookingsCount: 310,
    availabilityDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    busyDates: ['2026-10-15', '2026-10-16', '2026-10-20', '2026-11-20'],
    pricingPackages: [
      {
        id: 'pkg-b1',
        title: 'Cocktail & Sangeet Glam Look',
        price: 6500,
        duration: '2.5 Hours',
        description: 'High-pigment smokey eyes, illuminated dewy skin finish, luxury false lashes and hair setting.',
        features: ['HD Base Application', 'Customized Lashes', 'Hair Styling & Curls', 'Draping assistance included', 'Luxury international brands']
      },
      {
        id: 'pkg-b2',
        title: 'Signature HD Bridal Royal Package',
        price: 18000,
        duration: '4 Hours',
        description: 'Complete 3D HD bridal makeup with waterproof, sweat-resistant technology, advance skin prep, luxury floral hair styling, and jewelry setting.',
        features: ['Airbrush / Ultra HD Foundation', 'Luxury Mink/Silk Lashes', 'Complete Bridal Hairdo + Real Flowers setting', 'Saree / Lehenga Draping & Dupatta Pinning', 'Pre-makeup 24K Gold hydrating facial prep'],
        popular: true
      },
      {
        id: 'pkg-b3',
        title: 'Two-Look Wedding & Reception Combo',
        price: 32000,
        duration: 'Full Day',
        description: 'Morning traditional Muhurtham look + Evening glamorous Reception makeover with on-site touchup artist.',
        features: ['2 Complete Makeup & Hair Makeovers', 'On-venue assistant for photography touchups', 'Premium bridal jewelry pinning & veil adjustment', 'Bridal squad 1 free mini touchup']
      }
    ],
    portfolio: [
      {
        id: 'port-b1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&auto=format&fit=crop&q=80',
        title: 'Royal Indian Bridal Transformation',
        description: 'Classic red bridal lehenga with Kundan mathapatti, nath and flawless HD finish.',
        categoryTag: 'Bridal Makeup',
        likes: 640
      },
      {
        id: 'port-b2',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&auto=format&fit=crop&q=80',
        title: 'Bridal Glam Reel - Royal Heritage Glow',
        description: 'Before & After reveal for destination Udaipur palace wedding.',
        categoryTag: 'Reel / Showcase',
        likes: 890
      },
      {
        id: 'port-b3',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?w=900&auto=format&fit=crop&q=80',
        title: 'Sangeet Shimmer & Pastel Bridal Look',
        description: 'Champagne gold eyeshadow with sculpted dewy skin and soft rose tint.',
        categoryTag: 'Sangeet Look',
        likes: 420
      },
      {
        id: 'port-b4',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&auto=format&fit=crop&q=80',
        title: 'Reception Smokey Glam & Emerald Jewels',
        description: 'Velvet matte lips with bold winged liner and emerald necklace setting.',
        categoryTag: 'Reception Glam',
        likes: 512
      }
    ],
    certificates: [
      {
        id: 'cert-b1',
        title: 'Advanced Bridal Artistry & Airbrush Masterclass',
        issuer: 'London College of Makeup Arts (UK)',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'LCMA-LON-8831'
      },
      {
        id: 'cert-b2',
        title: 'Certified Master Dermat-Safe MUA',
        issuer: 'Cosmetology Association of India',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'CAI-MUM-2024-55'
      }
    ],
    reviews: [
      {
        id: 'rev-b1',
        userName: 'Aakriti Kapoor',
        userAvatar: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: '02 Oct 2026',
        comment: 'Ananya made me feel like royalty! The makeup lasted through all the crying, hugging and dancing for 14 hours straight without creasing. She used top tier products and sanitized everything.',
        serviceUsed: 'Signature HD Bridal Royal Package',
        photos: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&auto=format&fit=crop&q=80']
      }
    ]
  },
  {
    id: 'artist-3',
    name: 'Suresh Kulkarni',
    email: 'suresh.rangoli@artbook.in',
    phone: '+91 94230 88912',
    tagline: 'Master of 3D Illusion, Sanskar Bharti & Grand Flower Floor Murals',
    bio: 'National Award-winning Rangoli artist with 14 years of expertise in mega festival floor art, corporate gala entrances, realistic 3D portrait rangoli, and scented marigold petal mandalas for weddings and Diwali.',
    category: 'Rangoli Artist',
    experienceYears: 14,
    city: 'Pune',
    address: 'Kothrud, Pune, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=1200&auto=format&fit=crop&q=80',
    rating: 4.92,
    reviewCount: 97,
    isVerified: true,
    verifiedDate: '18 Dec 2025',
    badges: ['Artbook Verified Pro', 'National Awardee', '3D Illusion Expert'],
    startingPrice: 2800,
    completedBookingsCount: 165,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    busyDates: ['2026-10-19', '2026-10-20', '2026-11-01'],
    pricingPackages: [
      {
        id: 'pkg-r1',
        title: 'Festive Home Welcome Rangoli (5x5 ft)',
        price: 2800,
        duration: '2 Hours',
        description: 'Vibrant Sanskar Bharti or traditional peacock/floral geometric design with diya lighting layout.',
        features: ['5x5 feet coverage', 'Vibrant organic dry pigments', '12 complimentary brass diyas placement', 'Clean edge finishing']
      },
      {
        id: 'pkg-r2',
        title: 'Grand Wedding Mandap Flower & Color Rangoli',
        price: 8500,
        duration: '4 - 5 Hours',
        description: 'Large 12x12 ft entrance or central courtyard mandala combining fresh rose petals, marigold, jasmine and vibrant color powders.',
        features: ['12x12 feet grand area', 'Fresh exotic floral petals + colored powders', 'Urli water bowl center arrangement', 'Floating candles styling', 'High durability anti-wind fixing spray'],
        popular: true
      },
      {
        id: 'pkg-r3',
        title: 'Hyper-Realistic 3D Portrait / Corporate Logo',
        price: 15000,
        duration: '6 Hours',
        description: 'Museum-grade optical illusion portrait of deity, couple, or brand mascot created purely with fine shaded colored sands.',
        features: ['Custom couple or deity portrait', 'Full HD color blending', 'Photo-worthy centerpiece for wedding stage', 'Preservation coating available']
      }
    ],
    portfolio: [
      {
        id: 'port-r1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=900&auto=format&fit=crop&q=80',
        title: 'Peacock Floral Mandala Rangoli with Diyas',
        description: 'Vibrant multi-color peacock feathers surrounded by radiant geometric petals and oil lamps.',
        categoryTag: 'Traditional Powder',
        likes: 470
      },
      {
        id: 'port-r2',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=900&auto=format&fit=crop&q=80',
        title: 'Sanskar Bharti Speed Freehand Art',
        description: 'Creating symmetrical 8-spoke mandala using 5 fingers simultaneously in real-time.',
        categoryTag: 'Timelapse Reel',
        likes: 720
      },
      {
        id: 'port-r3',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=900&auto=format&fit=crop&q=80',
        title: 'Diwali Courtyard Petal Floating Rangoli',
        description: 'Grand floating flower rangoli with brass urlis and 108 tea-lights.',
        categoryTag: 'Flower Petal Art',
        likes: 315
      }
    ],
    certificates: [
      {
        id: 'cert-r1',
        title: 'State Kalashree Award in Folk Sand Arts',
        issuer: 'Directorate of Cultural Affairs, Maharashtra',
        year: '2021',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'DCA-PUN-KALA-77'
      }
    ],
    reviews: [
      {
        id: 'rev-r1',
        userName: 'Vikram Joshi',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: '20 Sep 2026',
        comment: 'Suresh ji created an unbelievable 10-foot floral rangoli for our housewarming. All our guests were taking selfies with it. Punctual, polite, and pure craftsmanship!',
        serviceUsed: 'Grand Wedding Mandap Flower & Color Rangoli'
      }
    ]
  },
  {
    id: 'artist-4',
    name: 'Kavita Menon',
    email: 'kavita.hair@artbook.in',
    phone: '+91 98450 77610',
    tagline: 'Luxury Bridal Hair Couturier, Crown Braids & Floral Poola Jada',
    bio: 'Certified by Toni&Guy Academy. Specializing in intricate South Indian floral poola jada braids, voluminous Bollywood Hollywood waves, textured messy buns, and bridal extensions.',
    category: 'Hairstylist',
    experienceYears: 8,
    city: 'Bangalore',
    address: 'Indiranagar, Bangalore, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&auto=format&fit=crop&q=80',
    rating: 4.89,
    reviewCount: 114,
    isVerified: true,
    verifiedDate: '29 Jan 2026',
    badges: ['Artbook Verified Pro', 'Toni&Guy Certified', 'Hair Extension Pro'],
    startingPrice: 3800,
    completedBookingsCount: 195,
    availabilityDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pricingPackages: [
      {
        id: 'pkg-h1',
        title: 'Party Waves & Textured Half-Updo',
        price: 3800,
        duration: '1.5 Hours',
        description: 'Glamorous Hollywood waves, bouncy curls or half-tied messy braids with heat protectant and styling spray.',
        features: ['Heat protectant & Shine serum', 'Custom padding for volume', 'Hair accessory placement', 'Long-lasting 12hr hold']
      },
      {
        id: 'pkg-h2',
        title: 'Traditional Royal Bridal Poola Jada / Braids',
        price: 7200,
        duration: '3 Hours',
        description: 'Traditional South Indian bridal long braid with fresh jasmine & rose veni, billa ornaments attachment, or structured regal low bun.',
        features: ['Real 100% human hair extensions included', 'Fresh floral veni & billa pinning', 'Mathapatti / Maang Tikka secure anchoring', 'Anti-frizz humidity sealant'],
        popular: true
      },
      {
        id: 'pkg-h3',
        title: 'Bridal + 3 Family Members Hair Styling Combo',
        price: 14000,
        duration: '4 Hours',
        description: 'Complete hair transformation for the bride plus 3 family members/bridesmaids.',
        features: ['Bridal royal hairdo', '3 family member party hairstyles', 'Extension rentals included', 'Touch-up pins kit']
      }
    ],
    portfolio: [
      {
        id: 'port-h1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&auto=format&fit=crop&q=80',
        title: 'Royal South Indian Long Braid (Poola Jada)',
        description: 'Traditional temple jewelry billas with fresh mallipoo and red rose stringing.',
        categoryTag: 'Traditional Braids',
        likes: 410
      },
      {
        id: 'port-h2',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80',
        title: 'Intricate Rose-Studded Textured Bun with Gajra',
        description: 'Sculpted romantic low bun adorned with baby breath and fresh mini blush roses.',
        categoryTag: 'Bridal Updo',
        likes: 360
      }
    ],
    certificates: [
      {
        id: 'cert-h1',
        title: 'Diploma in Advanced Creative Hairdressing',
        issuer: 'Toni & Guy Hairdressing Academy',
        year: '2021',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'TG-BLR-0982'
      }
    ],
    reviews: [
      {
        id: 'rev-h1',
        userName: 'Deepika Swaminathan',
        userAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: '19 Sep 2026',
        comment: 'Kavita did my muhurtham hair with the poola jada and matha patti. My head did not hurt even once during the 6-hour ritual and it looked sensational in photos!',
        serviceUsed: 'Traditional Royal Bridal Poola Jada / Braids'
      }
    ]
  },
  {
    id: 'artist-5',
    name: 'Zoya Sheikh',
    email: 'zoya.nails@artbook.in',
    phone: '+91 97110 33490',
    tagline: 'Master Nail Couturier, 3D Acrylic Sculpting & Bridal Chrome Sets',
    bio: 'Korean and Russian manicure certified. Creating bespoke press-on and sculpted gel extensions, 3D pearl charms, French ombré, and Swarovski crystal encapsulation for Indian brides.',
    category: 'Nail Artist',
    experienceYears: 6,
    city: 'Delhi NCR',
    address: 'Greater Kailash 1, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1200&auto=format&fit=crop&q=80',
    rating: 4.96,
    reviewCount: 88,
    isVerified: true,
    verifiedDate: '15 Jan 2026',
    badges: ['Artbook Verified Pro', 'Russian Manicure Certified', '3D Nail Art Specialist'],
    startingPrice: 1800,
    completedBookingsCount: 142,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    pricingPackages: [
      {
        id: 'pkg-n1',
        title: 'Russian Gel Manicure with Minimal Art',
        price: 1800,
        duration: '1 Hour',
        description: 'Dry e-file Russian cuticle cleaning + high gloss gel polish overlay with chrome accent or French tips.',
        features: ['Flawless deep cuticle clean', 'Chip-free 4-week formula', '2 accent nail art designs', 'Nourishing organic cuticle oil']
      },
      {
        id: 'pkg-n2',
        title: 'Luxury Bridal Sculpted Acrylic & Crystals Set',
        price: 3800,
        duration: '2.5 Hours',
        description: 'Full set sculpted extensions with milky ombré, genuine Swarovski crystals, 3D hand-carved floral accents and velvet matte/gloss finish.',
        features: ['Custom length & coffin/almond shape', 'Genuine Swarovski crystals', '3D sculpted acrylic flowers', 'Reinforced apex for 5+ weeks wear', 'Complimentary removal kit'],
        popular: true
      }
    ],
    portfolio: [
      {
        id: 'port-n1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=900&auto=format&fit=crop&q=80',
        title: 'Bridal Henna Hand with Gold Leaf Ombré Nails',
        description: 'Intricate mehndi paired with 24k gold foil encapsulated nails and Kundan ring.',
        categoryTag: 'Bridal Nails',
        likes: 280
      },
      {
        id: 'port-n2',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&auto=format&fit=crop&q=80',
        title: 'Emerald Cat Eye Velvet Chrome',
        description: 'Magnetic shimmer shifting under light with crystal accents.',
        categoryTag: 'Cat Eye / Chrome',
        likes: 310
      }
    ],
    certificates: [
      {
        id: 'cert-n1',
        title: 'Master Nail Stylist & Russian E-File Certification',
        issuer: 'Nail Pro Academy Moscow / New Delhi',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'NPA-DEL-5519'
      }
    ],
    reviews: [
      {
        id: 'rev-n1',
        userName: 'Simran Chadha',
        userAvatar: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: '25 Sep 2026',
        comment: 'Zoya is hands down the best nail tech in Delhi! My wedding nails stayed 100% intact even during the honeymoon in Bali. Perfection!',
        serviceUsed: 'Luxury Bridal Sculpted Acrylic & Crystals Set'
      }
    ]
  },
  {
    id: 'artist-6',
    name: 'Rohan Varma',
    email: 'rohan.ink@artbook.in',
    phone: '+91 98922 44109',
    tagline: 'Fine-Line Micro Tattoos, Lord Shiva Trishul & Sacred Mandalas',
    bio: 'Over 10 years of tattooing with medical-grade hygiene, single-use sterilized needles, vegan inks, and customized Indian mythological, Trishul, and Sanskrit mantra concepts.',
    category: 'Tattoo & Body Art',
    experienceYears: 10,
    city: 'Goa',
    address: 'Anjuna Beach Road, North Goa',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&auto=format&fit=crop&q=80',
    rating: 4.94,
    reviewCount: 76,
    isVerified: true,
    verifiedDate: '08 Jan 2026',
    badges: ['Artbook Verified Pro', 'Medical Grade Sterilization', 'Custom Ink Designer'],
    startingPrice: 2500,
    completedBookingsCount: 118,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    pricingPackages: [
      {
        id: 'pkg-t1',
        title: 'Minimal Fine-Line Micro Tattoo (Up to 2x2")',
        price: 2500,
        duration: '1 Hour',
        description: 'Single needle delicate Sanskrit script, Om, celestial symbols, or minimalist geometric motif.',
        features: ['Custom design sketch', 'Medical grade single-use cartridge', 'Vegan imported black ink', 'SecondSkin healing bandage included']
      },
      {
        id: 'pkg-t2',
        title: 'Sacred Mandala & Geometric Custom Piece (5x5")',
        price: 7500,
        duration: '3.5 Hours',
        description: 'Detailed dotwork, sacred geometry, or Trishul/Damru forearm/calf tattoo with fine dot shading.',
        features: ['1-on-1 digital consultation', 'Dotwork & gradient shading', 'Free touch-up within 6 months', 'Comprehensive healing kit'],
        popular: true
      }
    ],
    portfolio: [
      {
        id: 'port-t1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=900&auto=format&fit=crop&q=80',
        title: 'Sacred Geometric Lotus & Sanskrit Mandala',
        description: 'Crisp linework on forearm with micro-stippling gradients.',
        categoryTag: 'Dotwork Tattoo',
        likes: 420
      }
    ],
    certificates: [
      {
        id: 'cert-t1',
        title: 'Certified Master Body Artist & Bloodborne Pathogen Safety',
        issuer: 'Alliance of Professional Tattooists (APT)',
        year: '2020',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'APT-GOA-7712'
      }
    ],
    reviews: [
      {
        id: 'rev-t1',
        userName: 'Aditya Oberoi',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: '10 Sep 2026',
        comment: 'Super hygienic studio, painless fine line work. Rohan explained every healing step clearly. My tattoo healed in just 5 days perfectly!',
        serviceUsed: 'Minimal Fine-Line Micro Tattoo (Up to 2x2")'
      }
    ]
  },
  {
    id: 'artist-7',
    name: 'Divya & Team Decor',
    email: 'divya.decor@artbook.in',
    phone: '+91 98210 99011',
    tagline: 'Bespoke Floral Mandaps, Yellow Marigold Haldi & Royal Wedding Stages',
    bio: 'Crafting dreamscapes with traditional fresh marigold cascades, Rajnigandha, mood lighting, brass urlis, and modern photobooth installations across Gujarat, Rajasthan and Mumbai.',
    category: 'Event & Floral Decor',
    experienceYears: 11,
    city: 'Ahmedabad',
    address: 'SG Highway, Ahmedabad, Gujarat',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80',
    rating: 4.97,
    reviewCount: 65,
    isVerified: true,
    verifiedDate: '20 Jan 2026',
    badges: ['Artbook Verified Pro', 'Luxury Wedding Decorator', 'Eco-Friendly Floral'],
    startingPrice: 15000,
    completedBookingsCount: 89,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pricingPackages: [
      {
        id: 'pkg-d1',
        title: 'Vibrant Haldi & Mehendi Yellow Floral Backdrop',
        price: 15000,
        duration: 'Setup in 4 Hours',
        description: 'Marigold tassels, brass urlis, personalized couple name board, cane furniture seating with cushions for photo sessions.',
        features: ['10x8 ft floral backdrop', '2 brass urlis with floating petals', 'Cane couple chair setup', 'Fairy light accents'],
        popular: true
      },
      {
        id: 'pkg-d2',
        title: 'Grand Royal Floral Mandap & Entry Aisle',
        price: 45000,
        duration: 'Full Day Setup',
        description: 'Complete 4-pillar dome mandap with cascading baby breath, roses, carnations and 8 pillar illuminated walkway.',
        features: ['4-Pillar Luxury Floral Mandap', 'Illuminated carpet aisle', 'Warm ambient focus stage lighting', 'Havan kund floral surround']
      }
    ],
    portfolio: [
      {
        id: 'port-d1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop&q=80',
        title: 'Vibrant Haldi Ceremony Canopy & Urlis',
        description: 'Fresh yellow marigold and lotus hangings with rustic brass pots.',
        categoryTag: 'Haldi Decor',
        likes: 540
      }
    ],
    certificates: [
      {
        id: 'cert-d1',
        title: 'Wedding Planner & Floral Couturier Guild Certified',
        issuer: 'Indian Wedding Designers Association',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'IWDA-AHM-2022-80'
      }
    ],
    reviews: [
      {
        id: 'rev-d1',
        userName: 'Tanvi Shah',
        userAvatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: '18 Sep 2026',
        comment: 'Divya transformed our open terrace into a fairytale Haldi venue! All fresh flowers smelled incredible and the team was super prompt.',
        serviceUsed: 'Vibrant Haldi & Mehendi Yellow Floral Backdrop'
      }
    ]
  },
  {
    id: 'artist-8',
    name: 'Aarav Nair',
    email: 'aarav.calligraphy@artbook.in',
    phone: '+91 99300 22194',
    tagline: 'Luxury Hand-Lettered Sanskrit Slokas, Mirror Art & Golden Leaf Canvases',
    bio: 'Master Calligrapher and Canvas Artist specializing in gold leaf Sanskrit slokas (Mangalyam Tantunanena), customized bridal vow scrolls, vintage mirror welcome boards, and live guest name engraving.',
    category: 'Calligraphy & Canvas',
    experienceYears: 5,
    city: 'Mumbai',
    address: 'Juhu, Mumbai, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    rating: 4.91,
    reviewCount: 52,
    isVerified: true,
    verifiedDate: '22 Feb 2026',
    badges: ['Artbook Verified Pro', 'Gold Leaf Specialist', 'Live Engraver'],
    startingPrice: 2200,
    completedBookingsCount: 78,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    pricingPackages: [
      {
        id: 'pkg-c1',
        title: 'Custom Vintage Mirror Welcome Signboard',
        price: 2200,
        duration: 'Custom Made (2 Days)',
        description: 'Ornate gold framed mirror with hand-lettered Indian couple names, wedding hashtag, and floral border accents.',
        features: ['Ornate antique gold frame included', 'Waterproof permanent white & gold ink', 'Custom typography style', 'Free doorstep delivery in city'],
        popular: true
      },
      {
        id: 'pkg-c2',
        title: 'Gold Leaf Sanskrit Sloka & Vows Keepsake Scroll',
        price: 5500,
        duration: 'Custom Canvas Art',
        description: 'Handmade deckled cotton paper with real 24k gold leaf gilding of wedding vows or sacred slokas, framed in teakwood.',
        features: ['24k Genuine gold leaf gilding', 'Handmade cotton rag paper', 'Solid teakwood glass frame', 'Wax seal stamping']
      }
    ],
    portfolio: [
      {
        id: 'port-c1',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=900&auto=format&fit=crop&q=80',
        title: 'Gilded Sanskrit Sloka on Raw Canvas',
        description: 'Gold leaf illuminating ancient marriage blessing verse.',
        categoryTag: 'Gold Leaf Art',
        likes: 310
      }
    ],
    certificates: [
      {
        id: 'cert-c1',
        title: 'Master of Traditional Copperplate & Modern Brush Calligraphy',
        issuer: 'Calligraphy Society of India',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
        verified: true,
        credentialId: 'CSI-MUM-2023-14'
      }
    ],
    reviews: [
      {
        id: 'rev-c1',
        userName: 'Shruti Vaze',
        userAvatar: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=150&auto=format&fit=crop&q=80',
        rating: 5,
        date: '11 Sep 2026',
        comment: 'The mirror welcome board created by Aarav was a major highlight at our entrance. The calligraphy was pristine and exquisite!',
        serviceUsed: 'Custom Vintage Mirror Welcome Signboard'
      }
    ]
  }
];

export const INITIAL_USER = {
  id: 'user-client-1',
  name: 'Priya Mukherjee',
  email: 'priya.mukherjee@gmail.com',
  phone: '+91 98200 12345',
  role: 'client' as const,
  avatar: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=150&auto=format&fit=crop&q=80',
  city: 'Mumbai'
};
