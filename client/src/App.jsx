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

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/library" element={<Library />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/personal" element={<Personal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
