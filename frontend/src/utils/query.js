export function buildQuery(params) {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === "string" && v.trim() === "") return;
    qs.set(k, typeof v === "string" ? v.trim() : String(v));
  });

  return qs.toString();
}
