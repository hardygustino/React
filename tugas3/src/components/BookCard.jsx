import React from "react";

export default function BookCard({ book }) {
  return (
    <div className="card">
      <div className="card-media">
        <img src={book.cover} alt={book.title} />
        <div className="badge">{book.year}</div>
      </div>
      <div className="card-body">
        <div className="card-title">{book.title}</div>
        <p className="muted">Penulis: {book.author}</p>
        <p className="price">{book.price}</p>
      </div>
    </div>
  );
}
