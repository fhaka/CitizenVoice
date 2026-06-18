import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./GuestNavbar.css";

export default function GuestNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, role } = useAuth();

  // If user becomes logged in, don't show guest navbar
  if (token && (role === "admin" || role === "citizen")) return null;

  const onGuestPage = location.pathname.startsWith("/guest");

  function handleLogoClick(e) {
    e.preventDefault();
    navigate("/guest");
  }

  // Requirement:
  // - On Home (not logged in), clicking Community Reports should send to login
  // - On Guest interface, Community Reports should stay in guest
  const communityHref = "/guest/community";

  return (
    <nav className="guest-nav">
      <div className="guest-nav-left">
        <a href="/guest" onClick={handleLogoClick} className="guest-brand">
          CitizenVoice
        </a>
      </div>

      <div className="guest-nav-center">
        <Link className="guest-link" to={communityHref}>
          Community Reports
        </Link>

        <div className="guest-dropdown">
          <button type="button" className="guest-link guest-dropdown-trigger">
            Help Center ▾
          </button>
          <div className="guest-dropdown-menu">
            <Link to="/guest/how-it-works">How it works</Link>
            <Link to="/guest/faqs">FAQs</Link>
          </div>
        </div>
      </div>

      <div className="guest-nav-right">
        <Link className="guest-login" to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
}
