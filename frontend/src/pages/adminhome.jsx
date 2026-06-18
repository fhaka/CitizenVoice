import { useEffect, useMemo, useState } from "react";
import "./AdminHome.css";
import { useTranslation } from "react-i18next";

export default function AdminHome() {
  const { t } = useTranslation();

  const fullName = localStorage.getItem("full_name") || "";
  const token = localStorage.getItem("token");

  const [reports, setReports] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reportsError, setReportsError] = useState("");
  const [contactsError, setContactsError] = useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        setReportsError("");
        const res = await fetch("http://localhost:5000/api/reports/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch admin reports");
        }
        setReports(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch admin reports", err);
        setReports([]);
        setReportsError(err.message || "Failed to fetch admin reports");
      }
    }

    async function fetchContacts() {
      try {
        setContactsError("");
        const res = await fetch("http://localhost:5000/api/admin/contacts?limit=8", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch contact messages");
        }
        setContacts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch contact messages", err);
        setContacts([]);
        setContactsError(err.message || "Failed to fetch contact messages");
      }
    }

    if (token) {
      fetchReports();
      fetchContacts();
    }
  }, [token]);

  // ---- dashboard stats ----
  const total = reports.length;

  const pending = useMemo(
    () => reports.filter((r) => r.status === "pending").length,
    [reports]
  );
  const progress = useMemo(
    () => reports.filter((r) => r.status === "in_progress").length,
    [reports]
  );
  const resolved = useMemo(
    () => reports.filter((r) => r.status === "resolved").length,
    [reports]
  );

  const recentReports = reports.slice(0, 5);

  function statusLabel(status) {
    if (status === "pending") return t("common.pending");
    if (status === "in_progress") return t("common.inProgress");
    if (status === "resolved") return t("common.resolved");
    if (status === "rejected") return t("common.rejected");
    return status;
  }

  // Map contact status to existing badge classes in AdminHome.css
  function contactStatusClass(s) {
    if (s === "new") return "pending";
    if (s === "read") return "progress";
    if (s === "archived") return "resolved";
    return "pending";
  }

  return (
    <div className="admin-container">
      <div style={{ textAlign: "left", marginBottom: "10px", fontWeight: 600 }}>
        {t("adminHome.welcome")} {fullName ? `- ${fullName}` : ""}
      </div>

      <div className="admin-header">
        <h1>{t("adminHome.title")}</h1>
        <p>{t("adminHome.subtitle")}</p>
      </div>

      {reportsError && (
        <div className="admin-alert">
          Reports could not be loaded: {reportsError}
        </div>
      )}

      {contactsError && (
        <div className="admin-alert">
          Contact messages could not be loaded: {contactsError}
        </div>
      )}

      {/* ===== CARDS ===== */}
      <div className="admin-cards">
        <div className="admin-card total">
          <h2>{total}</h2>
          <p>{t("adminHome.cards.totalReports")}</p>
        </div>

        <div className="admin-card pending">
          <h2>{pending}</h2>
          <p>{t("common.pending")}</p>
        </div>

        <div className="admin-card progress">
          <h2>{progress}</h2>
          <p>{t("common.inProgress")}</p>
        </div>

        <div className="admin-card resolved">
          <h2>{resolved}</h2>
          <p>{t("common.resolved")}</p>
        </div>
      </div>

      {/* ===== RECENT REPORTS TABLE ===== */}
      <div className="admin-section">
        <h2>{t("adminHome.recent.title")}</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("adminHome.recent.cols.issue")}</th>
              <th>{t("adminHome.recent.cols.citizen")}</th>
              <th>{t("adminHome.recent.cols.status")}</th>
              <th>{t("adminHome.recent.cols.date")}</th>
            </tr>
          </thead>

          <tbody>
            {recentReports.length === 0 ? (
              <tr>
                <td colSpan="4">{t("adminHome.recent.empty")}</td>
              </tr>
            ) : (
              recentReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.full_name}</td>
                  <td>
                    <span className={`status ${report.status}`}>
                      {statusLabel(report.status)}
                    </span>
                  </td>
                  <td>{new Date(report.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== CONTACT MESSAGES TABLE (NEW) ===== */}
      <div className="admin-section">
        <h2>{t("adminHome.contacts.title") || "Contact Messages"}</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("adminHome.contacts.cols.email") || "Email"}</th>
              <th>{t("adminHome.contacts.cols.phone") || "Phone"}</th>
              <th>{t("adminHome.contacts.cols.topic") || "Topic"}</th>
              <th>{t("adminHome.contacts.cols.message") || "Message"}</th>
              <th>{t("adminHome.contacts.cols.date") || "Date"}</th>
              <th>{t("adminHome.contacts.cols.status") || "Status"}</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="6">
                  {t("adminHome.contacts.empty") || "No contact messages yet."}
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.email}</td>
                  <td>
                    {(`${c.phone_prefix || ""} ${c.phone || ""}`).trim() || "-"}
                  </td>
                  <td style={{ fontWeight: 700 }}>{c.topic}</td>
                  <td
                    style={{
                      maxWidth: 420,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={c.description}
                  >
                    {c.description}
                  </td>
                  <td>{new Date(c.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`status ${contactStatusClass(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
