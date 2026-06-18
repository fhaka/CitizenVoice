import { useEffect, useMemo, useState } from "react";
import { buildQuery } from "../utils/query";
import "../App.css";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

export default function MyReports() {
  const { t } = useTranslation();

  const token = localStorage.getItem("token");
  const savedKey = "my_reports_filters_v1";

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem(savedKey);
    return saved
      ? JSON.parse(saved)
      : { q: "", status: "", sort: "newest", page: 1, pageSize: 6 };
  });

  function setField(name, value) {
    setFilters((p) => ({ ...p, [name]: value, page: 1 }));
  }

  // ✅ translated dropdown labels
  const STATUS_OPTIONS = useMemo(
    () => [
      { value: "", label: t("common.anyStatus") },
      { value: "pending", label: t("common.pending") },
      { value: "in_progress", label: t("common.in_progress") }, // you already have this key
      { value: "resolved", label: t("common.resolved") },
      { value: "rejected", label: t("common.rejected") },
    ],
    [t]
  );

  const SORT_OPTIONS = useMemo(
    () => [
      { value: "newest", label: t("common.sortNewest") },
      { value: "oldest", label: t("common.sortOldest") },
      { value: "status", label: t("common.sortStatus") },
    ],
    [t]
  );

  const queryString = useMemo(() => {
    return buildQuery({
      q: filters.q,
      status: filters.status,
    });
  }, [filters.q, filters.status]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/reports/my?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("myReports.errors.loadFail"));
      setReports(data);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [queryString]);

  // ✅ client-side sort
  const sortedReports = useMemo(() => {
    const arr = [...reports];
    if (filters.sort === "newest") {
      arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filters.sort === "oldest") {
      arr.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (filters.sort === "status") {
      arr.sort((a, b) => (a.status || "").localeCompare(b.status || ""));
    }
    return arr;
  }, [reports, filters.sort]);

  // ✅ pagination
  const totalPages = Math.max(1, Math.ceil(sortedReports.length / filters.pageSize));
  const page = Math.min(filters.page, totalPages);
  const pagedReports = sortedReports.slice(
    (page - 1) * filters.pageSize,
    page * filters.pageSize
  );

  function saveFilters() {
    localStorage.setItem(savedKey, JSON.stringify(filters));
    alert(t("myReports.filtersSaved"));
  }

  function resetFilters() {
    const fresh = { q: "", status: "", sort: "newest", page: 1, pageSize: 6 };
    setFilters(fresh);
    localStorage.removeItem(savedKey);
  }

  // ✅ translate status value shown in cards
  const statusLabel = (status) => {
    if (status === "pending") return t("common.pending");
    if (status === "in_progress") return t("common.in_progress");
    if (status === "resolved") return t("common.resolved");
    if (status === "rejected") return t("common.rejected");
    return status || "-";
  };

  return (
    <div className="page">
      <h1>{t("myReports.title")}</h1>
      <p style={{ marginTop: 6, opacity: 0.85 }}>{t("myReports.subtitle")}</p>

      <div className="filter-bar filter-bar--myreports">
        <input
          placeholder={t("myReports.searchPlaceholder")}
          value={filters.q}
          onChange={(e) => setField("q", e.target.value)}
        />

        <select value={filters.status} onChange={(e) => setField("status", e.target.value)}>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value }))}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {t("myReports.sortPrefix")} {o.label}
            </option>
          ))}
        </select>

        <div className="actions">
          <button onClick={saveFilters}>{t("myReports.saveFilters")}</button>
          <button onClick={resetFilters}>{t("common.reset")}</button>
        </div>
      </div>

      {loading ? (
        <p>{t("common.loading")}</p>
      ) : pagedReports.length === 0 ? (
        <p>{t("myReports.noResults")}</p>
      ) : (
        <>
          {pagedReports.map((r) => (
            <div key={r.id} className="report-card">
              <h3>{r.title}</h3>
              <p>{r.description}</p>
              <p>
                <strong>{t("myReports.labels.status")}:</strong> {statusLabel(r.status)} •{" "}
                <strong>{t("myReports.labels.city")}:</strong> {r.city}
              </p>
              <p>
                <strong>{t("myReports.labels.reportedAt")}:</strong>{" "}
                {new Date(r.created_at).toLocaleString()}
              </p>

              {r.photo_url && (
                <img
                  src={`${API_URL}${r.photo_url}`}
                  alt={t("myReports.issuePhotoAlt")}
                  className="report-img"
                />
              )}
            </div>
          ))}

          <div className="pagination">
            <button
              onClick={() => setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))}
              disabled={page <= 1}
            >
              {t("common.prev")}
            </button>

            <div>
              {t("common.page")} <b>{page}</b> {t("common.of")} <b>{totalPages}</b>
            </div>

            <button
              onClick={() =>
                setFilters((p) => ({ ...p, page: Math.min(totalPages, p.page + 1) }))
              }
              disabled={page >= totalPages}
            >
              {t("common.next")}
            </button>

            <select
              value={filters.pageSize}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  pageSize: Number(e.target.value),
                  page: 1,
                }))
              }
            >
              {[6, 10, 20].map((n) => (
                <option key={n} value={n}>
                  {t("common.perPage", { n })}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
