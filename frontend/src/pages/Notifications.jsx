import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

export default function Notifications() {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const unreadCount = useMemo(
    () => items.filter((item) => !Number(item.is_read)).length,
    [items]
  );

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load notifications");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id) {
    const res = await fetch(`${API_URL}/api/notifications/${id}/read`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Failed to mark notification read");
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_read: 1 } : item))
    );
  }

  async function markAllRead() {
    const res = await fetch(`${API_URL}/api/notifications/read-all`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Failed to mark notifications read");
    setItems((prev) => prev.map((item) => ({ ...item, is_read: 1 })));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">{t("admin.nav.notifications") || "Notifications"}</div>
          <h1>{t("admin.nav.notifications") || "Notifications"}</h1>
          <p className="muted">
            {unreadCount
              ? `${unreadCount} unread update${unreadCount === 1 ? "" : "s"}`
              : "You are all caught up."}
          </p>
        </div>
        <button onClick={() => markAllRead().catch((e) => setError(e.message))}>
          Mark all read
        </button>
      </div>

      {error && <p className="report-alert">{error}</p>}

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : items.length === 0 ? (
        <div className="card">
          <p className="muted">No notifications yet.</p>
        </div>
      ) : (
        <div className="cards">
          {items.map((item) => (
            <div
              key={item.id}
              className={`report-card notification-card ${item.is_read ? "" : "is-unread"}`}
            >
              <div className="notification-main">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <p className="muted">{new Date(item.created_at).toLocaleString()}</p>
                </div>
                <div className="notification-actions">
                  {item.link && <Link to={item.link}>Open</Link>}
                  {!Number(item.is_read) && (
                    <button onClick={() => markRead(item.id).catch((e) => setError(e.message))}>
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
