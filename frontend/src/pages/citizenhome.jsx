import "./CitizenHome.css";
import { Link } from "react-router-dom";
import bgImage from "../assets/citizencover.jpg";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function CitizenHome() {
  const { t } = useTranslation();
  const fullName = localStorage.getItem("full_name") || "";

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "☀️";
    if (h < 18) return "🌤️";
    return "🌙";
  }, []);

  return (
    <div className="citizen-bg" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="citizen-container">
        <div className="citizen-header">
          <div className="citizen-hero-row">
            <div>
              <h1>
                {greeting} {t("citizenHome.welcome")}
                {fullName ? `, ${fullName}` : ""} 👋
              </h1>
              <p>{t("citizenHome.subtitle")}</p>
            </div>

            <div className="citizen-hero-actions">
              <Link className="pill-link" to="/profile">
                👤 {t("citizenHome.top.profile")}
              </Link>
              <Link className="pill-link" to="/settings">
                ⚙️ {t("citizenHome.top.settings")}
              </Link>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <Link to="/report" className="action-card">
            <h3>📝 {t("citizenHome.actions.report.title")}</h3>
            <p>{t("citizenHome.actions.report.desc")}</p>
            <div className="card-cta">{t("citizenHome.cta.start")}</div>
          </Link>

          <Link to="/my-reports" className="action-card">
            <h3>📂 {t("citizenHome.actions.myReports.title")}</h3>
            <p>{t("citizenHome.actions.myReports.desc")}</p>
            <div className="card-cta">{t("citizenHome.cta.view")}</div>
          </Link>

          <Link to="/community" className="action-card">
            <h3>🌍 {t("citizenHome.actions.community.title")}</h3>
            <p>{t("citizenHome.actions.community.desc")}</p>
            <div className="card-cta">{t("citizenHome.cta.explore")}</div>
          </Link>
        </div>

        <div className="citizen-grid-2">
          <div className="section-card">
            <div className="section-head">
              <h2>🧠 {t("citizenHome.helpCenter.title")}</h2>
              <span className="muted">{t("citizenHome.helpCenter.subtitle")}</span>
            </div>

            <div className="mini-links">
              <Link className="mini-link" to="/how-it-works">
                📌 {t("citizenHome.helpCenter.links.how")}
              </Link>
              <Link className="mini-link" to="/faqs">
                ❓ {t("citizenHome.helpCenter.links.faqs")}
              </Link>
              <Link className="mini-link" to="/contact">
                ✉️ {t("citizenHome.helpCenter.links.contact")}
              </Link>
              <Link className="mini-link" to="/question">
                📝 {t("citizenHome.helpCenter.links.ask")}
              </Link>
            </div>

            <div className="mini-note">{t("citizenHome.helpCenter.tip")}</div>
          </div>

          <div className="section-card">
            <div className="section-head">
              <h2>📚 {t("citizenHome.resources.title")}</h2>
              <span className="muted">{t("citizenHome.resources.subtitle")}</span>
            </div>

            <div className="resource-grid">
              <Link className="resource-tile" to="/resources">
                🗺️ {t("citizenHome.resources.tiles.city")}
                <span className="muted">{t("citizenHome.resources.tiles.citySub")}</span>
              </Link>

              <Link className="resource-tile" to="/community">
                📢 {t("citizenHome.resources.tiles.feed")}
                <span className="muted">{t("citizenHome.resources.tiles.feedSub")}</span>
              </Link>

              <Link className="resource-tile" to="/my-reports">
                ✅ {t("citizenHome.resources.tiles.track")}
                <span className="muted">{t("citizenHome.resources.tiles.trackSub")}</span>
              </Link>

              <Link className="resource-tile" to="/report">
                ➕ {t("citizenHome.resources.tiles.newReport")}
                <span className="muted">{t("citizenHome.resources.tiles.newReportSub")}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="citizen-footer-cta">
          <div>
            <b>{t("citizenHome.footer.title")}</b>
            <div className="muted">{t("citizenHome.footer.subtitle")}</div>
          </div>

          <div className="footer-cta-actions">
            <Link className="btn-outline" to="/faqs">
              {t("citizenHome.footer.faqs")}
            </Link>
            <Link className="btn-dark" to="/contact">
              {t("citizenHome.footer.contact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
