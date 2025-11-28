import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SportfyLogo } from './SportfyLogo';

export function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SportfyLogo className="w-10 h-10" />
              <h3 className="text-white text-xl">Sportfy</h3>
            </div>
            <p className="text-gray-400">
              Platform booking lapangan olahraga terpercaya dan mudah digunakan.
            </p>
          </div>
          
          <div>
            <h3 className="text-white mb-4">Kontak Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 hover:text-[#1DB954] transition-colors">
                <Phone className="w-4 h-4" />
                <span>0812-XXXX-XXXX</span>
              </div>
              <div className="flex items-center gap-3 hover:text-[#1DB954] transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@sportfy.com</span>
              </div>
              <div className="flex items-center gap-3 hover:text-[#1DB954] transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white mb-4">Jam Operasional</h3>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-1" />
              <div>
                <p>Senin - Jumat: 08:00 - 22:00</p>
                <p>Sabtu - Minggu: 07:00 - 23:00</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Sportfy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
