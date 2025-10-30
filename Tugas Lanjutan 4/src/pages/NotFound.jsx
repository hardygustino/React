import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <h2>404 - Not Found</h2>
      <Link to="/home">Kembali ke Home</Link>
    </div>
  );
}
