import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { toast } from 'sonner';

export function AdminCourtsPage({ onNavigateHome }) {
  const [courts, setCourts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    location: '',
    sportType: 'FUTSAL',
    pricePerHour: '',
    description: '',
    imageUrl: '',
    facilities: '',
  });

  const fetchCourts = async () => {
    try {
      const { data } = await apiClient('/courts');
      setCourts(data || []);
    } catch (error) {
      toast.error(error.message || 'Gagal memuat data');
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient('/admin/courts', {
        method: 'POST',
        data: form,
      });
      toast.success('Lapangan berhasil ditambahkan');
      setForm({ name: '', location: '', sportType: 'FUTSAL', pricePerHour: '', description: '', imageUrl: '', facilities: '' });
      fetchCourts();
    } catch (error) {
      toast.error(error.message || 'Gagal menambah lapangan');
    }
  };

  const handleReset = async () => {
    const confirm = window.confirm('Hapus semua lapangan?');
    if (!confirm) return;
    try {
      await apiClient('/admin/courts/reset', { method: 'DELETE' });
      toast.success('Semua lapangan dihapus');
      fetchCourts();
    } catch (error) {
      toast.error(error.message || 'Gagal reset lapangan');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient(`/admin/courts/${id}`, { method: 'DELETE' });
      toast.success('Lapangan dihapus');
      fetchCourts();
    } catch (error) {
      toast.error(error.message || 'Gagal menghapus');
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Kelola Lapangan (Admin)</h1>
        <button onClick={onNavigateHome} className="text-sm text-[#1DB954] hover:underline">Kembali ke Home</button>
      </div>

      <div className="bg-[#181818] p-4 rounded-lg border border-white/10 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg">Tambah Lapangan</h2>
          <button onClick={handleReset} type="button" className="text-red-400 text-sm hover:underline">Reset Semua Lapangan</button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="p-2 rounded bg-[#282828] border border-white/10" placeholder="Nama" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="p-2 rounded bg-[#282828] border border-white/10" placeholder="Lokasi" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          <select className="p-2 rounded bg-[#282828] border border-white/10" value={form.sportType} onChange={(e) => setForm({ ...form, sportType: e.target.value })}>
            <option value="FUTSAL">FUTSAL</option>
            <option value="BADMINTON">BADMINTON</option>
            <option value="BASKET">BASKET</option>
            <option value="VOLI">VOLI</option>
            <option value="OTHER">OTHER</option>
          </select>
          <input className="p-2 rounded bg-[#282828] border border-white/10" placeholder="Harga per jam" type="number" value={form.pricePerHour} onChange={(e) => setForm({ ...form, pricePerHour: e.target.value })} required />
          <input className="p-2 rounded bg-[#282828] border border-white/10" placeholder="Link Foto (opsional)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <textarea className="p-2 rounded bg-[#282828] border border-white/10 md:col-span-2" placeholder="Fasilitas (pisahkan koma)" value={form.facilities} onChange={(e) => setForm({ ...form, facilities: e.target.value })} />
          <textarea className="p-2 rounded bg-[#282828] border border-white/10 md:col-span-2" placeholder="Deskripsi (opsional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button type="submit" className="bg-[#1DB954] text-black rounded py-2 px-4 hover:bg-[#1ed760] md:col-span-2">
            Tambah Lapangan
          </button>
        </form>
      </div>

      <div className="bg-[#181818] p-4 rounded-lg border border-white/10">
        <h2 className="text-lg mb-3">Daftar Lapangan</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-400">
              <tr>
                <th className="p-2">Nama</th>
                <th className="p-2">Lokasi</th>
                <th className="p-2">Olahraga</th>
                <th className="p-2">Harga</th>
                <th className="p-2">Foto</th>
                <th className="p-2">Fasilitas</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(courts || []).map((court) => (
                <tr key={court.id} className="border-t border-white/10">
                  <td className="p-2">{court.name}</td>
                  <td className="p-2">{court.location}</td>
                  <td className="p-2">{court.sportType}</td>
                  <td className="p-2">Rp{Number(court.pricePerHour).toLocaleString('id-ID')}</td>
                  <td className="p-2">{court.imageUrl ? 'Ada Foto' : '-'}</td>
                  <td className="p-2 text-xs text-gray-300">{court.facilities || '-'}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(court.id)} className="text-red-400 hover:underline text-xs">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
