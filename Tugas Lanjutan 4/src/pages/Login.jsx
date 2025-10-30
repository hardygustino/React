import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../utils/users";
import { saveCurrentUser } from "../utils/auth";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setMsg("");

    if (!usernameOrEmail || !password) {
      setMsg("Isi username/email dan password.");
      return;
    }

    const users = getUsers();

    const found = users.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    );

    if (!found) {
      setMsg("Kredensial salah atau akun tidak ditemukan.");
      return;
    }

    // simpan session
    saveCurrentUser(found);

    // redirect sesuai role
    if (found.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Masuk</h1>
        {msg && <div style={{ marginBottom: 12 }}>{msg}</div>}

        <form onSubmit={submit}>
          <div className="form-grid">
            <div className="form-row">
              <label>Username / Email</label>
              <input
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="actions">
            <button className="btn" type="submit">Login</button>
            <span>Belum punya akun? <Link to="/register">Daftar</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}
