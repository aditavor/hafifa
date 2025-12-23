import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../authentication.scss";
import { register } from "../../api/api";

function Register() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const SECURITY_CODE = "YYYYYYYY";
  let registeredAsWorker = false;

  const handleOnChange = () => {
    if (!isChecked) {
      setSecurityCode("");
    }
    setIsChecked(!isChecked); // Toggle the state
  };

  const validateUsernameFormat = () => {
    const usernameRegex = /^[A-Za-z0-9]{8,24}$/;
    return usernameRegex.test(username);
  };

  const validateEmailFormat = () => {
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password || !email) {
      setError("Enter username and password");
      return;
    }

    if (password !== validatePassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validateUsernameFormat()) {
      setError("Username must be 8-24 letters and number");
      return;
    }

    if (!validateEmailFormat()) {
      setError("Email format is invalid");
      return;
    }

    if (securityCode === SECURITY_CODE) {
      registeredAsWorker = true;
    }

    const { data, status } = await register(
      username,
      password,
      email,
      registeredAsWorker
    );

    if (status !== 201) {
      setError(data.message || "Register error");
      return;
    }

    localStorage.setItem("user_id", data.user.id);
    localStorage.setItem("is_worker", data.user.is_worker);
    const message = `Registered to user ${username} ${
      registeredAsWorker ? "as worker" : ""
    }`;
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2 className="auth-title">Register</h2>

        {error && <p className="auth-error">{error}</p>}

        <label className="auth-label">Username</label>
        <input
          type="text"
          className="auth-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="auth-label">Email</label>
        <input
          type="text"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="auth-label">Password</label>
        <input
          type="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="auth-label">Vaidate Password</label>
        <input
          type="password"
          className="auth-input"
          value={validatePassword}
          onChange={(e) => setValidatePassword(e.target.value)}
        />

        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleOnChange}
          />
          Are you a worker?
        </div>

        {isChecked && (
          <>
            <label className="auth-label">Security code- ONE try...</label>
            <input
              type="text"
              className="auth-input"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
            />
          </>
        )}

        <div className="auth">
          <p>Already have an account?</p>
          <Link to="/login" className="link">
            Login
          </Link>
        </div>
        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
