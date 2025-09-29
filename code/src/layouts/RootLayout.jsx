import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <nav style={{display:"flex", gap:16, padding:12, borderBottom:"1px solid #eee"}}>
        <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink>
        <NavLink to="/about/team" className={({isActive}) => isActive ? "active" : ""}>Team</NavLink>
        <NavLink to="/about/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink>
      </nav>
      <main style={{padding:16}}>
        <Outlet />
      </main>
    </>
  );
}
