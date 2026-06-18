import { Link } from "react-router-dom";
import "./HelpCenter.css";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <div className="help-wrap">
      <div className="help-header">
        <h1 className="help-title">{t("help.how.title")}</h1>
        <p className="help-sub">{t("help.how.subtitle")}</p>

        <div className="help-cta-row">
          <Link to="/faqs" className="help-btn secondary">
            {t("help.how.ctaFaq")}
          </Link>
          <Link to="/contact" className="help-btn">
            {t("help.how.ctaContact")}
          </Link>
        </div>
      </div>

      <div className="how-grid">
        <div className="how-card">
          <div className="how-step">1</div>
          <div className="how-title">{t("help.how.steps.guest.title")}</div>
          <div className="how-text">{t("help.how.steps.guest.desc")}</div>
        </div>

        <div className="how-card">
          <div className="how-step">2</div>
          <div className="how-title">{t("help.how.steps.account.title")}</div>
          <div className="how-text">{t("help.how.steps.account.desc")}</div>
        </div>

        <div className="how-card">
          <div className="how-step">3</div>
          <div className="how-title">{t("help.how.steps.report.title")}</div>
          <div className="how-text">{t("help.how.steps.report.desc")}</div>
        </div>

        <div className="how-card">
          <div className="how-step">4</div>
          <div className="how-title">{t("help.how.steps.track.title")}</div>
          <div className="how-text">{t("help.how.steps.track.desc")}</div>
        </div>

        <div className="how-card">
          <div className="how-step">5</div>
          <div className="how-title">{t("help.how.steps.admin.title")}</div>
          <div className="how-text">{t("help.how.steps.admin.desc")}</div>
        </div>

        <div className="how-card">
          <div className="how-step">6</div>
          <div className="how-title">{t("help.how.steps.informed.title")}</div>
          <div className="how-text">{t("help.how.steps.informed.desc")}</div>
        </div>
      </div>

      <div className="help-footer">
        <div className="help-footer-card">
          <div className="help-footer-title">{t("help.how.footer.title")}</div>
          <div className="help-footer-text">{t("help.how.footer.desc")}</div>
          <div className="help-cta-row">
            <Link to="/faqs" className="help-btn secondary">
              {t("help.how.ctaFaq")}
            </Link>
            <Link to="/contact" className="help-btn">
              {t("help.how.ctaContact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
