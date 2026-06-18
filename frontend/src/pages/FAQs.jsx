import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./HelpCenter.css";
import { HELP_QUESTIONS } from "../data/helpQuestions";
import { useTranslation } from "react-i18next";

export default function FAQs() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  // translate the data here
  const translatedQuestions = useMemo(() => {
    return HELP_QUESTIONS.map((x) => ({
      id: x.id,
      category: t(x.categoryKey),
      question: t(x.questionKey),
      answer: t(x.answerKey),
    }));
  }, [t]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return translatedQuestions;
    return translatedQuestions.filter((x) => {
      const hay = `${x.category} ${x.question} ${x.answer}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, translatedQuestions]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((item) => {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category).push(item);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="help-wrap">
      <div className="help-header">
        <h1 className="help-title">{t("help.faqs.title")}</h1>
        <p className="help-sub">{t("help.faqs.subtitle")}</p>

        <div className="help-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("help.faqs.search")}
          />
          {query.trim() && (
            <button className="help-clear" onClick={() => setQuery("")}>
              {t("help.faqs.clear")}
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="help-empty">
          <b>{t("help.faqs.noResultsTitle")}</b>
          <div>{t("help.faqs.noResultsBody")}</div>
        </div>
      ) : (
        <div className="help-sections">
          {grouped.map(([cat, items]) => (
            <section key={cat} className="help-section">
              <div className="help-section-title">{cat}</div>

              <div className="help-accordion">
                {items.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div key={item.id} className={`help-item ${isOpen ? "open" : ""}`}>
                      <button
                        type="button"
                        className="help-q"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                      >
                        <span>{item.question}</span>
                        <span className="help-chevron">{isOpen ? "−" : "+"}</span>
                      </button>

                      {isOpen && (
                        <div className="help-a">
                          <p>{item.answer}</p>
                          <div className="help-actions">
                            <Link className="help-link" to={`/question/${item.id}`}>
                              {t("help.faqs.openQuestion")} →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
