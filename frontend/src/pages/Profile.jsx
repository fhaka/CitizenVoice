import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

export default function Profile() {
  const navigate = useNavigate();
  const { role, fullName, logout } = useAuth();
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  const fileRef = useRef(null);

  const [me, setMe] = useState(null);
  const [tab, setTab] = useState("overview"); // overview | edit | security
  const [form, setForm] = useState({ full_name: "", phone: "", city: "" });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);

  async function safeJson(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      // use translation if available, fallback otherwise
      return { message: t("common.serverNonJson", { status: res.status, defaultValue: `Server returned non-JSON (${res.status}). Check backend route.` }) };
    }
  }

  async function loadMe() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.message || t("profile.hints.loadFail", { defaultValue: "Failed to load profile" }));

      setMe(data);
      setForm({
        full_name: data.full_name || "",
        phone: data.phone || "",
        city: data.city || "",
      });
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMe();
    // eslint-disable-next-line
  }, []);

  const displayName = useMemo(() => {
    return (
      localStorage.getItem("full_name") ||
      me?.full_name ||
      fullName ||
      (role === "admin" ? t("common.admin") : t("common.citizen"))
    );
  }, [me?.full_name, fullName, role, t]);

  const memberSince = useMemo(() => {
    if (!me?.created_at) return t("common.dash", { defaultValue: "-" });
    try {
      return new Date(me.created_at).toLocaleDateString();
    } catch {
      return t("common.dash", { defaultValue: "-" });
    }
  }, [me?.created_at, t]);

  const completion = useMemo(() => {
    if (!me) return 0;
    const fields = [
      me.full_name ? 1 : 0,
      me.email ? 1 : 0,
      me.phone ? 1 : 0,
      me.city ? 1 : 0,
      me.profile_photo ? 1 : 0,
    ];
    return Math.round((fields.reduce((a, b) => a + b, 0) / fields.length) * 100);
  }, [me]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function saveProfile() {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.message || t("profile.hints.updateFail", { defaultValue: "Failed to update profile" }));

      localStorage.setItem("full_name", form.full_name);

      alert("✅ " + t("common.save"));
      await loadMe();
      setTab("overview");
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function uploadPhoto(file) {
    if (!file) return;

    setPhotoPreview(URL.createObjectURL(file));

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("photo", file);

      const res = await fetch(`${API_URL}/api/users/me/photo`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.message || t("profile.hints.photoFail", { defaultValue: "Failed to upload photo" }));

      alert("✅ " + t("common.save"));
      setPhotoPreview(null);
      await loadMe();
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  }

  function doLogout() {
    logout();
    navigate("/login");
  }

  function copy(text) {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(
      () => alert(t("common.copied", { defaultValue: "✅ Copied" })),
      () => alert(t("common.copyFailed", { defaultValue: "Copy failed" }))
    );
  }

  if (loading) return <p>{t("common.loading")}</p>;
  if (!me) return <p>{t("profile.notFound", { defaultValue: "Profile not found." })}</p>;

  const photoSrc = photoPreview
    ? photoPreview
    : me.profile_photo
    ? `${API_URL}${me.profile_photo}`
    : null;

  return (
    <div className="profile-page-pro">
      <div className="profile-topbar">
        <div>
          <h1 className="profile-title">{t("profile.title")}</h1>
          <div className="profile-sub">
            {t("common.signedInAs")} <b>{displayName}</b>{" "}
            <span className="pill">{(me.role || role || "user").toUpperCase()}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn" onClick={() => navigate("/settings")}>
            {t("nav.settings")}
          </button>
          <button className="btn" onClick={() => navigate("/change-credentials")}>
            {t("settings.changeCredentials")}
          </button>
          <button className="btn danger" onClick={doLogout}>
            {t("profile.logout")}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${tab === "overview" ? "active" : ""}`}
          onClick={() => setTab("overview")}
        >
          {t("profile.tabs.overview")}
        </button>
        <button
          className={`tab ${tab === "edit" ? "active" : ""}`}
          onClick={() => setTab("edit")}
        >
          {t("profile.tabs.edit")}
        </button>
        <button
          className={`tab ${tab === "security" ? "active" : ""}`}
          onClick={() => setTab("security")}
        >
          {t("profile.tabs.security")}
        </button>
      </div>

      {tab === "overview" && (
        <div className="grid">
          <section className="card">
            <div className="avatar-wrap">
              <div className="avatar">
                {photoSrc ? (
                  <img src={photoSrc} alt="profile" />
                ) : (
                  <div className="avatar-fallback">{t("profile.hints.noPhoto")}</div>
                )}
              </div>

              <div className="avatar-actions">
                <button
                  className="btn"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? t("common.uploading", { defaultValue: "Uploading..." }) : t("profile.uploadPhoto")}
                </button>
                <input
                  ref={fileRef}
                  className="hidden-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadPhoto(e.target.files?.[0])}
                />
                <div className="hint">{t("profile.hints.photo")}</div>
              </div>
            </div>

            <div className="divider" />

            <div className="meta">
              <div className="meta-row">
                <span className="k">{t("profile.fullName")}</span>
                <span className="v">{me.full_name || t("common.dash", { defaultValue: "-" })}</span>
              </div>

              <div className="meta-row">
                <span className="k">{t("profile.email")}</span>
                <span className="v">
                  {me.email || t("common.dash", { defaultValue: "-" })}{" "}
                  {me.email && (
                    <button className="link-btn" onClick={() => copy(me.email)}>
                      {t("common.copy")}
                    </button>
                  )}
                </span>
              </div>

              <div className="meta-row">
                <span className="k">{t("profile.personalId")}</span>
                <span className="v">
                  {me.personal_id || t("common.dash", { defaultValue: "-" })}{" "}
                  {me.personal_id && (
                    <button className="link-btn" onClick={() => copy(me.personal_id)}>
                      {t("common.copy")}
                    </button>
                  )}
                </span>
              </div>

              <div className="meta-row">
                <span className="k">{t("profile.phone")}</span>
                <span className="v">{me.phone || t("common.dash", { defaultValue: "-" })}</span>
              </div>

              <div className="meta-row">
                <span className="k">{t("profile.city")}</span>
                <span className="v">{me.city || t("common.dash", { defaultValue: "-" })}</span>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="h2">{t("profilePro.accountOverview.title", { defaultValue: "Account overview" })}</h2>

            <div className="stats">
              <div className="stat">
                <div className="stat-v">{(me.role || role || t("common.dash", { defaultValue: "-" })).toUpperCase()}</div>
              </div>

              <div className="stat">
                <div className="stat-k">{t("profile.active")}</div>
                <div className="stat-v">{me.is_active ? t("common.yes") : t("common.no")}</div>
              </div>

              <div className="stat">
                <div className="stat-k">{t("profilePro.memberSince")}</div>
                <div className="stat-v">{memberSince}</div>
              </div>
            </div>

            <div className="divider" />

            <div>
              <div className="row-between">
                <div>
                  <div className="label">{t("profilePro.completion.title")}</div>
                  <div className="hint">{t("profilePro.completion.hint")}</div>
                </div>
                <div className="pct">{completion}%</div>
              </div>

              <div className="bar">
                <div className="bar-fill" style={{ width: `${completion}%` }} />
              </div>
            </div>

            <div className="divider" />

            <div className="row actions">
              <button className="btn" onClick={() => setTab("edit")}>
                {t("profilePro.actions.editProfile")}
              </button>
              <button className="btn" onClick={() => navigate("/change-credentials")}>
                {t("settings.changeCredentials")}
              </button>
            </div>
          </section>
        </div>
      )}

      {tab === "edit" && (
        <section className="card">
          <h2 className="h2">{t("profile.hints.editTitle", { defaultValue: "Edit profile" })}</h2>
          <p className="hint">{t("profile.hints.edit")}</p>

          <div className="form-grid">
            <div>
              <label className="label">{t("profile.fullName")}</label>
              <input name="full_name" value={form.full_name} onChange={onChange} autoComplete="name" />
            </div>

            <div>
              <label className="label">{t("profile.phone")}</label>
              <input name="phone" value={form.phone} onChange={onChange} autoComplete="tel" />
            </div>

            <div>
              <label className="label">{t("profile.city")}</label>
              <input name="city" value={form.city} onChange={onChange} autoComplete="address-level2" />
            </div>
          </div>

          <div className="row actions">
            <button className="btn" onClick={() => setTab("overview")}>
              {t("common.cancel", { defaultValue: "Cancel" })}
            </button>
            <button className="btn primary" onClick={saveProfile} disabled={saving}>
              {saving ? t("profile.saving") : t("profile.save")}
            </button>
          </div>
        </section>
      )}

      {tab === "security" && (
        <section className="card">
          <h2 className="h2">{t("settings.security")}</h2>
          <p className="hint">{t("profile.hints.security")}</p>

          <div className="security-grid">
            <div className="security-item">
              <div className="label">{t("settings.changeCredentials")}</div>
              <div className="hint">{t("profile.hints.changeCredsHint", { defaultValue: "Update email/password and profile details." })}</div>
              <button className="btn" onClick={() => navigate("/change-credentials")}>
                {t("common.open")}
              </button>
            </div>

            <div className="security-item">
              <div className="label">{t("profile.logout")}</div>
              <div className="hint">{t("common.endSessionHint", { defaultValue: "End this session on this device." })}</div>
              <button className="btn danger" onClick={doLogout}>
                {t("profile.logout")}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
