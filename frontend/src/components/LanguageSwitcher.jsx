import { useTranslation } from "react-i18next";
import i18n, { LOCALE_KEY } from "../i18n";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher({ compact = false }) {
  const { t } = useTranslation();

  return (
    <div className={`lang-switcher ${compact ? "compact" : ""}`}>
      🌐
      <select
        value={i18n.language}
        onChange={(e) => {
          const lng = e.target.value;
          localStorage.setItem(LOCALE_KEY, lng);
          i18n.changeLanguage(lng);
        }}
      >
        <option value="en">{t("languages.en")}</option>
        <option value="it">{t("languages.it")}</option>
        <option value="de">{t("languages.de")}</option>
        <option value="es">{t("languages.es")}</option>
        <option value="sq">{t("languages.sq")}</option>
      </select>
    </div>
  );
}
