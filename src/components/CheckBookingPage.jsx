import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { apiClient } from '../api/client';

export function CheckBookingPage({ onNavigate }) {
  const adminWhatsapp = '081262849951';
  const [searchType, setSearchType] = useState('id'); // 'id' atau 'phone'
  const [searchValue, setSearchValue] = useState('');
  const [bookingResult, setBookingResult] = useState(null); // Hasil pencarian
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Validasi input kosong
    if (!searchValue.trim()) {
      toast.error('Mohon masukkan data pencarian');
      return;
    }

    setIsLoading(true);
    setBookingResult(null); // Reset hasil lama supaya bersih

    try {
        // Tentukan query parameter (cari by code atau by phone)
        const queryParam = searchType === 'id' 
            ? `bookingId=${searchValue}` 
            : `phone=${searchValue}`;

        // Panggil API Backend di Port 4000
        const payload = await apiClient(`/bookings/check?${queryParam}`);
        setBookingResult(payload.data);
        toast.success(payload.message || "Data booking ditemukan!");
    } catch (error) {
        console.error("Error:", error);
        toast.error(error.message || "Gagal menghubungi server (Cek koneksi backend)");
        setBookingResult(null);
    } finally {
        setIsLoading(false);
    }
  };

  // Helper untuk warna status
  const getStatusColor = (status) => {
    const normalized = (status || '').toUpperCase();
    if (normalized === 'CONFIRMED' || normalized === 'COMPLETED') return 'bg-[#1DB954]/10 border-[#1DB954] text-[#1DB954]';
    if (normalized === 'PENDING') return 'bg-yellow-500/10 border-yellow-500 text-yellow-400';
    if (normalized === 'CANCELED') return 'bg-red-500/10 border-red-500 text-red-400';
    return 'bg-gray-500/10 border-gray-500 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-[#121212] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button onClick={() => onNavigate('home')} variant="outline" className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
        </Button>

        <div className="bg-[#181818] rounded-xl shadow-sm p-8 border border-white/10">
          <h1 className="text-white mb-6 text-3xl">Cek Booking Saya</h1>
          
          {/* Pilihan Tipe Pencarian */}
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={() => { setSearchType('id'); setSearchValue(''); setBookingResult(null); }} 
              variant={searchType === 'id' ? 'default' : 'outline'} 
              className={searchType === 'id' ? 'bg-[#1DB954] text-black' : 'bg-[#282828] text-white'}
            >
              ID Booking
            </Button>
            <Button 
              onClick={() => { setSearchType('phone'); setSearchValue(''); setBookingResult(null); }} 
              variant={searchType === 'phone' ? 'default' : 'outline'} 
              className={searchType === 'phone' ? 'bg-[#1DB954] text-black' : 'bg-[#282828] text-white'}
            >
              Nomor HP
            </Button>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSearch} className="space-y-4 mb-8">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-gray-300">
                {searchType === 'id' ? 'Masukkan ID Booking' : 'Nomor HP Anda'}
              </Label>
              <Input 
                id="search" 
                type="text" 
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} 
                className="bg-[#282828] border-white/10 text-white placeholder:text-gray-500"
                placeholder={searchType === 'id' ? 'Contoh: 12' : 'Contoh: 0812xxxx'}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !searchValue.trim()} 
              className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full disabled:opacity-50"
            >
              {isLoading ? 'Mencari...' : 'Cek Status'} <Search className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* PENGAMAN: Bagian ini HANYA muncul jika bookingResult TIDAK NULL */}
          {bookingResult && (
            <div className="border-t border-white/10 pt-8 animate-in fade-in-50">
              <h2 className="text-white mb-6">Hasil Pencarian</h2>

              <div className="space-y-6">
                {/* Status Box */}
                <div className={`border-l-4 rounded p-4 ${getStatusColor(bookingResult.status)}`}>
                  <p className="text-sm mb-1">Status Pesanan:</p>
                  <p className="font-bold">{bookingResult.status}</p>
                </div>

                {/* Detail Box */}
                <div className="bg-[#282828] rounded-lg p-6 space-y-4 border border-white/10">
                  <h3 className="text-white">Detail Pesanan</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><p className="text-gray-400">ID Booking:</p><p className="text-white">{bookingResult.id}</p></div>
                    <div><p className="text-gray-400">Nama:</p><p className="text-white">{bookingResult.name}</p></div>
                    <div><p className="text-gray-400">Lapangan:</p><p className="text-white">{bookingResult.court}</p></div>
                    <div><p className="text-gray-400">Mulai:</p><p className="text-white">{new Date(bookingResult.startTime).toLocaleString('id-ID')}</p></div>
                    <div><p className="text-gray-400">Selesai:</p><p className="text-white">{new Date(bookingResult.endTime).toLocaleString('id-ID')}</p></div>
                    <div><p className="text-gray-400">Total Harga:</p><p className="text-white">Rp{Number(bookingResult.totalPrice || 0).toLocaleString('id-ID')}</p></div>
                  </div>
                </div>

                {bookingResult.status && bookingResult.status.toUpperCase() !== 'CONFIRMED' && bookingResult.status.toUpperCase() !== 'COMPLETED' && (
                  <div className="bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg p-4 space-y-3">
                    <p className="text-white text-sm">
                      Jika belum terkonfirmasi, silakan hubungi admin melalui WhatsApp untuk konfirmasi manual.
                    </p>
                    <Button
                      onClick={() => window.open(`https://wa.me/${adminWhatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
                      className="bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full"
                    >
                      Hubungi Admin ({adminWhatsapp})
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
