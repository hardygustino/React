import React from "react";
import { useBooks } from "../hooks/useBooks";
import BookCard from "../components/BookCard";

export default function Home() {
  const { books } = useBooks(); 

  return (
    <div className="container">
      <h1 className="page-title">Daftar Buku (Home)</h1>
      <div className="grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}
