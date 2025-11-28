import { useState, useEffect } from 'react';
import { ArrowLeft, Info, Star, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { apiClient } from '../api/client';
import { toast } from 'sonner';

export function VenueDetailPage({ venue, selectedDate, onNavigate, onBack }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openMatchDialog, setOpenMatchDialog] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]); // Menyimpan jadwal yang sudah dipesan

  // AMBIL DATA JADWAL DARI API (DINAMIS)
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const courtId = venue.courtId ?? venue.id;
        const { data } = await apiClient(`/bookings/schedule?courtId=${courtId}&date=${selectedDate}`);
        setBookedSlots(data || []);
      } catch (error) {
        console.error("Gagal mengambil jadwal:", error);
      }
    };

    fetchSchedule();
    setSelectedSlot(null);
  }, [venue.courtId, venue.id, selectedDate]); // Refresh jika lapangan atau tanggal berubah

  const timeSlots = [
    '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
    '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
    '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00',
    '20:00 - 21:00', '21:00 - 22:00',
  ];

  const toTimeRange = (startIso, endIso) => {
    const start = new Date(startIso);
    const end = new Date(endIso);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(start.getHours())}:${pad(start.getMinutes())} - ${pad(end.getHours())}:${pad(end.getMinutes())}`;
  };

  const getSlotStatus = (timeSlot) => {
    const booking = bookedSlots.find((b) => toTimeRange(b.startTime, b.endTime) === timeSlot);

    if (booking) {
      return { type: 'booked' };
    }

    if (timeSlot === '12:00 - 13:00') return { type: 'closed' };

    return { type: 'available' };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSlotClick = (time, status) => {
    if (status.type !== 'available') return;
    const normalizedTime = time.trim();
    setSelectedSlot({
      courtId: venue.courtId ?? venue.id,
      court: venue.name,
      time: normalizedTime,
      price: venue.priceFrom,
      sport: venue.sportType || venue.sport,
    });
  };

  const handleBooking = () => {
    if (selectedSlot) {
      onNavigate('booking', {
        courtId: selectedSlot.courtId,
        court: selectedSlot.court,
        date: selectedDate,
        time: selectedSlot.time,
        price: selectedSlot.price,
        sport: selectedSlot.sport,
      });
    } else {
      toast.error('Pilih slot waktu terlebih dahulu');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button onClick={onBack} variant="outline" className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar Venue
        </Button>

        {/* Venue Info */}
        <div className="bg-[#181818] rounded-xl shadow-sm p-6 mb-6 border border-white/10">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h1 className="text-white mb-2 text-3xl">{venue.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1"><Star className="w-5 h-5 fill-[#1DB954] text-[#1DB954]" /><span className="text-white">{venue.rating || 4.8}</span></div>
                <div className="flex items-center gap-1 text-gray-300"><MapPin className="w-4 h-4" /><span>{venue.location}</span></div>
              </div>
              {venue.facilities && (
                <p className="text-gray-400 text-sm mb-2">Fasilitas: {venue.facilities}</p>
              )}
              {venue.imageUrl && (
                <div className="mb-4">
                  <img src={venue.imageUrl} alt={venue.name} className="w-full max-w-md rounded-lg border border-white/10" />
                </div>
              )}
              <p className="text-gray-300">Jadwal untuk {formatDate(selectedDate)}</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-[#181818] rounded-xl shadow-sm p-6 mb-6 border border-white/10">
          <h3 className="text-white mb-4">Keterangan:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-[#1DB954] rounded"></div><span className="text-gray-300">Tersedia</span></div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-red-500 rounded"></div><span className="text-gray-300">Sudah Dipesan</span></div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-gray-500 rounded"></div><span className="text-gray-300">Ditutup</span></div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-orange-500 rounded"></div><span className="text-gray-300">Cari Lawan</span></div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="bg-[#181818] rounded-xl shadow-sm p-6 overflow-x-auto border border-white/10">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className="border border-white/10 bg-[#282828] p-3 text-left text-white">Waktu</th>
                <th className="border border-white/10 bg-[#282828] p-3 text-center text-white min-w-[140px]">
                  <div>{venue.courtId ?? venue.id}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => {
                const status = getSlotStatus(time);
                const isSelected = selectedSlot?.time === time.trim();

                return (
                  <tr key={time}>
                    <td className="border border-white/10 p-3 text-white bg-[#181818]">{time}</td>
                    <td className="border border-white/10 p-2 bg-[#181818]">
                      <button
                        type="button"
                        onClick={() => handleSlotClick(time, status)}
                        disabled={status.type === 'booked' || status.type === 'closed'}
                        style={{ pointerEvents: status.type === 'booked' || status.type === 'closed' ? 'none' : 'auto' }}
                        className={`w-full p-3 rounded-lg transition-all ${
                          status.type === 'available'
                            ? isSelected
                              ? 'bg-blue-500 text-white cursor-pointer'
                              : 'bg-[#1DB954] text-black hover:bg-[#1ed760] cursor-pointer'
                            : status.type === 'booked'
                            ? 'bg-red-500 text-white cursor-not-allowed'
                            : status.type === 'closed'
                            ? 'bg-gray-600 text-white cursor-not-allowed'
                            : 'bg-orange-500 text-white hover:bg-orange-600 cursor-pointer'
                        }`}
                      >
                        <div className="text-xs">
                          {status.type === 'available' && `Tersedia`}
                          {status.type === 'booked' && 'Sudah Dipesan'}
                          {status.type === 'closed' && 'Ditutup'}
                          {status.type === 'open-match' && 'CARI LAWAN'}
                        </div>
                        {status.type === 'available' && <div className="text-xs mt-1">Rp{venue.priceFrom?.toLocaleString('id-ID')}</div>}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selectedSlot && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-white/10 shadow-lg p-6 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-gray-400">Slot dipilih:</p>
                <p className="text-white">{selectedSlot.court} - {selectedSlot.time}</p>
                <p className="text-[#1DB954]">Rp{selectedSlot.price?.toLocaleString('id-ID')}</p>
              </div>
              <Button onClick={handleBooking} className="bg-[#1DB954] hover:bg-[#1ed760] text-black px-8 rounded-full">
                Lanjut ke Pemesanan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
