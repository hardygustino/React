import { useState } from 'react';
import { api } from '../api';

const slugify = s =>
  s.toLowerCase().trim()
   .replace(/[^a-z0-9\s-]/g,'')
   .replace(/\s+/g,'-')
   .replace(/-+/g,'-');

export default function AddGenreForm({ onCreated, existing = [] }) {
  const [name, setName] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return alert('Nama genre tidak boleh kosong');
    if (existing.map(v => v.toLowerCase()).includes(n.toLowerCase()))
      return alert('Genre sudah ada');
    try {
      await api.post('/genres', { name: n, slug: slugify(n) });
      setName('');
      onCreated && onCreated();
    } catch (err) {
      const msg = err.response?.data?.message
        || JSON.stringify(err.response?.data?.errors || err.message);
      alert('Gagal menambah genre: ' + msg);
      console.error(err.response?.data || err);
    }
  };

  return (
    <form onSubmit={submit} className="row">
      <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Nama Genre"
      />
      <button type="submit">Tambah</button>
    </form>
  );
}
