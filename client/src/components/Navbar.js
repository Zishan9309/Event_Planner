import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* BRAND */}
      <div className="navbar-brand">
        <FaCalendarAlt className="brand-icon" />
        <Link to="/" className="brand-text">
          EventPlanner
        </Link>
      </div>

      {/* LINKS */}
      <div className="navbar-links">
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token && <Link to="/create">Create Event</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
