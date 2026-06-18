import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

const THEME_KEY = "cv_theme";
const DENSITY_KEY = "cv_density";
const NOTIF_KEY = "cv_notifications";
const LOCALE_KEY = "cv_locale";
const REDUCE_MOTION_KEY = "cv_reduce_motion";
const HIGH_CONTRAST_KEY = "cv_high_contrast";

export default function Settings() {
  const navigate = useNavigate();
  const { role, fullName, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const token = localStorage.getItem("token");

  const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) || "system");
  const [density, setDensity] = useState(localStorage.getItem(DENSITY_KEY) || "comfortable");
  const [locale, setLocale] = useState(localStorage.getItem(LOCALE_KEY) || i18n.language || "en");

  const [reduceMotion, setReduceMotion] = useState(localStorage.getItem(REDUCE_MOTION_KEY) === "1");
  const [highContrast, setHighContrast] = useState(localStorage.getItem(HIGH_CONTRAST_KEY) === "1");

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(NOTIF_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          inApp: true,
          email: false,
          reportUpdates: true,
          communityDigest: false,
          adminAlerts: role === "admin",
        };
  });

  const displayName = useMemo(() => {
    const ls = localStorage.getItem("full_name");
    return ls || fullName || (role === "admin" ? t("common.admin") : t("common.citizen"));
  }, [fullName, role, t]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(DENSITY_KEY, density);
    localStorage.setItem(REDUCE_MOTION_KEY, reduceMotion ? "1" : "0");
    localStorage.setItem(HIGH_CONTRAST_KEY, highContrast ? "1" : "0");

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.density = density;
    root.dataset.reduceMotion = reduceMotion ? "1" : "0";
    root.dataset.contrast = highContrast ? "high" : "normal";
  }, [theme, density, reduceMotion, highContrast]);

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  useEffect(() => {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
  }, [notifications]);

  function toggleNotif(key) {
    setNotifications((p) => ({ ...p, [key]: !p[key] }));
  }

  function exportMyData() {
    const payload = {
      exported_at: new Date().toISOString(),
      role,
      full_name: localStorage.getItem("full_name") || displayName,
      token_present: !!localStorage.getItem("token"),
      preferences: {
        theme,
        density,
        locale,
        reduceMotion,
        highContrast,
        notifications,
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "citizenvoice-settings-export.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  function clearCacheOnly() {
    localStorage.removeItem(THEME_KEY);
    localStorage.removeItem(DENSITY_KEY);
    localStorage.removeItem(REDUCE_MOTION_KEY);
    localStorage.removeItem(HIGH_CONTRAST_KEY);
    localStorage.removeItem(NOTIF_KEY);

    localStorage.setItem(LOCALE_KEY, "en");
    i18n.changeLanguage("en");

    setTheme("system");
    setDensity("comfortable");
    setLocale("en");
    setReduceMotion(false);
    setHighContrast(false);
    setNotifications({
      inApp: true,
      email: false,
      reportUpdates: true,
      communityDigest: false,
      adminAlerts: role === "admin",
    });

    alert(t("settings.resetDone"));
  }

  function handleLogout() {
    localStorage.setItem(LOCALE_KEY, "en");
    i18n.changeLanguage("en");
    logout();
    navigate("/login");
  }

  async function deleteAccount() {
    if (!token) {
      alert(t("errors.loginRequired") || "You must login first.");
      return;
    }

    const confirmText =
      t("settings.delete.confirmText") ||
      "Type DELETE to confirm you want to permanently delete your account:";
    const typed = prompt(confirmText);
    if (!typed || typed.trim().toUpperCase() !== "DELETE") return;

    const pwPrompt = t("settings.delete.passwordPrompt") || "Enter your password to confirm:";
    const password = prompt(pwPrompt);
    if (!password) return;

    try {
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.message || t("settings.delete.failed") || "Failed to delete account");
        return;
      }

      alert(data.message || t("settings.delete.success") || "Account deleted successfully");
      localStorage.clear();
      logout();
      navigate("/login");
    } catch (e) {
      alert(t("settings.delete.failed") || "Failed to delete account");
    }
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <h1>{t("settings.title")}</h1>

          <p className="muted">
            {t("common.signedInAs")} <b>{displayName}</b>{" "}
            <span className="pill">{String(role || "").toUpperCase()}</span>
          </p>
        </div>

        <div className="settings-header-actions">
          <button className="btn" onClick={() => navigate("/profile")}>
            {t("nav.profile")}
          </button>
          <button className="btn danger" onClick={handleLogout}>
            {t("nav.logout")}
          </button>
        </div>
      </div>

      <div className="settings-grid">
        {/* Appearance */}
        <section className="card">
          <h2>{t("settings.appearance")}</h2>

          <div className="row">
            <div>
              <label className="label">{t("settings.theme")}</label>
              <p className="hint">{t("settings.themeHint")}</p>
            </div>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="system">{t("settings.themeSystem")}</option>
              <option value="light">{t("settings.themeLight")}</option>
              <option value="dark">{t("settings.themeDark")}</option>
            </select>
          </div>

          <div className="row">
            <div>
              <label className="label">{t("settings.density")}</label>
              <p className="hint">{t("settings.densityHint")}</p>
            </div>
            <select value={density} onChange={(e) => setDensity(e.target.value)}>
              <option value="comfortable">{t("settings.densityComfortable")}</option>
              <option value="compact">{t("settings.densityCompact")}</option>
            </select>
          </div>

          <div className="row">
            <div>
              <label className="label">{t("settings.language")}</label>
              <p className="hint">{t("settings.languageHint")}</p>
            </div>

            <select value={locale} onChange={(e) => setLocale(e.target.value)}>
              <option value="en">{t("languages.en")}</option>
              <option value="it">{t("languages.it")}</option>
              <option value="de">{t("languages.de")}</option>
              <option value="es">{t("languages.es")}</option>
              <option value="sq">{t("languages.sq")}</option>
            </select>
          </div>
        </section>

        {/* Notifications */}
        <section className="card">
          <h2>{t("settings.notifications")}</h2>
          <p className="hint">{t("settings.notificationsHint")}</p>

          <div className="switch-row">
            <div>
              <div className="label">{t("settings.notif.inApp")}</div>
              <div className="hint">{t("settings.notif.inAppHint")}</div>
            </div>
            <Switch checked={notifications.inApp} onChange={() => toggleNotif("inApp")} />
          </div>

          <div className="switch-row">
            <div>
              <div className="label">{t("settings.notif.email")}</div>
              <div className="hint">{t("settings.notif.emailHint")}</div>
            </div>
            <Switch checked={notifications.email} onChange={() => toggleNotif("email")} />
          </div>

          <div className="divider" />

          <div className="switch-row">
            <div>
              <div className="label">{t("settings.notif.reportUpdates")}</div>
              <div className="hint">{t("settings.notif.reportUpdatesHint")}</div>
            </div>
            <Switch checked={notifications.reportUpdates} onChange={() => toggleNotif("reportUpdates")} />
          </div>

          <div className="switch-row">
            <div>
              <div className="label">{t("settings.notif.communityDigest")}</div>
              <div className="hint">{t("settings.notif.communityDigestHint")}</div>
            </div>
            <Switch checked={notifications.communityDigest} onChange={() => toggleNotif("communityDigest")} />
          </div>

          {role === "admin" && (
            <div className="switch-row">
              <div>
                <div className="label">{t("settings.notif.adminAlerts")}</div>
                <div className="hint">{t("settings.notif.adminAlertsHint")}</div>
              </div>
              <Switch checked={notifications.adminAlerts} onChange={() => toggleNotif("adminAlerts")} />
            </div>
          )}
        </section>

        {/* Privacy & Accessibility */}
        <section className="card">
          <h2>{t("settings.privacy")}</h2>

          <div className="switch-row">
            <div>
              <div className="label">{t("settings.access.reduceMotion")}</div>
              <div className="hint">{t("settings.access.reduceMotionHint")}</div>
            </div>
            <Switch checked={reduceMotion} onChange={() => setReduceMotion((v) => !v)} />
          </div>

          <div className="switch-row">
            <div>
              <div className="label">{t("settings.access.highContrast")}</div>
              <div className="hint">{t("settings.access.highContrastHint")}</div>
            </div>
            <Switch checked={highContrast} onChange={() => setHighContrast((v) => !v)} />
          </div>

          <div className="divider" />

          <div className="row actions">
            <button className="btn" onClick={exportMyData}>
              {t("settings.exportSettings")}
            </button>
            <button className="btn" onClick={clearCacheOnly}>
              {t("settings.resetPreferences")}
            </button>
          </div>
        </section>

        {/* Security */}
        <section className="card">
          <h2>{t("settings.security")}</h2>

          <div className="row">
            <div>
              <div className="label">{t("settings.session")}</div>
              <div className="hint">{t("settings.sessionHint")}</div>
            </div>
            <button className="btn danger" onClick={handleLogout}>
              {t("nav.logout")}
            </button>
          </div>

          <div className="row">
            <div>
              <div className="label">{t("settings.account")}</div>
              <div className="hint">{t("settings.changeCredentials")}</div>
            </div>
            <button className="btn" onClick={() => navigate("/change-credentials")}>
              {t("settings.changeCredentials")}
            </button>
          </div>

          {/* ✅ Danger Zone */}
          <div className="divider" />

          <div className="row">
            <div>
              <div className="label" style={{ color: "#b91c1c", fontWeight: 900 }}>
                {t("settings.delete.title") || "Delete Account"}
              </div>
              <div className="hint">
                {t("settings.delete.hint") ||
                  "This permanently deletes your account and your data. This action cannot be undone."}
              </div>
            </div>

            <button className="btn danger" onClick={deleteAccount}>
              {t("settings.delete.button") || "Delete Account"}
            </button>
          </div>
        </section>
      </div>

      <footer className="settings-footer muted">{t("settings.tipsFooter")}</footer>
    </div>
  );
}

function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`sw ${checked ? "on" : ""}`}
      onClick={onChange}
      aria-pressed={checked}
    >
      <span className="knob" />
    </button>
  );
}
