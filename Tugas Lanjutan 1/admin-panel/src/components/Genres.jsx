import { useEffect, useState } from 'react';
import { getList } from '../api';
import AddGenreForm from './AddGenreForm';

export default function Genres() {
  const [genres, setGenres] = useState([]);

  const load = async () => {
    try {
      const list = await getList('/genres');
      setGenres(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error('GET /genres gagal:', e);
      setGenres([]);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Genre Management</h2>
      <AddGenreForm onCreated={load} existing={genres.map(g => g.name)} />
      {genres.length === 0 ? <p>Tidak ada data.</p> : (
        <ul>{genres.map(g => <li key={g.id ?? g.name}>{g.name}</li>)}</ul>
      )}
    </div>
  );
}
