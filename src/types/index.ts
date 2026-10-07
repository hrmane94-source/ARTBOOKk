export type CategoryType = 
  | 'All'
  | 'Mehendi Designer'
  | 'Rangoli Artist'
  | 'Bridal Makeup'
  | 'Hairstylist'
  | 'Nail Artist'
  | 'Tattoo & Body Art'
  | 'Calligraphy & Canvas'
  | 'Event & Floral Decor';

export interface PricingPackage {
  id: string;
  title: string;
  price: number; // in INR ₹
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  categoryTag: string;
  likes: number;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  verified: boolean;
  credentialId?: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  serviceUsed: string;
  photos?: string[];
  artistReply?: string;
}

export interface Artist {
  id: string;
  name: string;
  email: string;
  phone: string;
  tagline: string;
  bio: string;
  category: CategoryType;
  experienceYears: number;
  city: string;
  address: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean; // ₹39 fee verification
  verifiedDate?: string;
  badges: string[];
  startingPrice: number; // in INR ₹
  pricingPackages: PricingPackage[];
  portfolio: PortfolioItem[];
  certificates: CertificateItem[];
  reviews: ReviewItem[];
  availabilityDays: string[];
  busyDates?: string[]; // YYYY-MM-DD strings marked as busy/unavailable by artist
  completedBookingsCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'client' | 'artist';
  avatar: string;
  city: string;
  artistId?: string; // if registered as artist
}

export interface Booking {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistCategory: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  servicePackageId: string;
  packageName: string;
  price: number;
  eventDate: string;
  timeSlot: string;
  eventLocation: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'declined' | 'cancelled';
  createdAt: string;
  paymentStatus: 'pending' | 'advance_paid' | 'paid_on_spot';
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: 'client' | 'artist';
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'video';
  bookingInquiry?: {
    packageName: string;
    date: string;
    price: number;
  };
}

export interface Conversation {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistCategory: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
