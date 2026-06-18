import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

export default function ChangeCredentials() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    current_password: "",
    new_password: "",
  });

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function safeJson(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { message: t("common.serverNonJson", { status: res.status }) };
    }
  }

  async function loadMe() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.message || t("creds.errors.loadFail"));

      setForm((p) => ({
        ...p,
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        city: data.city || "",
      }));
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

  async function save() {
    setSaving(true);
    try {
      const payload = {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        city: form.city,
      };

      // only send password fields if user typed new_password
      if (form.new_password.trim().length > 0) {
        payload.current_password = form.current_password;
        payload.new_password = form.new_password;
      }

      const res = await fetch(`${API_URL}/api/users/me/credentials`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.message || t("creds.errors.updateFail"));

      // keep navbar name updated immediately
      localStorage.setItem("full_name", form.full_name);

      alert(t("creds.alerts.updated"));

      // clear password fields after success
      setForm((p) => ({ ...p, current_password: "", new_password: "" }));
      navigate("/settings");
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>{t("common.loading")}</p>;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "left" }}>
      <h1>{t("creds.title")}</h1>
      <p style={{ opacity: 0.8 }}>{t("creds.subtitle")}</p>

      <div
        style={{
          display: "grid",
          gap: 10,
          border: "1px solid #ddd",
          padding: 14,
          borderRadius: 12,
        }}
      >
        <label>
          <b>{t("creds.fullName")}</b>
        </label>
        <input value={form.full_name} onChange={(e) => setField("full_name", e.target.value)} />

        <label>
          <b>{t("creds.email")}</b>
        </label>
        <input value={form.email} onChange={(e) => setField("email", e.target.value)} />

        <label>
          <b>{t("creds.phone")}</b>
        </label>
        <input value={form.phone} onChange={(e) => setField("phone", e.target.value)} />

        <label>
          <b>{t("creds.city")}</b>
        </label>
        <input value={form.city} onChange={(e) => setField("city", e.target.value)} />

        <hr />

        <p style={{ margin: 0, fontWeight: 800 }}>{t("creds.changePasswordTitle")}</p>

        <label>
          <b>{t("creds.currentPassword")}</b>
        </label>
        <input
          type="password"
          value={form.current_password}
          onChange={(e) => setField("current_password", e.target.value)}
          placeholder={t("creds.currentPasswordPlaceholder")}
        />

        <label>
          <b>{t("creds.newPassword")}</b>
        </label>
        <input
          type="password"
          value={form.new_password}
          onChange={(e) => setField("new_password", e.target.value)}
          placeholder={t("creds.newPasswordPlaceholder")}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button onClick={() => navigate("/settings")}>{t("common.cancel")}</button>
          <button onClick={save} disabled={saving}>
            {saving ? t("common.saving") : t("common.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
