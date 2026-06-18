import StatusBadge from "./StatusBadge";

export default function StatusTimeline({ history }) {
  if (!history || history.length === 0) return <p>No history yet.</p>;

  return (
    <div style={{ marginTop: 10 }}>
      {history.map((h, index) => (
        <div
          key={h.id ?? `${h.new_status}-${h.created_at}-${index}`}
          style={{
            borderLeft: "3px solid #ddd",
            paddingLeft: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <StatusBadge status={h.new_status} />
            <small style={{ opacity: 0.8 }}>
              {new Date(h.created_at).toLocaleString()}
            </small>
          </div>

          {h.note && <p style={{ margin: "6px 0 0" }}>{h.note}</p>}
        </div>
      ))}
    </div>
  );
}
