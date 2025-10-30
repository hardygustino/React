import { useEffect, useState } from 'react';
import { getList, api } from '../api';
import AddAuthorForm from './AddAuthorForm';

const slugify = s =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g,'')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-');

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const load = async () => {
    const list = await getList('/authors');
    setAuthors(Array.isArray(list) ? list : []);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (a) => {
    setEditingId(a.id);
    setEditingName(a.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEdit = async () => {
    const n = editingName.trim();
    if (!n) return alert('Nama tidak boleh kosong');
    try {
      await api.patch(`/authors/${editingId}`, { name: n, slug: slugify(n) });
      cancelEdit();
      await load();
    } catch (err) {
      const msg = err.response?.data?.message
        || JSON.stringify(err.response?.data?.errors || err.message);
      alert('Gagal update author: ' + msg);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Yakin hapus author ini?')) return;
    try {
      await api.delete(`/authors/${id}`);
      await load();
    } catch (err) {
      const msg = err.response?.data?.message
        || JSON.stringify(err.response?.data?.errors || err.message);
      alert('Gagal hapus author: ' + msg);
    }
  };

  return (
    <div>
      <h2>Author Management</h2>
      <AddAuthorForm onCreated={load} existing={authors.map(a => a.name)} />

      {authors.length === 0 ? <p>Tidak ada data.</p> : (
        <ul style={{paddingLeft:18}}>
          {authors.map(a => (
            <li key={a.id ?? a.name} style={{marginBottom:6}}>
              {editingId === a.id ? (
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
                  <span style={{marginRight:10}}>{a.name}</span>
                  <button onClick={()=>startEdit(a)} style={{marginRight:6}}>Edit</button>
                  <button onClick={()=>remove(a.id)}>Hapus</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
