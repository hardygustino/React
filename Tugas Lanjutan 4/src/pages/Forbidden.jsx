import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="page">
      <h2>403 - Forbidden</h2>
      <p>Anda tidak punya hak akses ke halaman ini.</p>
      <Link to="/home">Kembali ke Home</Link>
    </div>
  );
}
