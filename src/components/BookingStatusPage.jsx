import { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { apiClient } from '../api/client';
import { toast } from 'sonner';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatTime = (iso) => {
  const date = new Date(iso);
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export function BookingStatusPage({ bookingId: initialBookingId, onNavigate }) {
  const [bookingId, setBookingId] = useState(
    initialBookingId ||
    new URLSearchParams(window.location.search).get('bookingId') ||
    localStorage.getItem('lastBookingId') ||
    ''
  );
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStatus = async (id) => {
    if (!id) {
      setBooking(null);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await apiClient(`/bookings/${id}`);
      setBooking(data);
      localStorage.setItem('lastBookingId', id);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Gagal mengambil status booking');
      setBooking(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchStatus(bookingId);
    }
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-[#121212] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={() => onNavigate('home')}
          variant="outline"
          className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>

        <div className="bg-[#181818] rounded-xl shadow-sm p-8 border border-white/10">
          <h1 className="text-white mb-6 text-3xl">Status Booking</h1>

          <div className="flex gap-2 mb-6">
            <Input
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              placeholder="Masukkan Booking ID"
              className="bg-[#282828] border-white/10 text-white"
            />
            <Button
              onClick={() => fetchStatus(bookingId)}
              disabled={!bookingId || isLoading}
              className="bg-[#1DB954] hover:bg-[#1ed760] text-black"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Cek
            </Button>
          </div>

          {isLoading && <p className="text-gray-400">Memuat status booking...</p>}

          {!isLoading && !booking && (
            <p className="text-gray-400">Masukkan Booking ID untuk melihat status.</p>
          )}

          {booking && (
            <div className="space-y-4">
              <div className="bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg p-4">
                <p className="text-gray-400">Status:</p>
                <p className="text-white text-xl">{booking.status}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Lapangan</p>
                  <p className="text-white">{booking?.court?.name || booking.courtId}</p>
                </div>
                <div>
                  <p className="text-gray-400">Lokasi</p>
                  <p className="text-white">{booking?.court?.location || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Tanggal</p>
                  <p className="text-white">{formatDate(booking.startTime)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Waktu</p>
                  <p className="text-white">{`${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}`}</p>
                </div>
                <div>
                  <p className="text-gray-400">Harga</p>
                  <p className="text-white">Rp{Number(booking.totalPrice || 0).toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
