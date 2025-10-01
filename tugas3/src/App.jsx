import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="topnav">
        <div className="topnav-inner">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/book">Book</NavLink>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}
