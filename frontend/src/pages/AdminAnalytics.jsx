import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

export default function AdminAnalytics() {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");

    if (!token) {
      setErr(t("admin.analytics.loginRequired"));
      return;
    }

    const res = await fetch(`${API_URL}/api/admin/analytics`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const text = await res.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error(
        t("admin.analytics.invalidResponse") + ":\n" + text.slice(0, 400)
      );
    }

    if (!res.ok) {
      throw new Error(json?.message || `HTTP ${res.status}`);
    }

    setData(json);
  }

  useEffect(() => {
    load().catch((e) => setErr(e.message || String(e)));
    // eslint-disable-next-line
  }, []);

  // ✅ hooks always called
  const totals = useMemo(() => data?.totals || {}, [data]);
  const byCategory = useMemo(
    () => (Array.isArray(data?.byCategory) ? data.byCategory : []),
    [data]
  );
  const byCity = useMemo(
    () => (Array.isArray(data?.byCity) ? data.byCity : []),
    [data]
  );
  const monthly = useMemo(
    () => (Array.isArray(data?.monthly) ? data.monthly : []),
    [data]
  );

  const statusPie = useMemo(
    () => [
      { name: "pending", value: Number(totals.pending || 0) },
      { name: "in_progress", value: Number(totals.in_progress || 0) },
      { name: "resolved", value: Number(totals.resolved || 0) },
      { name: "rejected", value: Number(totals.rejected || 0) },
    ],
    [totals]
  );

  const pieColors = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"];

  if (err) {
    return (
      <div style={{ padding: 16 }}>
        <h1>{t("admin.analytics.title")}</h1>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            padding: 12,
            borderRadius: 10,
            background: "#fff3f3",
          }}
        >
          {err}
        </pre>
      </div>
    );
  }

  if (!data) {
    return <p style={{ padding: 16 }}>{t("common.loading")}</p>;
  }

  return (
    <div>
      <h1>{t("admin.analytics.title")}</h1>

      <div className="grid-cards">
        <div className="card">
          <b>{t("admin.analytics.cards.total")}</b>
          <div className="big-number">{totals.total_reports ?? 0}</div>
        </div>

        <div className="card">
          <b>{t("common.pending")}</b>
          <div className="big-number">{totals.pending ?? 0}</div>
        </div>

        <div className="card">
          <b>{t("common.inProgress")}</b>
          <div className="big-number">{totals.in_progress ?? 0}</div>
        </div>

        <div className="card">
          <b>{t("common.resolved")}</b>
          <div className="big-number">{totals.resolved ?? 0}</div>
        </div>

        <div className="card">
          <b>{t("common.rejected")}</b>
          <div className="big-number">{totals.rejected ?? 0}</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>{t("admin.analytics.statusBreakdown")}</h2>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPie}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label={({ name }) => t(`common.${name}`)}
                >
                  {statusPie.map((_, i) => (
                    <Cell
                      key={i}
                      fill={pieColors[i % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  formatter={(value) => t(`common.${value}`)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>{t("admin.analytics.topCities")}</h2>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>{t("admin.analytics.byCategory")}</h2>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>{t("admin.analytics.monthlyTrend")}</h2>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
