import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

export default function AdminUsers() {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (role) params.set("role", role);
      if (active !== "") params.set("active", active);

      const res = await fetch(`${API_URL}/api/admin/users?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("adminUsers.errors.loadFail"));
      setUsers(data);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);

  async function setUserRole(id, newRole) {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}/role`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("adminUsers.errors.roleFail"));
      loadUsers();
    } catch (e) {
      alert(e.message);
    }
  }

  async function setUserActive(id, is_active) {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("adminUsers.errors.statusFail"));
      loadUsers();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "left" }}>
      <h1>{t("adminUsers.title")}</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <input
          placeholder={t("adminUsers.searchPlaceholder")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: 10, width: 280 }}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: 10 }}>
          <option value="">{t("adminUsers.filters.allRoles")}</option>
          <option value="citizen">{t("common.citizen")}</option>
          <option value="admin">{t("common.admin")}</option>
        </select>

        <select value={active} onChange={(e) => setActive(e.target.value)} style={{ padding: 10 }}>
          <option value="">{t("adminUsers.filters.all")}</option>
          <option value="1">{t("adminUsers.filters.active")}</option>
          <option value="0">{t("adminUsers.filters.suspended")}</option>
        </select>

        <button onClick={loadUsers}>{t("adminUsers.actions.apply")}</button>
      </div>

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : users.length === 0 ? (
        <p>{t("adminUsers.noResults")}</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ padding: 10 }}>{t("adminUsers.table.name")}</th>
              <th style={{ padding: 10 }}>{t("adminUsers.table.personalId")}</th>
              <th style={{ padding: 10 }}>{t("adminUsers.table.email")}</th>
              <th style={{ padding: 10 }}>{t("adminUsers.table.role")}</th>
              <th style={{ padding: 10 }}>{t("adminUsers.table.active")}</th>
              <th style={{ padding: 10 }}>{t("adminUsers.table.actions")}</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 10 }}>
                  <Link to={`/admin-users/${u.id}`} style={{ fontWeight: 800 }}>
                    {u.full_name}
                  </Link>
                </td>

                <td style={{ padding: 10 }}>{u.personal_id}</td>
                <td style={{ padding: 10 }}>{u.email}</td>

                <td style={{ padding: 10 }}>
                  {u.role === "admin" ? t("common.admin") : t("common.citizen")}
                </td>

                <td style={{ padding: 10 }}>
                  {u.is_active ? t("common.yes") : t("common.no")}
                </td>

                <td style={{ padding: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    onClick={() =>
                      setUserRole(u.id, u.role === "admin" ? "citizen" : "admin")
                    }
                  >
                    {t("adminUsers.actions.make")}{" "}
                    {u.role === "admin" ? t("common.citizen") : t("common.admin")}
                  </button>

                  <button onClick={() => setUserActive(u.id, u.is_active ? 0 : 1)}>
                    {u.is_active
                      ? t("adminUsers.actions.suspend")
                      : t("adminUsers.actions.activate")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
