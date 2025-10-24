import Authors from './components/Authors';
import Genres from './components/Genres';

export default function App() {
  return (
    <div style={{ padding:20, maxWidth:720, margin:'0 auto' }}>
      <h1>Admin Panel</h1>
      <Authors />
      <hr style={{ margin:'24px 0' }} />
      <Genres />
    </div>
  );
}
