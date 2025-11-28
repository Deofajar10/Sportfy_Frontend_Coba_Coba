import { Home, Calendar, Search, Users, LogOut, Shield } from 'lucide-react';
import { SportfyLogo } from './SportfyLogo';
import { Button } from './ui/button';
import { jwtDecode } from 'jwt-decode';

export function Navigation({ currentPage, onNavigate, onLogout, isLoggedIn = true }) {
  let isAdmin = false;
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      isAdmin = decoded?.role === 'ADMIN';
    }
  } catch (_) {
    isAdmin = false;
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'schedule', label: 'Jadwal', icon: Calendar },
    { id: 'check', label: 'Cek Booking', icon: Search },
    { id: 'open-match', label: 'Laga Terbuka', icon: Users },
    ...(isAdmin ? [{ id: 'admin-courts', label: 'Admin Court', icon: Shield }] : []),
  ];

  return (
    <nav className="bg-black border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <SportfyLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
            <span className="text-white text-xl font-semibold">Sportfy</span>
          </div>
          
          <div className="flex gap-2 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-[#1DB954] text-black'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
            
            {isLoggedIn && onLogout && (
              <Button
                onClick={onLogout}
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Keluar</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
