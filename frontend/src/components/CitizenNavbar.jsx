import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";
import "./CitizenNavbar.css";

export default function CitizenNavbar() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const { t } = useTranslation();

  const fullName = localStorage.getItem("full_name") || t("common.citizen");
  const [helpOpen, setHelpOpen] = useState(false);

  function handleLogoClick(e) {
    e.preventDefault();
    navigate(token ? "/citizen-home" : "/");
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const showCenter = !!token;

  return (
    <div className="citizen-nav">
      {/* LEFT */}
      <div className="citizen-nav-left">
        <a href="#" onClick={handleLogoClick} className="citizen-logo">
          CitizenVoice
        </a>
      </div>

      {/* CENTER */}
      <div className={`citizen-nav-center ${showCenter ? "" : "hidden"}`}>
        <NavLink className="citizen-link" to="/report">
          {t("nav.report")}
        </NavLink>
        <NavLink className="citizen-link" to="/my-reports">
          {t("nav.myReports")}
        </NavLink>
        <NavLink className="citizen-link" to="/community">
          {t("nav.community")}
        </NavLink>

        <div
          className="citizen-dropdown"
          onMouseEnter={() => setHelpOpen(true)}
          onMouseLeave={() => setHelpOpen(false)}
        >
          <button className="citizen-dropdown-trigger" type="button">
            {t("nav.helpCenter")} ▾
          </button>

          <div className={`citizen-dropdown-menu ${helpOpen ? "show" : ""}`}>
            <Link to="/how-it-works">{t("nav.howItWorks")}</Link>
            <Link to="/faqs">{t("nav.faqs")}</Link>
            <Link to="/contact">{t("nav.contact")}</Link>
          </div>
        </div>
      </div>

      {/* RIGHT (NO dropdown anymore) */}
      <div className="citizen-nav-right">
        {token ? (
          <>
            <NavLink className="citizen-link" to="/profile">
              👤 {fullName}
            </NavLink>

            <NavLink className="citizen-link" to="/settings">
              {t("nav.settings")}
            </NavLink>

            <button
              type="button"
              className="citizen-link"
              onClick={handleLogout}
              style={{ background: "transparent", border: "none" }}
            >
              {t("profile.logout")}
            </button>
          </>
        ) : (
          <Link className="citizen-link" to="/login">
            {t("nav.login")}
          </Link>
        )}
      </div>
    </div>
  );
}
