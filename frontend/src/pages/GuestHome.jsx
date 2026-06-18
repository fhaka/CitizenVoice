import Community from "./Community.jsx";
export default function GuestHome() {
  return (
    <div className="page">
      <h1>Community reports</h1>
      <p className="muted">
        You are browsing as a guest. Login to report issues, view your reports, or interact.
      </p>

      <Community />
    </div>
  );
}
