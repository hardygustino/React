import { useEffect, useState } from "react";
import defaultBooks from "../utils/books";

const STORAGE_KEY = "books_data_v1";

export function useBooks() { 
  const [books, setBooks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultBooks;
    } catch {
      return defaultBooks;
    }
  });

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {}
  }, [books]);

  const reset = () => setBooks(defaultBooks);

  return { books, setBooks, reset };
}
