import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  Artist, 
  User, 
  Booking, 
  ChatMessage, 
  Conversation, 
  CategoryType, 
  PricingPackage, 
  PortfolioItem, 
  CertificateItem, 
  ReviewItem 
} from '../types';
import { INITIAL_ARTISTS, INITIAL_USER } from '../data/mockArtists';

interface AppContextType {
  currentUser: User | null;
  artists: Artist[];
  bookings: Booking[];
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  savedArtistIds: string[];
  
  // Filter states
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  onlyVerified: boolean;
  setOnlyVerified: (v: boolean) => void;
  sortBy: 'featured' | 'rating' | 'price_low' | 'price_high' | 'experience';
  setSortBy: (s: 'featured' | 'rating' | 'price_low' | 'price_high' | 'experience') => void;

  // Modals & Navigation state
  selectedArtist: Artist | null;
  selectedPackage: PricingPackage | null;
  activeModal: string | null;
  activeChatId: string | null;
  
  // Actions
  openArtistDetail: (artist: Artist) => void;
  closeModal: () => void;
  openBookingModal: (artist: Artist, pkg?: PricingPackage) => void;
  openChatWithArtist: (artist: Artist) => void;
  openChatById: (convId: string) => void;
  openLoginModal: (defaultRole?: 'client' | 'artist') => void;
  openRegisterArtistModal: () => void;
  openUserDashboard: () => void;
  openArtistDashboard: () => void;
  openReviewModal: (artist: Artist) => void;

