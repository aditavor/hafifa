import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import { BooksProvider } from "./context/Books/BooksProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BooksProvider>
      <App />
    </BooksProvider>
  </StrictMode>
);
