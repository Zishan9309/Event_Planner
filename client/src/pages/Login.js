import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      // Small delay for smooth UX
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      setError("❌ Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Welcome Back 👋</h2>

        {error && (
          <p style={{
            background: "rgba(239,68,68,0.2)",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "15px",
            textAlign: "center"
          }}>
            {error}
          </p>
        )}

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="📧 Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.9 }}>
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#fff", fontWeight: "600", textDecoration: "underline" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
