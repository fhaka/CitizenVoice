import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

function formatDetails(details) {
  if (!details) return "-";
  if (typeof details === "object") return JSON.stringify(details, null, 2);

  try {
    return JSON.stringify(JSON.parse(details), null, 2);
  } catch {
    return String(details);
  }
}

export default function AdminAudit() {
  const token = localStorage.getItem("token");
  const [logs, setLogs] = useState(null);

  async function load() {
    const res = await fetch(`${API_URL}/api/admin/audit`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to load audit logs");
    setLogs(json);
  }

  useEffect(() => {
    load().catch((e) => alert(e.message));
    // eslint-disable-next-line
  }, []);

  if (!logs) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Audit Log</h1>

      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Admin</th>
            <th>Action</th>
            <th>Entity</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td>{new Date(l.created_at).toLocaleString()}</td>
              <td>{l.admin_name}</td>
              <td>{l.action}</td>
              <td>{l.entity_type} #{l.entity_id ?? "-"}</td>
              <td style={{ maxWidth: 420 }}>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {formatDetails(l.details)}
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
