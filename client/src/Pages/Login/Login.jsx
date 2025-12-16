import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Enter username and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login error");
        return;
      }

      localStorage.setItem("user_id", data.user.id);
      localStorage.setItem("is_worker", data.user.is_worker);
      toast.success("Logged in to " + username, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate("/library");
    } catch (err) {
      setError("Error. please try again");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <label className="login-label">Username</label>
        <input
          type="text"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="login-label">Password</label>
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="register">
          <p>Dont have an account? </p>
          <Link to="/Register" className="link">
            Register
          </Link>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