  // Business logic
  login: (user: User) => void;
  logout: () => void;
  registerClient: (name: string, email: string, phone: string, city: string) => void;
  verifyAndRegisterArtist: (artistData: Partial<Artist>, paymentReference: string) => Artist;
  toggleSaveArtist: (artistId: string) => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  sendMessage: (convId: string, text: string, attachmentUrl?: string, attachmentType?: 'image' | 'video') => void;
  addReview: (artistId: string, review: Omit<ReviewItem, 'id' | 'date'>) => void;
  updateArtistProfile: (artistId: string, updates: Partial<Artist>) => void;
  addArtistPortfolioItem: (artistId: string, item: Omit<PortfolioItem, 'id' | 'likes'>) => void;
  addArtistCertificate: (artistId: string, cert: Omit<CertificateItem, 'id' | 'verified'>) => void;
  toggleArtistBusyDate: (artistId: string, dateStr: string) => void;
  clearArtistBusyDates: (artistId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Persistence state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('artbook_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [artists, setArtists] = useState<Artist[]>(() => {
    const saved = localStorage.getItem('artbook_artists_v2');
    return saved ? JSON.parse(saved) : INITIAL_ARTISTS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('artbook_bookings');
    if (saved) return JSON.parse(saved);
    // Initial sample booking
    return [
      {
        id: 'bk-demo-1',
        artistId: 'artist-2',
        artistName: 'Ananya Sharma',
        artistAvatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&auto=format&fit=crop&q=80',
        artistCategory: 'Bridal Makeup',
        clientId: 'user-client-1',
        clientName: 'Priya Mukherjee',
        clientEmail: 'priya.mukherjee@gmail.com',
        clientPhone: '+91 98200 12345',
        servicePackageId: 'pkg-b2',
        packageName: 'Signature HD Bridal Royal Package',
        price: 18000,
        eventDate: '2026-11-20',
        timeSlot: '10:00 AM - 02:00 PM',
        eventLocation: 'Grand Hyatt, Santacruz East, Mumbai',
        notes: 'Pre-wedding photoshoot and traditional bridal muhurtham look.',
        status: 'confirmed',
        createdAt: '2026-10-01T10:00:00Z',
        paymentStatus: 'advance_paid'
      }
    ];
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('artbook_convs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'conv-artist-2',
        artistId: 'artist-2',
        artistName: 'Ananya Sharma',
        artistAvatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&auto=format&fit=crop&q=80',
        artistCategory: 'Bridal Makeup',
        clientId: 'user-client-1',
        clientName: 'Priya Mukherjee',
        clientAvatar: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=150&auto=format&fit=crop&q=80',
        lastMessage: 'I have confirmed your 20th Nov bridal slot! Excited to work together.',
        lastMessageTime: '10:45 AM',
        unreadCount: 0
      }
    ];
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem('artbook_messages');
    if (saved) return JSON.parse(saved);
    return {
      'conv-artist-2': [
        {
          id: 'msg-1',
          conversationId: 'conv-artist-2',
          senderId: 'user-client-1',
          senderRole: 'client',
          senderName: 'Priya Mukherjee',
          senderAvatar: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=150&auto=format&fit=crop&q=80',
          text: 'Hello Ananya! I love your HD bridal glow looks. Are you available on 20th November in Mumbai?',
          timestamp: '10:30 AM',
          bookingInquiry: {
            packageName: 'Signature HD Bridal Royal Package',
            date: '20 Nov 2026',
            price: 18000
          }
        },
        {
          id: 'msg-2',
          conversationId: 'conv-artist-2',
          senderId: 'artist-2',
          senderRole: 'artist',
          senderName: 'Ananya Sharma',
          senderAvatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&auto=format&fit=crop&q=80',
          text: 'Hi Priya! Yes, I have a morning slot available for that date. I have confirmed your 20th Nov bridal slot! Excited to work together.',
          timestamp: '10:45 AM'
        }
      ]
    };
  });

  const [savedArtistIds, setSavedArtistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('artbook_saved');
    return saved ? JSON.parse(saved) : ['artist-1', 'artist-2'];
  });

  // Filter states
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price_low' | 'price_high' | 'experience'>('featured');

  // Modal states
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('artbook_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('artbook_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('artbook_artists_v2', JSON.stringify(artists));
  }, [artists]);

  useEffect(() => {
    localStorage.setItem('artbook_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('artbook_convs', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('artbook_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('artbook_saved', JSON.stringify(savedArtistIds));
  }, [savedArtistIds]);

  // Actions
  const openArtistDetail = (artist: Artist) => {
    setSelectedArtist(artist);
    setActiveModal('artist-detail');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const openBookingModal = (artist: Artist, pkg?: PricingPackage) => {
    setSelectedArtist(artist);
    setSelectedPackage(pkg || artist.pricingPackages[0] || null);
    setActiveModal('booking');
  };

  const openChatWithArtist = (artist: Artist) => {
    if (!currentUser) {
      setActiveModal('login');
      return;
    }
    
    // Find or create conversation
    const convId = `conv-${artist.id}`;
    const existing = conversations.find(c => c.id === convId);
    
    if (!existing) {
      const newConv: Conversation = {
        id: convId,
        artistId: artist.id,
        artistName: artist.name,
        artistAvatar: artist.avatar,
        artistCategory: artist.category,
        clientId: currentUser.id,
        clientName: currentUser.name,
        clientAvatar: currentUser.avatar,
        lastMessage: `Started conversation with ${artist.name}`,
        lastMessageTime: 'Just now',
        unreadCount: 0
      };
      setConversations(prev => [newConv, ...prev]);
      
      if (!messages[convId]) {
        const welcomeMsg: ChatMessage = {
          id: 'msg-welcome-' + Date.now(),
          conversationId: convId,
          senderId: artist.id,
          senderRole: 'artist',
          senderName: artist.name,
          senderAvatar: artist.avatar,
          text: `Namaste! I'm ${artist.name} (${artist.category}). Thank you for checking my Artbook portfolio. How can I assist you with your upcoming occasion?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => ({ ...prev, [convId]: [welcomeMsg] }));
      }
    }
    
    setActiveChatId(convId);
    setSelectedArtist(artist);
    setActiveModal('chat');
  };

  const openChatById = (convId: string) => {
    const conv = conversations.find(c => c.id === convId);
    if (conv) {
      const art = artists.find(a => a.id === conv.artistId);
      if (art) setSelectedArtist(art);
      setActiveChatId(convId);
      setActiveModal('chat');
    }
  };

  const openLoginModal = (defaultRole: 'client' | 'artist' = 'client') => {
    setActiveModal(`login-${defaultRole}`);
  };

  const openRegisterArtistModal = () => {
    setActiveModal('register-artist');
  };

  const openUserDashboard = () => {
    setActiveModal('user-dashboard');
  };

  const openArtistDashboard = () => {
    setActiveModal('artist-dashboard');
  };

  const openReviewModal = (artist: Artist) => {
    setSelectedArtist(artist);
    setActiveModal('review');
  };

  const login = (user: User) => {
    setCurrentUser(user);
    closeModal();
  };

  const logout = () => {
    setCurrentUser(null);
    closeModal();
  };

  const registerClient = (name: string, email: string, phone: string, city: string) => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone,
      city: city || 'Mumbai',
      role: 'client',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
    };
    setCurrentUser(newUser);
    closeModal();
  };

  // Artist registration with ₹39 verification payment
  const verifyAndRegisterArtist = (artistData: Partial<Artist>, paymentReference: string): Artist => {
    const newArtistId = 'artist-' + Date.now();
    const newArtist: Artist = {
      id: newArtistId,
      name: artistData.name || 'Artist Name',
      email: artistData.email || 'artist@artbook.in',
      phone: artistData.phone || '+91 99999 00000',
      tagline: artistData.tagline || 'Professional Creative Artisan',
      bio: artistData.bio || 'Verified Artbook Professional Artist delivering creative excellence.',
      category: artistData.category || 'Mehendi Designer',
      experienceYears: artistData.experienceYears || 3,
      city: artistData.city || 'Mumbai',
      address: artistData.address || 'Studio Artbook, India',
      avatar: artistData.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
      coverImage: artistData.coverImage || 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=1200&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewCount: 0,
      isVerified: true, // ₹39 fee paid
      verifiedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      badges: ['Artbook Verified Pro', '₹39 Verified Member', 'New Talent 2026'],
      startingPrice: artistData.startingPrice || 2000,
      completedBookingsCount: 0,
      availabilityDays: artistData.availabilityDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      pricingPackages: artistData.pricingPackages && artistData.pricingPackages.length > 0 ? artistData.pricingPackages : [
        {
          id: 'pkg-init-1',
          title: 'Standard Service Package',
          price: artistData.startingPrice || 2000,
          duration: '2 Hours',
          description: 'Complete standard artisanal session with quality materials and professional finish.',
          features: ['Professional consultation', 'Standard materials included', 'Doorstep service', 'Touchup guarantee']
        }
      ],
      portfolio: artistData.portfolio || [
        {
          id: 'p-init-1',
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=900&auto=format&fit=crop&q=80',
          title: 'Artbook Portfolio Premiere',
          categoryTag: artistData.category || 'Artwork',
          likes: 24
        }
      ],
      certificates: artistData.certificates || [
        {
          id: 'cert-init-1',
          title: 'Artbook Verified Professional Membership',
          issuer: 'Artbook Artisan Verification Board',
          year: '2026',
          image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
          verified: true,
          credentialId: `ARTBOOK-VERIFIED-${paymentReference.substring(0, 8).toUpperCase()}`
        }
      ],
      reviews: []
    };

    // Add to artists list
    setArtists(prev => [newArtist, ...prev]);

    // Create and login as artist user
    const artistUser: User = {
      id: 'user-artist-' + Date.now(),
      name: newArtist.name,
      email: newArtist.email,
      phone: newArtist.phone,
      role: 'artist',
      avatar: newArtist.avatar,
      city: newArtist.city,
      artistId: newArtist.id
    };
    setCurrentUser(artistUser);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore if confetti fails
    }

    return newArtist;
  };

  const toggleSaveArtist = (artistId: string) => {
    setSavedArtistIds(prev => 
      prev.includes(artistId) 
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId]
    );
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: 'bk-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'pending'
    };

    setBookings(prev => [newBooking, ...prev]);

    // Automatically send an in-app inquiry chat message to the artist
    const convId = `conv-${bookingData.artistId}`;
    const artistObj = artists.find(a => a.id === bookingData.artistId);
    
    // Add message
    const inquiryMsg: ChatMessage = {
      id: 'msg-bk-' + Date.now(),
      conversationId: convId,
      senderId: bookingData.clientId,
      senderRole: 'client',
      senderName: bookingData.clientName,
      senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      text: `Hi! I have requested a booking for "${bookingData.packageName}" on ${bookingData.eventDate} (${bookingData.timeSlot}) at ${bookingData.eventLocation}. Total: ₹${bookingData.price.toLocaleString('en-IN')}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bookingInquiry: {
        packageName: bookingData.packageName,
        date: bookingData.eventDate,
        price: bookingData.price
      }
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), inquiryMsg]
    }));

    // Update or create conversation summary
    setConversations(prev => {
      const exists = prev.find(c => c.id === convId);
      if (exists) {
        return prev.map(c => c.id === convId ? {
          ...c,
          lastMessage: `Booking requested for ${bookingData.eventDate}`,
          lastMessageTime: 'Just now'
        } : c);
      } else {
        return [{
          id: convId,
          artistId: bookingData.artistId,
          artistName: bookingData.artistName,
          artistAvatar: bookingData.artistAvatar,
          artistCategory: bookingData.artistCategory,
          clientId: bookingData.clientId,
          clientName: bookingData.clientName,
          clientAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          lastMessage: `Booking requested for ${bookingData.eventDate}`,
          lastMessageTime: 'Just now',
          unreadCount: 0
        }, ...prev];
      }
    });

    // Simulate smart artist auto-reply after 1.8s
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: 'msg-reply-' + Date.now(),
        conversationId: convId,
        senderId: bookingData.artistId,
        senderRole: 'artist',
        senderName: bookingData.artistName,
        senderAvatar: bookingData.artistAvatar,
        text: `Thank you for your booking request, ${bookingData.clientName}! I have received the details for ${bookingData.eventDate}. I'm reviewing my calendar and will confirm shortly. Feel free to share any reference photos or special requests here!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [convId]: [...(prev[convId] || []), replyMsg]
      }));

      setConversations(prev => prev.map(c => c.id === convId ? {
        ...c,
        lastMessage: replyMsg.text.substring(0, 50) + '...',
        lastMessageTime: replyMsg.timestamp
      } : c));
    }, 1800);

    // Trigger celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const sendMessage = (convId: string, text: string, attachmentUrl?: string, attachmentType?: 'image' | 'video') => {
    if (!text.trim() && !attachmentUrl) return;

    const conv = conversations.find(c => c.id === convId);
    const isClientSender = currentUser?.role !== 'artist';

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      conversationId: convId,
      senderId: currentUser?.id || 'guest',
      senderRole: isClientSender ? 'client' : 'artist',
      senderName: currentUser?.name || 'Guest User',
      senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachmentUrl,
      attachmentType
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg]
    }));

    setConversations(prev => prev.map(c => c.id === convId ? {
      ...c,
      lastMessage: text || (attachmentType === 'image' ? '📷 Photo attached' : '🎥 Video shared'),
      lastMessageTime: newMsg.timestamp
    } : c));

    // If client sent a message and recipient is mock artist, simulate an authentic artist response
    if (isClientSender && conv) {
      setTimeout(() => {
        const simulatedResponses = [
          `Thanks for reaching out! Yes, I specialize in custom designs tailored to your outfit and event mood. Would you like me to share a few sample designs?`,
          `Absolutely! I carry all required professional equipment, sanitized tools, and organic materials. What venue location do you have in mind?`,
          `Sounds wonderful! I have marked your inquiry. You can click 'Book Now' on my profile whenever you are ready to reserve the slot with an advance token!`,
          `I would love to be part of your special day. Do you have any color theme or references you'd like me to match?`
        ];
        const randomReply = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
        
        const autoReply: ChatMessage = {
          id: 'msg-auto-' + Date.now(),
          conversationId: convId,
          senderId: conv.artistId,
          senderRole: 'artist',
          senderName: conv.artistName,
          senderAvatar: conv.artistAvatar,
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => ({
          ...prev,
          [convId]: [...(prev[convId] || []), autoReply]
        }));

        setConversations(prev => prev.map(c => c.id === convId ? {
          ...c,
          lastMessage: autoReply.text.substring(0, 45) + '...',
          lastMessageTime: autoReply.timestamp
        } : c));
      }, 1500);
    }
  };

  const addReview = (artistId: string, reviewData: Omit<ReviewItem, 'id' | 'date'>) => {
    const newRev: ReviewItem = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: 'Today'
    };

    setArtists(prev => prev.map(artist => {
      if (artist.id === artistId) {
        const updatedReviews = [newRev, ...artist.reviews];
        const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const avg = Number((totalRating / updatedReviews.length).toFixed(2));
        return {
          ...artist,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: avg
        };
      }
      return artist;
    }));

    closeModal();
  };

  const updateArtistProfile = (artistId: string, updates: Partial<Artist>) => {
    setArtists(prev => prev.map(a => a.id === artistId ? { ...a, ...updates } : a));
  };

  const addArtistPortfolioItem = (artistId: string, item: Omit<PortfolioItem, 'id' | 'likes'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: 'port-' + Date.now(),
      likes: 1
    };

    setArtists(prev => prev.map(a => {
      if (a.id === artistId) {
        return {
          ...a,
          portfolio: [newItem, ...a.portfolio]
        };
      }
      return a;
    }));
  };

  const addArtistCertificate = (artistId: string, cert: Omit<CertificateItem, 'id' | 'verified'>) => {
    const newCert: CertificateItem = {
      ...cert,
      id: 'cert-' + Date.now(),
      verified: true
    };

    setArtists(prev => prev.map(a => {
      if (a.id === artistId) {
        return {
          ...a,
          certificates: [newCert, ...a.certificates]
        };
      }
      return a;
    }));
  };

  const toggleArtistBusyDate = (artistId: string, dateStr: string) => {
    setArtists(prev => prev.map(a => {
      if (a.id === artistId) {
        const currentBusy = a.busyDates || [];
        const isBusy = currentBusy.includes(dateStr);
        const updatedBusy = isBusy 
          ? currentBusy.filter(d => d !== dateStr) 
          : [...currentBusy, dateStr].sort();
        return {
          ...a,
          busyDates: updatedBusy
        };
      }
      return a;
    }));
  };

  const clearArtistBusyDates = (artistId: string) => {
    setArtists(prev => prev.map(a => {
      if (a.id === artistId) {
        return {
          ...a,
          busyDates: []
        };
      }
      return a;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        artists,
        bookings,
        conversations,
        messages,
        savedArtistIds,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedCity,
        setSelectedCity,
        minRating,
        setMinRating,
        maxPrice,
        setMaxPrice,
        onlyVerified,
        setOnlyVerified,
        sortBy,
        setSortBy,
        selectedArtist,
        selectedPackage,
        activeModal,
        activeChatId,
        openArtistDetail,
        closeModal,
        openBookingModal,
        openChatWithArtist,
        openChatById,
        openLoginModal,
        openRegisterArtistModal,
        openUserDashboard,
        openArtistDashboard,
        openReviewModal,
        login,
        logout,
        registerClient,
        verifyAndRegisterArtist,
        toggleSaveArtist,
        createBooking,
        updateBookingStatus,
        sendMessage,
        addReview,
        updateArtistProfile,
        addArtistPortfolioItem,
        addArtistCertificate,
        toggleArtistBusyDate,
        clearArtistBusyDates
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
