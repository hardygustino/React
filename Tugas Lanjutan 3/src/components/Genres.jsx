import { useEffect, useState } from 'react';
import { getList, api } from '../api';
import AddGenreForm from './AddGenreForm';

const slugify = s =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g,'')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-');

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const load = async () => {
    const list = await getList('/genres');
    setGenres(Array.isArray(list) ? list : []);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (g) => {
    setEditingId(g.id);
    setEditingName(g.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEdit = async () => {
    const n = editingName.trim();
    if (!n) return alert('Nama tidak boleh kosong');
    try {
      await api.patch(`/genres/${editingId}`, { name: n, slug: slugify(n) });
      cancelEdit();
      await load();
    } catch (err) {
      const msg = err.response?.data?.message
        || JSON.stringify(err.response?.data?.errors || err.message);
      alert('Gagal update genre: ' + msg);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Yakin hapus genre ini?')) return;
    try {
      await api.delete(`/genres/${id}`);
      await load();
    } catch (err) {
      const msg = err.response?.data?.message
        || JSON.stringify(err.response?.data?.errors || err.message);
      alert('Gagal hapus genre: ' + msg);
    }
  };

  return (
    <div>
      <h2>Genre Management</h2>
      <AddGenreForm onCreated={load} existing={genres.map(g => g.name)} />

      {genres.length === 0 ? <p>Tidak ada data.</p> : (
        <ul style={{paddingLeft:18}}>
          {genres.map(g => (
            <li key={g.id ?? g.name} style={{marginBottom:6}}>
              {editingId === g.id ? (
                <>
                  <input
                    value={editingName}
                    onChange={(e)=>setEditingName(e.target.value)}
                    style={{marginRight:8}}
                  />
                  <button onClick={saveEdit} style={{marginRight:6}}>Simpan</button>
                  <button onClick={cancelEdit}>Batal</button>
                </>
              ) : (
                <>
                  <span style={{marginRight:10}}>{g.name}</span>
                  <button onClick={()=>startEdit(g)} style={{marginRight:6}}>Edit</button>
                  <button onClick={()=>remove(g.id)}>Hapus</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
