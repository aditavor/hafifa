import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import { ToastContainer } from "react-toastify";
import Customers from "./Pages/Customers/Customers.jsx";
import "react-toastify/dist/ReactToastify.css";
import Publishers from "./Pages/Publishers/Publishers.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publishers" element={<Publishers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
