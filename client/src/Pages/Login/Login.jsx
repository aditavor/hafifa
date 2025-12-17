import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../authentication.scss";
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
      navigate("/home");
    } catch (err) {
      setError("Error. please try again");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>

        {error && <p className="auth-error">{error}</p>}

        <label className="auth-label">Username</label>
        <input
          type="text"
          className="auth-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="auth-label">Password</label>
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="auth">
          <p>Dont have an account? </p>
          <Link to="/Register" className="link">
            Register
          </Link>
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
