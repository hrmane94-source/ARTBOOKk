/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ArtistGrid } from './components/ArtistGrid';
import { ArtistDetailModal } from './components/ArtistDetailModal';
import { ArtistRegistrationModal } from './components/ArtistRegistrationModal';
import { BookingModal } from './components/BookingModal';
import { ChatModal } from './components/ChatModal';
import { AuthModal } from './components/AuthModal';
import { ArtistDashboardModal } from './components/ArtistDashboardModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { ReviewModal } from './components/ReviewModal';
import { Footer } from './components/Footer';

const ModalsContainer: React.FC = () => {
  const { activeModal } = useApp();

  return (
    <>
      {activeModal === 'artist-detail' && <ArtistDetailModal />}
      {activeModal === 'register-artist' && <ArtistRegistrationModal />}
      {activeModal === 'booking' && <BookingModal />}
      {activeModal === 'chat' && <ChatModal />}
      {(activeModal === 'login-client' || activeModal === 'login-artist' || activeModal === 'auth') && <AuthModal />}
      {activeModal === 'artist-dashboard' && <ArtistDashboardModal />}
      {activeModal === 'user-dashboard' && <UserDashboardModal />}
      {activeModal === 'review' && <ReviewModal />}
    </>
  );
};

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50/20 text-stone-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <CategoryFilter />
        <ArtistGrid />
      </main>
      <Footer />
      <ModalsContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
