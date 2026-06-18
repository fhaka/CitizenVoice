import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

const API_URL = "http://localhost:5000";
const STATUSES = ["pending", "in_progress", "resolved", "rejected"];
const PRIORITIES = ["low", "medium", "high", "urgent"];
const DEPARTMENTS = ["Roads", "Sanitation", "Lighting", "Water", "Electricity", "Public Safety"];

export default function AdminReports() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const [reports, setReports] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});
  const [noteMap, setNoteMap] = useState({});
  const [assignmentMap, setAssignmentMap] = useState({});
  const [savingId, setSavingId] = useState(null);

  const statusFilter = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    return status && STATUSES.includes(status) ? status : "";
  }, [location.search]);

  function hydrateEditState(data) {
    const statuses = {};
    const notes = {};
    const assignments = {};

    data.forEach((report) => {
      statuses[report.id] = report.status || "pending";
      notes[report.id] = report.admin_note || "";
      assignments[report.id] = {
        assigned_admin_id: report.assigned_admin_id || "",
        assigned_department: report.assigned_department || "",
        priority: report.priority || "medium",
      };
    });

    setStatusMap(statuses);
    setNoteMap(notes);
    setAssignmentMap(assignments);
  }

  async function loadReports() {
    setLoading(true);
    try {
      const url = statusFilter
        ? `${API_URL}/api/reports/admin?status=${encodeURIComponent(statusFilter)}`
        : `${API_URL}/api/reports/admin`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load reports");

      setReports(Array.isArray(data) ? data : []);
      hydrateEditState(Array.isArray(data) ? data : []);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadAdmins() {
    try {
      const res = await fetch(`${API_URL}/api/admin/users?role=admin&active=1`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load admins");
      setAdmins(Array.isArray(data) ? data : []);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    loadReports();
    loadAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  function setAssignmentField(reportId, field, value) {
    setAssignmentMap((prev) => ({
      ...prev,
      [reportId]: {
        ...(prev[reportId] || {}),
        [field]: value,
      },
    }));
  }

  async function saveStatus(reportId) {
    const res = await fetch(`${API_URL}/api/reports/${reportId}/status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: statusMap[reportId],
        admin_note: noteMap[reportId],
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update status");
  }

  async function saveAssignment(reportId) {
    const assignment = assignmentMap[reportId] || {};

    const res = await fetch(`${API_URL}/api/reports/${reportId}/assignment`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assigned_admin_id: assignment.assigned_admin_id || null,
        assigned_department: assignment.assigned_department || null,
        priority: assignment.priority || "medium",
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update assignment");
  }

  async function saveReport(reportId) {
    setSavingId(reportId);
    try {
      await saveStatus(reportId);
      await saveAssignment(reportId);
      await loadReports();
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Operations</div>
          <h1>Manage Reports</h1>
          <p className="muted">Update statuses, assign owners, and prioritize the work queue.</p>
        </div>
        <Link className="btn-outline" to="/admin-analytics">Analytics</Link>
      </div>

      {reports.length === 0 ? (
        <div className="card">
          <p className="muted">No reports found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Status</th>
              <th>Assignment</th>
              <th>Priority</th>
              <th>Admin Note</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const assignment = assignmentMap[report.id] || {};
              return (
                <tr key={report.id}>
                  <td>
                    <Link to={`/reports/${report.id}`}>{report.title}</Link>
                    <div className="muted">{report.city} · {report.category}</div>
                    <div className="muted">Citizen: {report.full_name || "-"}</div>
                  </td>

                  <td>
                    <div className="stacked-controls">
                      <StatusBadge status={statusMap[report.id]} />
                      <select
                        value={statusMap[report.id] || "pending"}
                        onChange={(e) =>
                          setStatusMap((prev) => ({ ...prev, [report.id]: e.target.value }))
                        }
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td>
                    <div className="stacked-controls">
                      <select
                        value={assignment.assigned_admin_id || ""}
                        onChange={(e) =>
                          setAssignmentField(report.id, "assigned_admin_id", e.target.value)
                        }
                      >
                        <option value="">Unassigned</option>
                        {admins.map((admin) => (
                          <option key={admin.id} value={admin.id}>
                            {admin.full_name}
                          </option>
                        ))}
                      </select>

                      <select
                        value={assignment.assigned_department || ""}
                        onChange={(e) =>
                          setAssignmentField(report.id, "assigned_department", e.target.value)
                        }
                      >
                        <option value="">No department</option>
                        {DEPARTMENTS.map((department) => (
                          <option key={department} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td>
                    <select
                      value={assignment.priority || "medium"}
                      onChange={(e) => setAssignmentField(report.id, "priority", e.target.value)}
                    >
                      {PRIORITIES.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      value={noteMap[report.id] || ""}
                      onChange={(e) =>
                        setNoteMap((prev) => ({ ...prev, [report.id]: e.target.value }))
                      }
                      placeholder="Short response (e.g. Repair Friday)"
                    />
                  </td>

                  <td>
                    <button onClick={() => saveReport(report.id)} disabled={savingId === report.id}>
                      {savingId === report.id ? "Saving..." : "Save"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
