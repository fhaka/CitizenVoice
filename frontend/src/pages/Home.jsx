import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <div className="home-hero">
        <div>
          <div className="eyebrow">Citizen portal</div>
          <h1>CitizenVoice</h1>
          <p>Welcome. Please login or continue as guest to browse community reports.</p>
        </div>
        <div className="home-actions">
          <Link className="btn-primary" to="/login">Login</Link>
          <Link className="btn-outline" to="/guest">Continue as guest</Link>
        </div>
      </div>
    </div>
  );
}
