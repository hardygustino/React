import { useEffect, useState } from 'react';
import { getList } from '../api';
import AddAuthorForm from './AddAuthorForm';

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  const load = async () => {
    try {
      const list = await getList('/authors');
      setAuthors(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error('GET /authors gagal:', e);
      setAuthors([]);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Author Management</h2>
      <AddAuthorForm onCreated={load} existing={authors.map(a => a.name)} />
      {authors.length === 0 ? <p>Tidak ada data.</p> : (
        <ul>{authors.map(a => <li key={a.id ?? a.name}>{a.name}</li>)}</ul>
      )}
    </div>
  );
}
