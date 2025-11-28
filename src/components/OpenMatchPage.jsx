import { useEffect, useState } from 'react';
import { ArrowLeft, Users, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { apiClient } from '../api/client';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatTimeRange = (start, end) => {
  const toTime = (val) => {
    const date = new Date(val);
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  return `${toTime(start)} - ${toTime(end)}`;
};

export function OpenMatchPage({ onNavigate }) {
  const [openMatches, setOpenMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await apiClient('/open-matches');
        setOpenMatches(data || []);
      } catch (error) {
        console.error('Gagal mengambil data open match:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const getSportColor = (sport) => {
    switch (sport) {
      case 'FUTSAL':
        return 'bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30';
      case 'BASKET':
        return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'VOLI':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'BADMINTON':
        return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={() => onNavigate('home')}
          variant="outline"
          className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>

        <div className="bg-[#181818] rounded-xl shadow-sm p-8 mb-6 border border-white/10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-white mb-2 text-3xl">
                Laga Terbuka
              </h1>
              <p className="text-gray-300">
                Cari tim yang sudah membayar dan membuka kesempatan sparring. Hubungi mereka langsung dan sepakati detail tanding.
              </p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-white mb-2">Cara Menggunakan Fitur Ini:</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Lihat daftar tim yang aktif mencari lawan.</li>
              <li>Pilih jadwal dan lokasi yang cocok.</li>
              <li>Hubungi kontak yang tersedia untuk konfirmasi.</li>
            </ol>
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-400 py-10">Memuat data laga...</div>
          ) : openMatches.length === 0 ? (
            <div className="bg-[#181818] rounded-xl p-12 text-center border border-white/10">
              <p className="text-gray-400">Belum ada tim yang mencari lawan saat ini.</p>
              <Button 
                onClick={() => onNavigate('schedule')}
                className="mt-4 bg-[#1DB954] text-black hover:bg-[#1ed760]"
              >
                Buat Laga Baru
              </Button>
            </div>
          ) : (
            openMatches.map((match) => (
              <div
                key={match.id}
                className="bg-[#181818] rounded-xl shadow-sm p-6 hover:bg-[#282828] transition-all border border-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-white">{match.teamName || 'Tim tanpa nama'}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${getSportColor(match?.court?.sportType)}`}>
                        {match?.court?.sportType || 'Lainnya'}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Sedang mencari lawan tanding!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{match?.court?.name} • {match?.court?.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{formatTimeRange(match.startTime, match.endTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{formatDate(match.startTime)}</span>
                      </div>
                    </div>

                    {match?.court?.facilities && (
                      <div className="mt-3 text-sm text-gray-400">
                        Fasilitas: {match.court.facilities}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  {match?.user?.phone && (
                    <Button
                      onClick={() => window.open(`https://wa.me/${String(match.user.phone).replace(/[^0-9]/g, '')}`, '_blank')}
                      className="bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Hubungi via WhatsApp
                    </Button>
                  )}
                  <Button
                    onClick={() => onNavigate('schedule')}
                    variant="outline"
                    className="bg-[#282828] border-white/10 text-white hover:bg-[#3E3E3E] rounded-full"
                  >
                    Lihat Jadwal Lain
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 bg-gradient-to-br from-[#1DB954]/10 to-blue-500/10 border border-[#1DB954]/20 rounded-xl p-8 text-center">
          <h2 className="text-white mb-3 text-2xl">
            Ingin Mencari Lawan?
          </h2>
          <p className="text-gray-300 mb-6">
            Booking lapangan dan centang opsi "Cari Lawan Tanding" untuk menampilkan slot Anda di halaman ini!
          </p>
          <Button
            onClick={() => onNavigate('schedule')}
            className="bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full"
          >
            Mulai Booking Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
}
