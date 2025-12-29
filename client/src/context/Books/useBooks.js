import { useContext } from "react";
import { BooksContext } from "./BooksContext";

export function useBooks() {
  const books = useContext(BooksContext);

  if (!books) {
    throw new Error(
      "Books context must be used within a BooksProvider"
    );
  }

  return books;
}
