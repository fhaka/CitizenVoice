import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const { role, fullName, logout } = useAuth();

  // show only for admin
  if (role !== "admin") return null;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const active = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="admin-nav">
      <div className="admin-nav-left">
        <Link to="/admin-home" className="admin-brand">
          {t("admin.brand")}
        </Link>
      </div>
      <div className="admin-nav-center">
        <Link className={`admin-link ${active("/admin-home")}`} to="/admin-home">
          {t("admin.nav.dashboard")}
        </Link>

        <div className="admin-dropdown">
          <button type="button" className="admin-link admin-dropdown-trigger">
            {t("admin.nav.reports")} ▾
          </button>

          <div className="admin-dropdown-menu horizontal">
            <Link to="/admin-reports">{t("admin.reports.all")}</Link>
            <Link to="/admin-reports?status=pending">{t("common.pending")}</Link>
            <Link to="/admin-reports?status=in_progress">{t("common.inProgress")}</Link>
            <Link to="/admin-reports?status=resolved">{t("common.resolved")}</Link>
            <Link to="/admin-reports?status=rejected">{t("common.rejected")}</Link>
            <Link to="/admin-audit">{t("admin.nav.auditLog")}</Link>
            <Link to="/notifications">🔔 {t("admin.nav.notifications")}</Link>
          </div>
        </div>

        <Link className={`admin-link ${active("/admin-analytics")}`} to="/admin-analytics">
          {t("admin.nav.analytics")}
        </Link>

        <Link className={`admin-link ${active("/admin-users")}`} to="/admin-users">
          {t("admin.nav.users")}
        </Link>

        <Link className={`admin-link ${active("/settings")}`} to="/settings">
          {t("nav.settings")}
        </Link>
      </div>
      <div className="admin-nav-right">
        <Link to="/profile" className="admin-user">
          👤{fullName || t("common.admin")}
          <span className="admin-role">{t("admin.roleTag")}</span>
        </Link>
      </div>
    </nav>
  );
}
