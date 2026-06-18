import { useEffect, useMemo, useState } from "react";
import { buildQuery } from "../utils/query";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTranslation } from "react-i18next";

const API_URL = "http://localhost:5000";

export default function Community() {
  const { t } = useTranslation();
  const { token, role } = useAuth();
  const isGuest = !token || role === "guest";

  const savedKey = "community_filters_v1";

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // comments cache: { [reportId]: { loaded: boolean, items: [] } }
  const [commentsByReport, setCommentsByReport] = useState({});
  const [commentDraft, setCommentDraft] = useState({}); // { [reportId]: "text" }

  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem(savedKey);
    return saved
      ? JSON.parse(saved)
      : { q: "", status: "", city: "", category: "", sort: "newest", page: 1, pageSize: 6 };
  });

  function setField(name, value) {
    setFilters((p) => ({ ...p, [name]: value, page: 1 }));
  }

  const queryString = useMemo(() => {
    return buildQuery({
      q: filters.q,
      status: filters.status,
      city: filters.city,
      category: filters.category,
    });
  }, [filters.q, filters.status, filters.city, filters.category]);

  const STATUS_OPTIONS = useMemo(
    () => [
      { value: "", label: t("common.anyStatus") },
      { value: "pending", label: t("common.pending") },
      { value: "in_progress", label: t("common.inProgress") },
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

  async function load() {
    setLoading(true);
    try {
      const headers = {};
      // ✅ send token if exists to receive liked_by_me (optional auth middleware)
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/reports/community?${queryString}`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("errors.failedToLoadCommunity"));
      setReports(Array.isArray(data) ? data : []);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [queryString, token]);

  // ✅ sort (client-side)
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
  const pagedReports = sortedReports.slice((page - 1) * filters.pageSize, page * filters.pageSize);

  function saveFilters() {
    localStorage.setItem(savedKey, JSON.stringify(filters));
    alert(t("community.filtersSaved"));
  }

  function resetFilters() {
    const fresh = { q: "", status: "", city: "", category: "", sort: "newest", page: 1, pageSize: 6 };
    setFilters(fresh);
    localStorage.removeItem(savedKey);
  }

  function statusLabel(status) {
    const map = {
      pending: t("common.pending"),
      in_progress: t("common.inProgress"),
      resolved: t("common.resolved"),
      rejected: t("common.rejected"),
    };
    return map[status] || status || "-";
  }

  async function toggleLike(reportId) {
    if (isGuest) {
      alert(t("community.loginRequiredLike"));
      return;
    }

    // optimistic UI
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        const liked = !!r.liked_by_me;
        const likesCount = Number(r.likes_count || 0);
        return {
          ...r,
          liked_by_me: liked ? 0 : 1,
          likes_count: Math.max(0, likesCount + (liked ? -1 : 1)),
        };
      })
    );

    try {
      const target = reports.find((r) => r.id === reportId);
      const liked = !!target?.liked_by_me;

      const method = liked ? "DELETE" : "POST";
      const res = await fetch(`${API_URL}/api/reports/${reportId}/like`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || t("errors.likeFailed"));
    } catch (e) {
      // rollback by reloading
      await load();
      alert(e.message);
    }
  }

  async function loadComments(reportId) {
    setCommentsByReport((p) => ({ ...p, [reportId]: { loaded: false, items: p?.[reportId]?.items || [] } }));
    try {
      const res = await fetch(`${API_URL}/api/reports/${reportId}/comments`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("errors.failedToLoadComments"));

      setCommentsByReport((p) => ({ ...p, [reportId]: { loaded: true, items: Array.isArray(data) ? data : [] } }));
    } catch (e) {
      setCommentsByReport((p) => ({ ...p, [reportId]: { loaded: true, items: [] } }));
      alert(e.message);
    }
  }

  async function addComment(reportId) {
    if (isGuest) {
      alert(t("community.loginRequiredComment"));
      return;
    }

    const text = (commentDraft[reportId] || "").trim();
    if (!text) return;

    try {
      const res = await fetch(`${API_URL}/api/reports/${reportId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: text }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || t("errors.commentFailed"));

      setCommentDraft((p) => ({ ...p, [reportId]: "" }));

      // refresh comments + increment counter locally
      await loadComments(reportId);
      setReports((prev) =>
        prev.map((r) =>
          r.id === reportId
            ? { ...r, comments_count: Number(r.comments_count || 0) + 1 }
            : r
        )
      );
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="page">
      <h1>{t("community.title")}</h1>
      <p className="muted">{t("community.subtitle")}</p>

      {isGuest && (
        <p className="muted" style={{ marginTop: -6 }}>
          {t("community.guestNotice")}{" "}
          <Link to="/login" style={{ fontWeight: 800 }}>
            {t("nav.login")}
          </Link>
        </p>
      )}

      {/* FILTER BAR (Admin UI style) */}
      <div className="filter-bar filter-bar--community">
        <input
          placeholder={t("community.searchPlaceholder")}
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

        <input
          placeholder={t("community.cityPlaceholder")}
          value={filters.city}
          onChange={(e) => setField("city", e.target.value)}
        />

        <input
          placeholder={t("community.categoryPlaceholder")}
          value={filters.category}
          onChange={(e) => setField("category", e.target.value)}
        />

        <select
          value={filters.sort}
          onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value }))}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {t("community.sortPrefix")} {o.label}
            </option>
          ))}
        </select>

        <div className="actions">
          <button className="btn-primary" onClick={saveFilters}>
            {t("community.saveFilters")}
          </button>
          <button onClick={resetFilters}>{t("common.reset")}</button>

          {isGuest && (
            <Link to="/login" style={{ marginLeft: "auto", fontWeight: 800 }}>
              {t("community.loginToInteract")}
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <p>{t("community.loading")}</p>
      ) : pagedReports.length === 0 ? (
        <p>{t("community.noResults")}</p>
      ) : (
        <>
          {pagedReports.map((report) => {
            const liked = !!report.liked_by_me;
            const likesCount = Number(report.likes_count || 0);
            const commentsCount = Number(report.comments_count || 0);

            const cached = commentsByReport[report.id];
            const commentsLoaded = cached?.loaded;
            const comments = cached?.items || [];

            return (
              <div key={report.id} className="report-card">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    {/* ✅ Citizen content: DO NOT translate */}
                    <h3>{report.title}</h3>
                    <p style={{ margin: "6px 0" }}>{report.description}</p>

                    {/* Labels translated; values not translated */}
                    <p style={{ margin: "6px 0" }}>
                      <strong>{t("community.labels.category")}:</strong> {report.category} •{" "}
                      <strong>{t("community.labels.city")}:</strong> {report.city}
                    </p>
                    <p style={{ margin: "6px 0" }}>
                      <strong>{t("community.labels.status")}:</strong> {statusLabel(report.status)} •{" "}
                      <strong>{t("community.labels.reportedAt")}:</strong>{" "}
                      {new Date(report.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <Link to={`/reports/${report.id}`} style={{ fontWeight: 800 }}>
                      {t("community.viewDetails")}
                    </Link>

                    <button
                      className={liked ? "btn-primary" : ""}
                      onClick={() => toggleLike(report.id)}
                      disabled={isGuest}
                      title={isGuest ? t("community.loginRequiredTooltip") : t("community.like")}
                    >
                      {liked ? t("community.liked") : t("community.like")} ({likesCount})
                    </button>
                  </div>
                </div>

                {report.photo_url && (
                  <img
                    src={`http://localhost:5000${report.photo_url}`}
                    alt={t("community.issuePhotoAlt")}
                    className="report-img"
                  />
                )}

                {/* COMMENTS */}
                <div style={{ marginTop: 12, borderTop: "1px solid var(--border)", paddingTop: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                    <b>
                      {t("community.comments")} ({commentsCount})
                    </b>

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      {!commentsLoaded ? (
                        <button onClick={() => loadComments(report.id)}>{t("community.loadComments")}</button>
                      ) : (
                        <button onClick={() => setCommentsByReport((p) => ({ ...p, [report.id]: undefined }))}>
                          {t("community.hideComments")}
                        </button>
                      )}

                      {isGuest && <span className="muted">{t("community.loginToComment")}</span>}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <input
                      placeholder={isGuest ? t("community.loginToCommentPlaceholder") : t("community.writeComment")}
                      value={commentDraft[report.id] || ""}
                      onChange={(e) => setCommentDraft((p) => ({ ...p, [report.id]: e.target.value }))}
                      disabled={isGuest}
                    />
                    <button className="btn-primary" disabled={isGuest} onClick={() => addComment(report.id)}>
                      {t("community.post")}
                    </button>
                  </div>

                  {commentsLoaded && comments.length > 0 && (
                    <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                      {comments.slice(0, 3).map((c) => (
                        <div
                          key={c.id}
                          style={{
                            border: "1px solid var(--border)",
                            borderRadius: 10,
                            padding: 10,
                            background: "var(--card)",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            {/* name not translated */}
                            <b>{c.full_name}</b>
                            <span className="muted" style={{ fontSize: 12 }}>
                              {new Date(c.created_at).toLocaleString()}
                            </span>
                          </div>

                          {/* comment body is citizen content: DO NOT translate */}
                          <div style={{ marginTop: 6 }}>{c.body}</div>
                        </div>
                      ))}

                      {comments.length > 3 && (
                        <div className="muted" style={{ fontSize: 13 }}>
                          {t("community.moreComments", { n: comments.length - 3 })}
                        </div>
                      )}
                    </div>
                  )}

                  {commentsLoaded && comments.length === 0 && (
                    <p className="muted" style={{ marginTop: 10 }}>
                      {t("community.noCommentsYet")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* PAGINATION */}
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
              onClick={() => setFilters((p) => ({ ...p, page: Math.min(totalPages, p.page + 1) }))}
              disabled={page >= totalPages}
            >
              {t("common.next")}
            </button>

            <select
              value={filters.pageSize}
              onChange={(e) => setFilters((p) => ({ ...p, pageSize: Number(e.target.value), page: 1 }))}
              style={{ width: 140 }}
            >
              {[6, 10, 20].map((n) => (
                <option key={n} value={n}>
                  {t("community.perPage", { n })}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
