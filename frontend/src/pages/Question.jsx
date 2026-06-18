import { Link, useParams } from "react-router-dom";
import "./HelpCenter.css";
import { HELP_QUESTIONS } from "../data/helpQuestions";

export default function Question() {
  const { id } = useParams();
  const item = HELP_QUESTIONS.find((q) => q.id === id);

  if (!item) {
    return (
      <div className="help-wrap">
        <div className="help-header">
          <h1 className="help-title">Question not found</h1>
          <p className="help-sub">This question does not exist (or was removed).</p>
          <Link className="help-link" to="/faqs">
            ← Back to FAQs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="help-wrap">
      <div className="help-header">
        <div className="help-breadcrumb">
          <Link to="/faqs" className="help-link">
            ← FAQs
          </Link>
          <span className="help-dot">•</span>
          <span className="help-pill">{item.category}</span>
        </div>

        <h1 className="help-title">{item.question}</h1>
        <p className="help-sub">{item.answer}</p>

        <div className="help-cta-row">
          <Link to="/contact" className="help-btn">
            Contact support
          </Link>
          <Link to="/how-it-works" className="help-btn secondary">
            How it works
          </Link>
        </div>
      </div>
    </div>
  );
}
