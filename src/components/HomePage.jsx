import { useEffect, useState } from 'react';
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { apiClient } from '../api/client';

export function HomePage({ onNavigate }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [courts, setCourts] = useState([]);
  const imagePool = [
    'https://images.unsplash.com/photo-1712325485668-6b6830ba814e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559369064-c4d65141e408?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1693517235862-a1b8c3323efb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1710378844976-93a6538671ef?auto=format&fit=crop&w=1200&q=80',
  ];

  const handleCheckSchedule = () => {
    if (selectedDate) {
      onNavigate('schedule', selectedDate);
    } else {
      const today = new Date().toISOString().split('T')[0];
      onNavigate('schedule', today);
    }
  };

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const { data } = await apiClient('/courts');
        const fetched = (data || []).map((c, idx) => ({
          ...c,
          courtId: c.id,
          id: c.id,
          image: c.imageUrl || imagePool[idx % imagePool.length],
        }));
        setCourts(fetched || []);
      } catch (err) {
        console.error('Gagal memuat data lapangan', err);
        setCourts([]);
      }
    };
    fetchCourts();
  }, []);

  const features = [
    'Booking online 24/7',
    'Konfirmasi instan',
    'Pembayaran mudah',
    'Cari lawan tanding',
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="bg-gradient-to-b from-[#1DB954]/20 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-white mb-4 text-5xl">
              Booking Lapangan Olahraga Jadi Mudah
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Platform terpercaya untuk memesan lapangan futsal, badminton, basket, dan voli.
              Cek jadwal real-time dan booking dalam hitungan detik.
            </p>
          </div>

          <div className="bg-[#181818] rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-white/10">
            <h2 className="text-white mb-6 text-center text-2xl">
              Mulai Booking Sekarang
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-gray-300 mb-2">
                  Pilih Tanggal
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#282828] border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#1DB954] focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <Button
                onClick={handleCheckSchedule}
                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black py-6 rounded-full transition-all transform hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Cek Jadwal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-[#1DB954] flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-white mb-8 text-center text-3xl">
          Lapangan Yang Tersedia
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(courts || []).slice(0, 4).map((court) => (
            <div
              key={court.id}
              className="bg-[#181818] rounded-xl overflow-hidden hover:bg-[#282828] transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={court.image || 'https://images.unsplash.com/photo-1710378844976-93a6538671ef?auto=format&fit=crop&w=1200&q=80'}
                  alt={court.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white">{court.name}</h3>
                {court.location && <p className="text-gray-400 text-sm">{court.location}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
