import React from "react";
import books from "../utils/books";
import BookCard from "../components/BookCard";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1 className="page-title">Daftar Buku (Home)</h1>
        <div className="grid">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </div>
    </>
  );
}
