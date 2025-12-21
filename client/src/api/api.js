const path = "http://localhost:3000/";
import axios from "axios";

export const getAllBooks = async () => {
  const res = await axios.get(path + "books");
  return {
    data: res.data,
    status: res.status,
  };
};

export const borrowBook = async (bookId, id) => {
  const res = await axios.put(path + "books/" + bookId + "/borrow", {
    userId: id,
  });
  return {
    data: res.data,
    status: res.status,
  };
};
