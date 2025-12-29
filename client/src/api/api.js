const path = "http://localhost:3000/";
import axios from "axios";

export const getAllBooks = async () => {
  const res = await axios.get(path + "books");
  return {
    data: res.data,
    status: res.status,
  };
};

export const getUserstimeoutBooks = async (userId) => {
  const res = await axios.get(path + "books/" + userId + "/timeout");
  return {
    data: res.data,
    status: res.status,
  };
};

export const borrowBook = async (bookId, id) => {
  try {
    const res = await axios.put(path + "books/" + bookId + "/borrow", {
      userId: id,
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (err) {
    return {
      data: err.response?.data,
      status: err.response?.status || 500,
    };
  }
};

export const returnBook = async (bookId) => {
  try {
    const res = await axios.put(path + "books/" + bookId + "/return");
    return {
      data: res.data,
      status: res.status,
    };
  } catch (err) {
    return {
      data: err.response?.data,
      status: err.response?.status || 500,
    };
  }
};

export const deleteBook = async (bookId) => {
  try {
    const res = await axios.delete(path + "books/" + bookId);
    return {
      status: res.status,
    };
  } catch (err) {
    return {
      data: err.response?.data,
      status: err.response?.status || 500,
    };
  }
};

export const getUsersBooks = async (userId) => {
  const res = await axios.get(path + "users/" + userId + "/books");
  return {
    data: res.data,
    status: res.status,
  };
};

export const getAllUsers = async () => {
  const res = await axios.get(path + "users");
  return {
    data: res.data,
    status: res.status,
  };
};

export const bestSellersBooks = async () => {
  const res = await axios.get(path + "books/bestSellers");
  return {
    data: res.data,
    status: res.status,
  };
};

export const getAllAuthors = async () => {
  const res = await axios.get(path + "authors");
  return {
    data: res.data,
    status: res.status,
  };
};

export const addPost = async (name, price, authorId, pages) => {
  try {
    const res = await axios.post(path + "books", {
      name,
      price,
      authorId,
      pages,
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (err) {
    return {
      data: err.response?.data,
      status: err.response?.status || 500,
    };
  }
};

export const login = async (username, password) => {
  try {
    const res = await axios.post(path + "users/login", { username, password });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (err) {
    return {
      data: err.response?.data,
      status: err.response?.status || 500,
    };
  }
};

export const register = async (username, password, email, securityCode) => {
  try {
    const res = await axios.post(path + "users/register", {
      username,
      password,
      email,
      securityCode,
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (err) {
    return {
      data: err.response?.data,
      status: err.response?.status || 500,
    };
  }
};

export const addAuthor = async (name) => {
  try {
    const res = await axios.post(path + "authors", { name });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (err) {
    return {
      data: err.response?.data,
      status: err.response?.status || 500,
    };
  }
};

export const updateBalance = async (userId, amount) => {
  try {
    const res = await axios.put(
      path + "users/" + userId + "/balance/" + amount
    );
    return {
      data: res.data,
      status: res.status,
    };
  } catch (err) {
    return {
      data: err.response?.data,
      status: err.response?.status || 500,
    };
  }
};

export const getUsersBalance = async (userId) => {
  const res = await axios.get(path + "users/" + userId + "/balance");
  return {
    data: res.data,
    status: res.status,
  };
};
