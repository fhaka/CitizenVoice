import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import StatusTimeline from "../components/StatusTimeline";

const API_URL = "http://localhost:5000";

export default function ReportDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const r = await fetch(`${API_URL}/api/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const reportJson = await r.json();
      if (!r.ok) throw new Error(reportJson.message || "Failed to load report");

      const h = await fetch(`${API_URL}/api/reports/${id}/status-history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const historyJson = await h.json();
      if (!h.ok) throw new Error(historyJson.message || "Failed to load report history");

      setReport(reportJson);
      setHistory(Array.isArray(historyJson) ? historyJson : []);
    }
    load().catch((e) => setError(e.message));
  }, [id, token]);

  if (error) return <p>{error}</p>;

  if (!report) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1>{report.title}</h1>
      <StatusBadge status={report.status} />
      <p>{report.description}</p>
      {report.admin_note && <p><b>Admin note:</b> {report.admin_note}</p>}
      <StatusTimeline history={history} />
    </div>
  );
}
