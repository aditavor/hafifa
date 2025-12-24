import { useContext } from "react";
import { AuthorsContext } from "./AuthorsContext";

export function useAuthors() {
  const authors = useContext(AuthorsContext);

  if (!authors) {
    throw new Error("Authors context must be used within an AuthorProvider");
  }

  return authors;
}
