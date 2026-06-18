import { useEffect } from "react";
import i18n, { LOCALE_KEY } from "../i18n";

export default function LanguageGate({ children }) {
  useEffect(() => {
    const token = localStorage.getItem("token");

    // If logged out -> ALWAYS English
    if (!token) {
      localStorage.setItem(LOCALE_KEY, "en");
      if (i18n.language !== "en") i18n.changeLanguage("en");
      return;
    }

    // Logged in -> use saved user locale if present
    // If you later add /api/users/me locale, you can enhance this.
    const userId = localStorage.getItem("user_id"); // optional (if you store it)
    const perUser = userId ? localStorage.getItem(`cv_locale_user_${userId}`) : null;

    const lng = perUser || localStorage.getItem(LOCALE_KEY) || "en";
    localStorage.setItem(LOCALE_KEY, lng);
    if (i18n.language !== lng) i18n.changeLanguage(lng);
  }, []);

  return children;
}
