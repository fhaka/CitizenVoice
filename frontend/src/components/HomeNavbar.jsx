import { Link, useNavigate } from "react-router-dom";
import "./GuestNavbar.css";

export default function HomeNavbar() {
  const navigate = useNavigate();

  function handleLogoClick(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <nav className="guest-nav">
      <div className="guest-nav-left">
        <a href="/" onClick={handleLogoClick} className="guest-brand">
          CitizenVoice
        </a>
      </div>

      <div className="guest-nav-center">
        <Link className="guest-link" to="/login">
          Community Reports
        </Link>

        <div className="guest-dropdown">
          <button type="button" className="guest-link guest-dropdown-trigger">
            Help Center ▾
          </button>
          <div className="guest-dropdown-menu">
            <Link to="/how-it-works">How it works</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/contact">Contact</Link>
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
