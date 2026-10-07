import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  Lock, 
  ArrowRight, 
  Upload, 
  Plus, 
  Trash2,
  Award,
  Video,
  Image as ImageIcon,
  Check,
  Building2,
  Zap,
  Copy,
  ExternalLink,
  CheckCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType, PricingPackage, PortfolioItem, CertificateItem } from '../types';

export const ArtistRegistrationModal: React.FC = () => {
  const { closeModal, verifyAndRegisterArtist, openArtistDashboard } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStepText, setPaymentStepText] = useState('Initiating Secure UPI Session...');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi_qr' | 'upi_id' | 'card'>('upi_qr');
  const [upiIdInput, setUpiIdInput] = useState('ajinkya70280@okicici');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  const officialUpiId = "ajinkya70280@okicici";
  const officialPayeeName = "1360_Ajinkya";
  const upiPayUrl = `upi://pay?pa=${officialUpiId}&pn=${encodeURIComponent(officialPayeeName)}&am=39.00&cu=INR&tn=${encodeURIComponent('Artbook Artist Verification')}`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiPayUrl)}`;

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(officialUpiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<CategoryType>('Mehendi Designer');
  const [experienceYears, setExperienceYears] = useState(4);
  const [city, setCity] = useState('Mumbai');
  const [address, setAddress] = useState('');
  const [tagline, setTagline] = useState('');
  const [bio, setBio] = useState('');
  const [startingPrice, setStartingPrice] = useState(3000);
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80');

  // Portfolio & Pricing items
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 'p1',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=900&auto=format&fit=crop&q=80',
      title: 'Bridal Masterpiece Work',
      categoryTag: 'Bridal',
      likes: 12
    },
    {
      id: 'p2',
      type: 'video',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
      title: 'Live Client Reel',
      categoryTag: 'Video Reel',
      likes: 28
    }
  ]);

  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');

  const [certTitle, setCertTitle] = useState('National Certified Artisan Guild');
  const [certIssuer, setCertIssuer] = useState('Indian Academy of Fine Arts & Cosmetology');
  const [certYear, setCertYear] = useState('2025');

  // Pricing packages state
  const [packages, setPackages] = useState<PricingPackage[]>([
    {
      id: 'pkg-1',
      title: 'Standard Package',
      price: 3000,
      duration: '2 Hours',
      description: 'Standard session with complete materials and professional finish.',
      features: ['Consultation included', 'Doorstep service', 'Organic/Safe materials']
    },
    {
      id: 'pkg-2',
      title: 'VIP Bridal / Grand Package',
      price: 8500,
      duration: '5 Hours',
      description: 'Elaborate personalized luxury design with touchup guarantee.',
      features: ['Custom couple story', 'Premium imported materials', 'Touchup kit included', 'Priority booking'],
      popular: true
    }
  ]);

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    setPortfolioItems(prev => [
      ...prev,
      {
        id: 'p-' + Date.now(),
        type: 'photo',
        url: newPhotoUrl,
        title: newPhotoTitle || 'Custom Artwork',
        categoryTag: category,
        likes: 1
      }
    ]);
    setNewPhotoUrl('');
    setNewPhotoTitle('');
  };

  const handleAddVideo = () => {
    if (!newVideoUrl.trim()) return;
    setPortfolioItems(prev => [
      ...prev,
      {
        id: 'v-' + Date.now(),
        type: 'video',
        url: newVideoUrl,
        thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80',
        title: newVideoTitle || 'Artisan Video Reel',
        categoryTag: 'Video Reel',
        likes: 1
      }
    ]);
    setNewVideoUrl('');
    setNewVideoTitle('');
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setPaymentStepText('Connecting to NPCI UPI Gateway...');

    setTimeout(() => {
      setPaymentStepText('Verifying ₹39 Artisan Nominal Fee...');
    }, 1200);

    setTimeout(() => {
      setPaymentStepText('Generating Artbook Verified Pro Badge & Certificate ID...');
    }, 2200);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);

      const refId = utrNumber.trim() ? `UTR-${utrNumber.trim().toUpperCase()}` : 'UPI-' + Math.random().toString(36).substring(2, 10).toUpperCase();

      const certs: CertificateItem[] = [
        {
          id: 'cert-' + Date.now(),
          title: certTitle,
          issuer: certIssuer,
          year: certYear,
          image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&auto=format&fit=crop&q=80',
          verified: true,
          credentialId: refId
        }
      ];

      // Register in state
      verifyAndRegisterArtist({
        name: name || 'Artisan ' + category,
        email: email || 'artist@artbook.in',
        phone: phone || '+91 98765 43210',
        tagline: tagline || `Experienced ${category} delivering stunning results`,
        bio: bio || `Passionate ${category} with ${experienceYears} years of crafting memorable moments for weddings, festivals and occasions.`,
        category,
        experienceYears: Number(experienceYears) || 3,
        city,
        address: address || `${city}, India`,
        avatar,
        coverImage: portfolioItems[0]?.url || 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=1200&auto=format&fit=crop&q=80',
        startingPrice: Number(startingPrice) || 3000,
        pricingPackages: packages,
        portfolio: portfolioItems,
        certificates: certs,
        availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }, refId);

      setTimeout(() => {
        closeModal();
        openArtistDashboard();
      }, 1500);

    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-5 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-luxury text-amber-100 flex items-center gap-2">
                <span>Artist Registration & Verification</span>
                <span className="bg-amber-400 text-stone-950 text-[10px] font-mono font-black px-2 py-0.5 rounded-full">
                  ₹39 ONE-TIME
                </span>
              </h2>
              <p className="text-xs text-stone-300">
                Create your verified profile, showcase artwork & accept client bookings
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            aria-label="Close registration dialog"
            className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-stone-100 border-b border-stone-200 px-6 py-2.5 flex items-center justify-between text-xs font-semibold shrink-0">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-700' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 1 ? 'bg-amber-600 text-white' : 'bg-stone-300 text-stone-600'
            }`}>1</span>
            <span>Profile & Category</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-700' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 2 ? 'bg-amber-600 text-white' : 'bg-stone-300 text-stone-600'
            }`}>2</span>
            <span>Portfolio & Rates</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-amber-700' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step === 3 ? 'bg-rose-600 text-white animate-pulse' : 'bg-stone-300 text-stone-600'
            }`}>3</span>
            <span className="text-rose-600 font-bold">₹39 Verification</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* STEP 1: BASIC PROFILE */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name / Brand *</label>
                  <input
                    type="text"
                    placeholder="e.g. Pooja Rathore"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Creative Specialty / Category *</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as CategoryType)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-amber-500 outline-none font-semibold text-stone-800"
                  >
                    <option value="Mehendi Designer">Mehendi Designer (Bridal, Arabic)</option>
                    <option value="Rangoli Artist">Rangoli Artist (3D, Sanskar Bharti, Flowers)</option>
                    <option value="Bridal Makeup">Bridal Makeup (HD Glow, Airbrush)</option>
                    <option value="Hairstylist">Hairstylist (Updos, Curls, Braids)</option>
                    <option value="Nail Artist">Nail Artist (3D Acrylics, Russian Gel)</option>
                    <option value="Tattoo & Body Art">Tattoo & Body Art (Fine-Line, Custom Ink)</option>
                    <option value="Event & Floral Decor">Event & Floral Decor (Mandaps, Haldi)</option>
                    <option value="Calligraphy & Canvas">Calligraphy & Canvas (Gold Leaf, Vows)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="artist@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-amber-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-amber-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={experienceYears}
                    onChange={e => setExperienceYears(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">City / Region *</label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Jaipur, Bangalore"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Starting Service Rate (₹) *</label>
                  <input
                    type="number"
                    placeholder="3000"
                    value={startingPrice}
                    onChange={e => setStartingPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-amber-500 outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Profile Tagline *</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Rajasthani Bridal Mehendi & Intricate Custom Stories"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">About Your Craft & Experience (Bio)</label>
                <textarea
                  rows={3}
                  placeholder="Describe your training, signature style, hygiene standards and client promise..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-amber-500 outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: PORTFOLIO & CREDENTIALS */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              {/* Photo Upload */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  Add Artwork Photos
                </h4>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste high-res image URL (e.g. Unsplash or portfolio link)"
                    value={newPhotoUrl}
                    onChange={e => setNewPhotoUrl(e.target.value)}
                    className="flex-1 p-2 bg-white border border-stone-300 rounded-xl text-xs outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Title (e.g. Bridal Henna)"
                    value={newPhotoTitle}
                    onChange={e => setNewPhotoTitle(e.target.value)}
                    className="w-36 p-2 bg-white border border-stone-300 rounded-xl text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="px-3 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Previews */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {portfolioItems.filter(p => p.type === 'photo').map(item => (
                    <div key={item.id} className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 border border-stone-300">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Reel Link */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-rose-600" />
                  Add Artwork Video Reel (MP4 URL / Showcase)
                </h4>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="MP4 video URL (or leave default showcase sample)"
                    value={newVideoUrl}
                    onChange={e => setNewVideoUrl(e.target.value)}
                    className="flex-1 p-2 bg-white border border-stone-300 rounded-xl text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddVideo}
                    className="px-3 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 cursor-pointer"
                  >
                    Add Reel
                  </button>
                </div>
              </div>

              {/* Academy Certificate */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  Academy Certificate or Award
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Certificate Title"
                    value={certTitle}
                    onChange={e => setCertTitle(e.target.value)}
                    className="p-2 bg-white border border-stone-300 rounded-xl text-xs outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Academy"
                    value={certIssuer}
                    onChange={e => setCertIssuer(e.target.value)}
                    className="p-2 bg-white border border-stone-300 rounded-xl text-xs outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g. 2025)"
                    value={certYear}
                    onChange={e => setCertYear(e.target.value)}
                    className="p-2 bg-white border border-stone-300 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ₹39 NOMINAL VERIFICATION PAYMENT GATEWAY */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* Trust & Fee explanation banner */}
              <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border border-amber-300 p-4 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 font-bold font-mono text-sm shadow-sm">
                    ₹39
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <span>Artbook Lifetime Pro Verification</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                        0% Commission on Bookings
                      </span>
                    </h4>
                    <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                      We charge a nominal fee of <strong>₹39</strong> to eliminate fraudulent bots, verify artist identity, and issue the authenticated <strong>Artbook Verified Pro</strong> badge for your portfolio.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi_qr')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'upi_qr'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold">UPI QR Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi_id')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'upi_id'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-rose-400" />
                  <span className="text-xs font-bold">GPay / PhonePe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold">Cards / NetBank</span>
                </button>
              </div>

              {/* Payment Interface Content */}
              <div className="bg-stone-50 p-4 sm:p-5 rounded-3xl border border-stone-200">
                {paymentMethod === 'upi_qr' && (
                  <div className="flex flex-col items-center text-center space-y-4">
                    
                    {/* Google Pay Official Card matching user's QR screenshot */}
                    <div className="w-full max-w-sm bg-[#1b1c1e] text-white rounded-3xl p-5 shadow-2xl border border-stone-700/60 relative overflow-hidden">
                      
                      {/* Ambient Glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                      
                      {/* Payee Header */}
                      <div className="flex items-center justify-center gap-2.5 mb-3.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-stone-600 to-stone-400 p-0.5 shrink-0 overflow-hidden ring-1 ring-white/20">
                          <img 
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                            alt="1360_Ajinkya" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="text-sm font-bold text-stone-100 tracking-wide">
                          {officialPayeeName}
                        </div>
                      </div>

                      {/* Scannable Dynamic QR Code */}
                      <div className="relative p-3.5 bg-white rounded-2xl mx-auto w-fit shadow-xl border border-white/20">
                        <img 
                          src={qrCodeImageUrl} 
                          alt="UPI QR Code - ajinkya70280@okicici" 
                          className="w-44 h-44 sm:w-48 sm:h-48 mx-auto rounded-lg object-contain"
                        />

                        {/* Google Pay Center Emblem Logo */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full p-1 shadow-md flex items-center justify-center border border-stone-100">
                          <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                            <svg className="w-6 h-6" viewBox="0 0 48 48">
                              <path fill="#4285F4" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
                              <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                              <path fill="#FBBC05" d="M24 44c5.3 0 10.1-1.8 13.7-4.9l-6.3-5.2c-2.1 1.4-4.6 2.1-7.4 2.1-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9.5 39.5 16.2 44 24 44z"/>
                              <path fill="#EA4335" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.4 5.6l6.3 5.2C40.8 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-3.9z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Instructions & Amount */}
                      <div className="text-center mt-3 space-y-1">
                        <div className="text-xs text-stone-300 font-medium">
                          Scan to pay with any UPI app
                        </div>
                        <div className="text-xs font-black text-amber-300 font-mono">
                          Amount: ₹39.00
                        </div>
                      </div>

                      {/* Bank Details Banner */}
                      <div className="mt-3 py-2 px-3 bg-[#28292c] rounded-xl flex items-center justify-center gap-2 text-xs text-stone-200">
                        <div className="w-5 h-5 rounded-full bg-[#1b5db0] flex items-center justify-center text-white shrink-0">
                          <span className="text-[10px] font-bold">SBI</span>
                        </div>
                        <span className="font-semibold text-[11px] text-stone-200">State Bank of India 3516</span>
                      </div>

                      {/* UPI ID with One-Click Copy */}
                      <div className="mt-2.5 flex items-center justify-between py-1.5 px-3 bg-[#232427] rounded-xl border border-stone-700/60">
                        <div className="text-left">
                          <span className="text-[10px] text-stone-400 block">UPI ID:</span>
                          <span className="text-xs font-mono font-bold text-amber-300">{officialUpiId}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-2.5 py-1 bg-stone-700 hover:bg-stone-600 text-stone-200 hover:text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copiedUpi ? (
                            <>
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Direct UPI Intent Link for Mobile */}
                      <a
                        href={upiPayUrl}
                        className="mt-3.5 w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Pay ₹39 directly on GPay / PhonePe</span>
                      </a>

                    </div>

                    {/* UTR / Transaction ID Input (Optional verification) */}
                    <div className="w-full max-w-sm bg-white p-3.5 rounded-2xl border border-stone-200 text-left space-y-1.5">
                      <label className="block text-[11px] font-bold text-stone-700">
                        Enter 12-digit UPI UTR / Ref No. (after payment)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 427981294812"
                        value={utrNumber}
                        onChange={e => setUtrNumber(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono outline-none focus:bg-white focus:border-amber-500"
                      />
                      <p className="text-[10px] text-stone-400">
                        Scan QR code above, transfer ₹39 to <strong className="text-stone-700 font-mono">ajinkya70280@okicici</strong>, and click 'Pay ₹39 & Verify Portfolio' below.
                      </p>
                    </div>

                    {/* Supported Payment Logos */}
                    <div className="flex items-center gap-3 pt-1 text-[11px] text-stone-500 font-semibold">
                      <span>✓ Google Pay</span>
                      <span>•</span>
                      <span>✓ PhonePe</span>
                      <span>•</span>
                      <span>✓ Paytm</span>
                      <span>•</span>
                      <span>✓ BHIM UPI</span>
                    </div>

                  </div>
                )}

                {paymentMethod === 'upi_id' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-stone-800">
                      Transfer ₹39 to Official Artbook UPI ID
                    </label>
                    
                    <div className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-stone-400">Payee UPI VPA:</div>
                        <div className="text-sm font-bold font-mono text-stone-900">{officialUpiId}</div>
                        <div className="text-[11px] text-stone-500">Name: {officialPayeeName} • State Bank of India 3516</div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Your UPI ID or Transaction UTR</label>
                      <input
                        type="text"
                        placeholder="Enter your UPI ID or 12-digit UTR number"
                        value={utrNumber || upiIdInput}
                        onChange={e => setUtrNumber(e.target.value)}
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Send ₹39 from your UPI App and confirm verification.
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8892"
                        defaultValue="4532 9981 4452 7710"
                        className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="08/29"
                          className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          defaultValue="789"
                          className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Processing Overlay State */}
              {isProcessingPayment && (
                <div className="p-4 bg-stone-900 text-white rounded-2xl flex items-center justify-center gap-3 animate-pulse">
                  <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold text-amber-200">{paymentStepText}</span>
                </div>
              )}

              {paymentSuccess && (
                <div className="p-4 bg-emerald-600 text-white rounded-2xl flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-100" />
                  <span className="text-xs font-bold">Verification Successful! Welcome to Artbook Pro!</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="bg-white border-t border-stone-200 p-4 px-6 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as 1 | 2)}
              disabled={isProcessingPayment}
              className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((step + 1) as 2 | 3)}
              className="py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleProcessPayment}
              disabled={isProcessingPayment || paymentSuccess}
              className="py-3 px-8 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:brightness-110 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>Pay ₹39 & Verify Portfolio</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
