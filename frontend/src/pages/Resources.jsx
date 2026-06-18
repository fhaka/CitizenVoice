import { Link } from "react-router-dom";

const cityServices = [
  {
    title: "Roads & sidewalks",
    description: "Potholes, damaged pavement, blocked sidewalks, missing signs.",
    department: "Public Works",
  },
  {
    title: "Sanitation",
    description: "Overflowing bins, illegal dumping, street cleaning requests.",
    department: "Waste Management",
  },
  {
    title: "Street lighting",
    description: "Broken lamps, dark streets, damaged lighting poles.",
    department: "Infrastructure",
  },
  {
    title: "Water & utilities",
    description: "Leaks, blocked drains, water supply interruptions.",
    department: "Utilities",
  },
];

const tips = [
  "Use a clear title that says what and where the issue is.",
  "Add a photo when possible so administrators can verify faster.",
  "Pin the location on the map if the issue is tied to a specific place.",
  "Track updates from My Reports after submitting.",
];

export default function Resources() {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Citizen resources</div>
          <h1>City services and reporting guidance</h1>
          <p className="muted">
            Find the right category, prepare a complete report, and follow what happens next.
          </p>
        </div>
        <Link className="btn-primary" to="/report">Report an issue</Link>
      </div>

      <div className="grid-2">
        <section className="card">
          <h2>Service categories</h2>
          <div className="cards">
            {cityServices.map((service) => (
              <div className="resource-row" key={service.title}>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="status resolved">{service.department}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>Before you submit</h2>
          <ul className="resource-list">
            {tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <div className="resource-actions">
            <Link className="btn-outline" to="/how-it-works">How it works</Link>
            <Link className="btn-outline" to="/faqs">FAQs</Link>
          </div>
        </section>
      </div>

      <section className="card resource-wide">
        <h2>Useful shortcuts</h2>
        <div className="resource-shortcuts">
          <Link to="/my-reports">Track my reports</Link>
          <Link to="/community">Browse community reports</Link>
          <Link to="/contact">Contact support</Link>
          <Link to="/settings">Notification settings</Link>
        </div>
      </section>
    </div>
  );
}
