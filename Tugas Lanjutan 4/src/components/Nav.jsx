import { Link, useNavigate } from "react-router-dom";
import { clearCurrentUser, getCurrentUser } from "../utils/auth";

export default function Nav() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const logout = () => {
    clearCurrentUser();
    navigate("/login", { replace: true });
  };

  return (
    <nav style={{ display: "flex", gap: 12, padding: 12 }}>
      <Link to="/home">Home</Link>
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      {user ? (
        <>
          <span>| {user.username} ({user.role})</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
