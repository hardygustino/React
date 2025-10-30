import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsers, saveUsers } from "../utils/users";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // <--- default: user
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setMsg("");

    if (!name || !email || !username || !password) {
      setMsg("Semua field wajib diisi.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMsg("Format email tidak valid.");
      return;
    }

    const users = getUsers();

    if (users.some(u => u.email === email)) {
      setMsg("Email sudah terdaftar.");
      return;
    }

    if (users.some(u => u.username === username)) {
      setMsg("Username sudah dipakai.");
      return;
    }

    // simpan user baru
    users.push({ name, email, username, password, role });
    saveUsers(users);

    setMsg("Registrasi berhasil! Mengarahkan ke login…");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Create Account</h1>
        {msg && <div style={{ marginBottom: 12 }}>{msg}</div>}

        <form onSubmit={submit}>
          <div className="form-grid">
            <div className="form-row">
              <label>Nama Lengkap</label>
              <input value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="form-row">
              <label>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="form-row">
              <label>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* Pilihan Role */}
            <div className="form-row">
              <label>Pilih Role</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="actions">
            <button className="btn" type="submit">Daftar</button>
            <span>Sudah punya akun? <Link to="/login">Login di sini</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}
