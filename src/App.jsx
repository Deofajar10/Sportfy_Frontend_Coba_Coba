import { useEffect, useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { SchedulePage } from './components/SchedulePage';
import { VenueDetailPage } from './components/VenueDetailPage';
import { BookingFormPage } from './components/BookingFormPage';
import { CompletePage } from './components/CompletePage';
import { CheckBookingPage } from './components/CheckBookingPage';
import { OpenMatchPage } from './components/OpenMatchPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { isLoggedIn as checkLoggedIn, clearSession, getUser } from './utils/auth';
import { AdminCourtsPage } from './pages/AdminCourtsPage';
import { BookingStatusPage } from './components/BookingStatusPage';

export default function App() {
  // 1. Cek session (token) saat pertama kali load
  const [isLoggedIn, setIsLoggedIn] = useState(() => checkLoggedIn());

  const [authPage, setAuthPage] = useState('login');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [statusBookingId, setStatusBookingId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('bookingId') || localStorage.getItem('lastBookingId') || '';
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryBookingId = params.get('bookingId');
    if (queryBookingId) {
      setCurrentPage('booking-status');
      setStatusBookingId(queryBookingId);
      localStorage.setItem('lastBookingId', queryBookingId);
    }
  }, []);

  const handleNavigate = (page, data) => {
    const user = getUser();
    const isAdmin = user?.role === 'ADMIN';
    if (page === 'schedule') {
      setSelectedDate(data || new Date().toISOString().split('T')[0]);
      setCurrentPage('schedule');
    } else if (page === 'venue-detail') {
      setSelectedVenue(data.venue);
      setSelectedDate(data.date);
      setCurrentPage('venue-detail');
    } else if (page === 'booking') {
      setBookingData(data);
      setCurrentPage('booking');
    } else if (page === 'complete') {
      setBookingData(data);
      setCurrentPage('complete');
    } else if (page === 'booking-status') {
      if (data?.bookingId) {
        setStatusBookingId(String(data.bookingId));
        localStorage.setItem('lastBookingId', data.bookingId);
      }
      setCurrentPage('booking-status');
    } else if (page === 'admin-courts') {
      if (!isAdmin) {
        setCurrentPage('home');
      } else {
        setCurrentPage('admin-courts');
      }
    } else {
      setCurrentPage(page);
    }
    
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const handleBackToSchedule = () => {
    setCurrentPage('schedule');
    window.scrollTo(0, 0);
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    if (user?.role === 'ADMIN') {
      setCurrentPage('admin-courts');
    } else {
      setCurrentPage('home');
    }
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    clearSession();
    setIsLoggedIn(false);
    setAuthPage('login');
    setCurrentPage('home');
  };

  const handleSwitchToRegister = () => {
    setAuthPage('register');
  };

  const handleSwitchToLogin = () => {
    setAuthPage('login');
  };

  // Show login/register page if not logged in
  if (!isLoggedIn) {
    return (
      <>
        {authPage === 'login' ? (
          <LoginPage 
            onLogin={handleLogin} 
            onSwitchToRegister={handleSwitchToRegister}
          />
        ) : (
          <RegisterPage 
            onRegister={handleRegister} 
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        
        
        {currentPage === 'schedule' && (
          <SchedulePage
            selectedDate={selectedDate}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        )}
        
        {currentPage === 'venue-detail' && selectedVenue && (
          <VenueDetailPage
            venue={selectedVenue}
            selectedDate={selectedDate}
            onNavigate={handleNavigate}
            onBack={handleBackToSchedule}
          />
        )}
        
        {currentPage === 'booking' && bookingData && (
          <BookingFormPage
            bookingData={bookingData}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        )}
        
        {currentPage === 'complete' && bookingData && (
          <CompletePage
            bookingData={bookingData}
            onNavigate={handleNavigate}
          />
        )}
        
        {currentPage === 'check' && (
          <CheckBookingPage onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'open-match' && (
          <OpenMatchPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'booking-status' && (
          <BookingStatusPage bookingId={statusBookingId} onNavigate={handleNavigate} />
        )}

        {currentPage === 'admin-courts' && (
          <AdminCourtsPage onNavigateHome={() => handleNavigate('home')} />
        )}
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
}
