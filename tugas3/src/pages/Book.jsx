import React, { useMemo, useState } from "react";
import initialBooks from "../utils/books";
import BookCard from "../components/BookCard";

export default function Book() {
  const [bookList, setBookList] = useState([...initialBooks]);

  const handleAddBook = () => {
    const newBook = {
      id: bookList.length + 1,
      title: "Belajar React Hooks",
      author: "Hardy Gustino",
      year: 2025,
      price: "Rp 100.000",
      cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop"
    };
    setBookList((prev) => [...prev, newBook]);
  };


  const total = useMemo(() => bookList.length, [bookList]);

  return (
    <div className="container">
      <div className="toolbar">
        <h1 className="page-title" style={{ margin: 0 }}>Halaman Book</h1>
        <div>
          <button className="btn" onClick={handleAddBook}>Tambah Buku Baru</button>
          <div className="small muted" style={{ marginTop: 6, textAlign: "right" }}>
            Total: {total} buku
          </div>
        </div>
      </div>

      <div className="grid">
        {bookList.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}
