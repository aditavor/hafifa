import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./Pages/Library/Library.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import { ToastContainer } from "react-toastify";
import Customers from "./Pages/Customers/Customers.jsx";
import "react-toastify/dist/ReactToastify.css";
import Publishers from "./Pages/Publishers/Publishers.jsx";
import Home from "./Pages/Home/Home.jsx";
import Personal from "./Pages/Personal/Personal.jsx";

import MainLayout from "./Routes/MainLayout";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/library" element={<Library />} />
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/publishers" element={<Publishers />} />
            <Route path="/personal" element={<Personal />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
