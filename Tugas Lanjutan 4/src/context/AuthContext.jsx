import { createContext, useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/users";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {username, role}

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (username, password) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return { ok: false, msg: "Username / password salah." };

    const payload = { username: found.username, role: found.role, name: found.name };
    localStorage.setItem("currentUser", JSON.stringify(payload));
    setUser(payload);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
