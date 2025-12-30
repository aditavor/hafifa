import { useState, useEffect } from "react";
import { AuthorsContext } from "./AuthorsContext";
import { getAllAuthors } from "../../api/api";

export function AuthorsProvider({ children }) {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAuthors = async () => {
    setLoading(true);
    const { data } = await getAllAuthors();
    setAuthors(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const addAuthor = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor]);
  };

  const addRevenue = (value, authorId) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === authorId
          ? { ...author, revenue: author.revenue + value }
          : author
      )
    );
  };

  const deleteAuthor = (authorId) => {
    setAuthors((prev) => prev.filter((author) => author.id !== authorId));
  };

  return (
    <AuthorsContext.Provider
      value={{ authors, loading, fetchAuthors, addAuthor, deleteAuthor, addRevenue }}
    >
      {children}
    </AuthorsContext.Provider>
  );
}
