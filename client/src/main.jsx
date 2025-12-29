import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import { BooksProvider } from "./context/Books/BooksProvider.jsx";
import { AuthorsProvider } from "./context/Authors/AuthorsProvider.jsx";
import { BalanceProvider } from "./context/Balance/BalanceProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BooksProvider>
      <AuthorsProvider>
        <BalanceProvider>
          <App />
        </BalanceProvider>
      </AuthorsProvider>
    </BooksProvider>
  </StrictMode>
);
