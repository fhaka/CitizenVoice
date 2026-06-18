export default function StatusBadge({ status }) {
  const s = (status || "pending").toLowerCase();

  const styles = {
    pending: { background: "var(--amber-soft)", color: "var(--amber-ink)" },
    in_progress: { background: "var(--blue-soft)", color: "var(--blue-ink)" },
    resolved: { background: "var(--green-soft)", color: "var(--green-ink)" },
    rejected: { background: "var(--red-soft)", color: "var(--red-ink)" },
  };

  const style = {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    fontWeight: 650,
    fontSize: "11.5px",
    ...(styles[s] || styles.pending),
  };

  const labelMap = {
    pending: "Pending",
    in_progress: "In Progress",
    resolved: "Resolved",
    rejected: "Rejected",
  };

  return <span style={style}>{labelMap[s] || "Pending"}</span>;
}
