import { CheckCircle, Copy, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

export function CompletePage({ bookingData, onNavigate }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Berhasil disalin ke clipboard!');
  };

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

        {/* Success Message */}
        <div className="bg-[#181818] rounded-xl shadow-sm p-8 mb-6 border border-white/10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1DB954]/20 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-[#1DB954]" />
            </div>
            <h1 className="text-white mb-2 text-3xl">
              Terima kasih! Booking Anda sudah kami terima.
            </h1>
            <p className="text-gray-300">
              Silakan selesaikan pembayaran untuk mengkonfirmasi pesanan Anda.
            </p>
          </div>

          {/* Booking Code */}
          <div className="bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg p-6 mb-6">
            <p className="text-gray-400 mb-2 text-center">Kode Booking Anda:</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-white text-center text-xl">
                {bookingData.bookingCode || bookingData.bookingId || '-'}
              </p>
              <Button
                onClick={() => copyToClipboard(bookingData.bookingCode)}
                variant="ghost"
                size="sm"
                className="hover:bg-[#1DB954]/20"
              >
                <Copy className="w-4 h-4 text-[#1DB954]" />
              </Button>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-3 mb-6">
            <h2 className="text-white mb-4">Detail Pesanan</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Lapangan:</p>
                <p className="text-white">{bookingData.court}</p>
              </div>
              <div>
                <p className="text-gray-400">Tanggal:</p>
                <p className="text-white">{formatDate(bookingData.date)}</p>
              </div>
              <div>
                <p className="text-gray-400">Waktu:</p>
                <p className="text-white">{bookingData.time}</p>
              </div>
              <div>
                <p className="text-gray-400">Total Harga:</p>
                <p className="text-white">Rp{(bookingData.totalPrice || bookingData.price)?.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-gray-400">Nama:</p>
                <p className="text-white">{bookingData.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Nomor HP:</p>
                <p className="text-white">{bookingData.phone}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 rounded p-4 mb-6">
            <p className="text-white">
              Status Pesanan: <span className="text-yellow-400">Menunggu Pembayaran</span>
            </p>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-[#181818] rounded-xl shadow-sm p-8 mb-6 border border-white/10">
          <h2 className="text-white mb-6">Instruksi Pembayaran</h2>
          
          <div className="space-y-4">
            <div className="bg-[#282828] rounded-lg p-6">
              <p className="text-gray-400 mb-2">Silakan bayar sebesar:</p>
              <p className="text-white mb-4 text-xl">
                Rp{bookingData.price.toLocaleString('id-ID')}
              </p>
              
              <p className="text-gray-400 mb-2">Ke rekening:</p>
              <div className="bg-[#181818] rounded p-4 mb-2 border border-white/10">
                <p className="text-white">BCA: 123-456-7890</p>
                <p className="text-gray-400">a.n. Pengelola Lapangan</p>
              </div>
              <Button
                onClick={() => copyToClipboard('1234567890')}
                variant="outline"
                size="sm"
                className="bg-[#181818] border-white/10 text-white hover:bg-[#282828]"
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin Nomor Rekening
              </Button>
            </div>

            <div className="bg-red-500/10 border-l-4 border-red-500 rounded p-4">
              <p className="text-white">
                <span className="text-red-400">Batas waktu pembayaran: 1 jam</span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Setelah batas waktu, booking akan otomatis dibatalkan
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Instructions */}
        <div className="bg-[#181818] rounded-xl shadow-sm p-8 mb-6 border border-white/10">
          <h2 className="text-white mb-6">Konfirmasi Pembayaran</h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">
              Setelah melakukan pembayaran, silakan kirim bukti transfer ke:
            </p>
            
            <div className="bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg p-6">
              <p className="text-gray-400 mb-2">WhatsApp Admin:</p>
              <p className="text-white mb-4">0812-XXXX-XXXX</p>
              
              <p className="text-gray-400 mb-2">Format pesan:</p>
              <div className="bg-[#282828] rounded p-4 text-sm border border-white/10">
                <p className="text-gray-300">Kode Booking: {bookingData.bookingCode}</p>
                <p className="text-gray-300">Nama: {bookingData.name}</p>
                <p className="text-gray-300">[Lampirkan bukti transfer]</p>
              </div>
            </div>

            <Button
              onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
              className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full"
            >
              Kirim Bukti via WhatsApp
            </Button>
          </div>
        </div>

        {/* Open Match Confirmation */}
        {(bookingData.findOpponent || bookingData.findPlayers) && (
          <div className="bg-[#181818] rounded-xl shadow-sm p-8 border border-white/10">
            <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/20 rounded-lg p-6">
              <h3 className="text-white mb-3">🎉 Laga Terbuka Aktif!</h3>
              <p className="text-gray-300">
                Booking Anda berhasil! Slot Anda kini dipublikasikan sebagai Laga Terbuka. 
                Tim lain dapat melihat ajakan Anda di jadwal dan menghubungi Anda via WhatsApp. 
                Semoga seru!
              </p>
              {bookingData.teamName && (
                <p className="text-gray-400 mt-3">
                  Nama Tim: <span className="text-white">{bookingData.teamName}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
