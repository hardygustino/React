import React, { useMemo, useState } from "react";
import { useBooks } from "../hooks/useBooks";
import BookCard from "../components/BookCard";
import AddBookForm from "../components/AddBookForm";

export default function Book() {
  const { books: bookList, setBooks: setBookList } = useBooks();  // <— ini kuncinya
  const [showForm, setShowForm] = useState(false);

  const total = useMemo(() => bookList.length, [bookList]);

  const handleAdd = (payload) => {
    const newBook = { id: bookList.length + 1, ...payload };
    setBookList((prev) => [newBook, ...prev]); // otomatis tersimpan ke localStorage oleh hook
    setShowForm(false);
  };

  return (
    <div className="container">
      <div className="toolbar">
        <h1 className="page-title" style={{ margin: 0 }}>Halaman Book</h1>
        <div>
          <button className="btn" onClick={() => setShowForm(true)}>Tambah Buku Baru</button>
          <div className="small muted" style={{ marginTop: 6, textAlign: "right" }}>
            Total: {total} buku
          </div>
        </div>
      </div>

      {showForm && (
        <div style={{ marginBottom: 16 }}>
          <AddBookForm onAdd={handleAdd} onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className="grid">
        {bookList.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}
