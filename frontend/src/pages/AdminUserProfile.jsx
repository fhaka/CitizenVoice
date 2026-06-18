import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000";

export default function AdminUserProfile() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);

  async function load() {
    const uRes = await fetch(`${API_URL}/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const uJson = await uRes.json();
    if (!uRes.ok) throw new Error(uJson.message || "Failed to load user");
    setUser(uJson);

    const rRes = await fetch(`${API_URL}/api/admin/users/${id}/reports`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const rJson = await rRes.json();
    if (!rRes.ok) throw new Error(rJson.message || "Failed to load reports");
    setReports(rJson);
  }

  useEffect(() => {
    load().catch((e) => alert(e.message));
    // eslint-disable-next-line
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "left" }}>
      <h1>User Profile</h1>

      <div style={{ padding: 14, border: "1px solid #ddd", borderRadius: 10 }}>
        <p><b>Name:</b> {user.full_name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Personal ID:</b> {user.personal_id}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Active:</b> {user.is_active ? "Yes" : "No"}</p>
        <p><b>Phone:</b> {user.phone || "-"}</p>
        <p><b>City:</b> {user.city || "-"}</p>

        {user.profile_photo && (
          <img
            src={`${API_URL}${user.profile_photo}`}
            alt="profile"
            style={{ width: 160, borderRadius: 12, marginTop: 10 }}
          />
        )}
      </div>

      <h2 style={{ marginTop: 18 }}>Reports by this user</h2>

      {reports.length === 0 ? (
        <p>No reports.</p>
      ) : (
        reports.map((r) => (
          <div
            key={r.id}
            style={{ border: "1px solid #eee", padding: 12, borderRadius: 10, marginTop: 10 }}
          >
            <b>{r.title}</b>
            <div>{r.city} • {r.category}</div>
            <div>Status: <b>{r.status}</b></div>
            <div style={{ opacity: 0.8 }}>
              {new Date(r.created_at).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
