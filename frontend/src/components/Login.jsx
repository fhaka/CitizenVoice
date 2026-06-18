import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import loginImage from "../assets/login.jpeg";
import "./auth.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    personal_id: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        personal_id: formData.personal_id.trim(),
        password: formData.password,
      });

      const { token, user } = res.data;

      login({
        token,
        role: user.role,
        full_name: user.full_name,
      });

      navigate(user.role === "admin" ? "/admin-home" : "/citizen-home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${loginImage})` }}>
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
          <div className="auth-icon">👥</div>
          <h2 className="auth-heading">{t("nav.login")}</h2>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <span className="auth-field-ico">🪪</span>
              <input
                type="text"
                name="personal_id"
                placeholder={t("profile.personalId")}
                value={formData.personal_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <span className="auth-field-ico">🔒</span>
              <input
                type="password"
                name="password"
                placeholder={t("creds.currentPassword")}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? t("common.loading") : t("nav.login")}
            </button>
          </form>

          <div className="auth-footer">
            <p>

              <Link to="/signup">{t("auth.createAccount") || "Create account"}</Link>
            </p>

            <p>
              <Link to="/guest">{t("home.continueGuest")}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
