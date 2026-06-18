import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import signupImage from "../assets/login.jpeg";
import "./auth.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    role: "citizen",
    full_name: "",
    personal_id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (!agreed) {
      alert(t("auth.mustConfirm"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert(t("auth.passwordMismatch"));
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        role: formData.role,
        full_name: formData.full_name.trim(),
        personal_id: formData.personal_id.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      alert(t("auth.accountCreated"));
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || t("auth.signupFailed"));
    }
  }

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${signupImage})` }}>
      <div className="auth-lang">
        <LanguageSwitcher />
      </div>

      <div className="auth-shell">
        {/* LEFT: Branding panel */}
        <div className="auth-side">
          <div className="auth-side-inner">
            <div className="auth-brand">
              <div className="auth-brand-mark">CV</div>
              <div className="auth-brand-text">
                <div className="auth-brand-title">CitizenVoice</div>
                <div className="auth-brand-subtitle">{t("admin.brand")}</div>
              </div>
            </div>

            <div className="auth-side-line" />

            <div className="auth-side-hint">
              {t("adminHome.subtitle")}
            </div>
          </div>
        </div>

        {/* RIGHT: Form panel */}
        <div className="auth-panel">
          <div className="auth-icon">📝</div>
          <h2 className="auth-heading">{t("auth.signupTitle")}</h2>

          <form className="auth-form" onSubmit={handleSignup}>
            <div className="auth-field">
              <span className="auth-field-ico">👤</span>
              <input
                name="full_name"
                placeholder={t("profile.fullName")}
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <span className="auth-field-ico">🪪</span>
              <input
                name="personal_id"
                placeholder={t("profile.personalId")}
                value={formData.personal_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <span className="auth-field-ico">✉️</span>
              <input
                name="email"
                type="email"
                placeholder={t("profile.email")}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <span className="auth-field-ico">🔒</span>
              <input
                name="password"
                type="password"
                placeholder={t("auth.password")}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <span className="auth-field-ico">✅</span>
              <input
                name="confirmPassword"
                type="password"
                placeholder={t("creds.confirmNewPassword")}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <label className="auth-check wide">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>{t("auth.agreeText")}</span>
            </label>

            <button className="auth-btn" type="submit" disabled={!agreed}>
              {t("common.save")}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {t("auth.alreadyHaveAccount")}{" "}
              <Link to="/login">{t("nav.login")}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
