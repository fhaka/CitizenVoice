import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import i18n, { LOCALE_KEY } from "../i18n";

const API_URL = "http://localhost:5000";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [fullName, setFullName] = useState(localStorage.getItem("full_name") || "");
  const [personalId, setPersonalId] = useState(localStorage.getItem("personal_id") || "");

  useEffect(() => {
    const sync = () => {
      setToken(localStorage.getItem("token") || "");
      setRole(localStorage.getItem("role") || "");
      setFullName(localStorage.getItem("full_name") || "");
      setPersonalId(localStorage.getItem("personal_id") || "");
    };

    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const applyUserLocale = useCallback(async (pid) => {
    if (!pid) return;
    const key = `cv_locale_user_${pid}`;
    const userLng = localStorage.getItem(key) || "en";

    localStorage.setItem(LOCALE_KEY, userLng);
    if (i18n.language !== userLng) {
      await i18n.changeLanguage(userLng);
    }
  }, []);

  // ✅ Accepts either {token, user:{...}} OR flat fields
  const login = useCallback(async (payload) => {
    const tok = payload?.token || "";
    const user = payload?.user || null;

    const resolvedRole = user?.role ?? payload?.role ?? "";
    const resolvedFullName = user?.full_name ?? payload?.full_name ?? "";
    const resolvedPersonalId = user?.personal_id ?? payload?.personal_id ?? "";

    if (!tok) {
      throw new Error("Missing token from login response");
    }

    localStorage.setItem("token", tok);
    localStorage.setItem("role", resolvedRole);
    localStorage.setItem("full_name", resolvedFullName);

    setToken(tok);
    setRole(resolvedRole);
    setFullName(resolvedFullName);

    // If backend didn't return personal_id, try /me
    let pid = resolvedPersonalId;

    if (!pid) {
      try {
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${tok}` },
        });
        const me = await res.json();
        if (res.ok && me?.personal_id) pid = me.personal_id;
      } catch {
        // ignore
      }
    }

    if (pid) {
      localStorage.setItem("personal_id", pid);
      setPersonalId(pid);
      await applyUserLocale(pid);
    } else {
      // keep locale as-is (don’t force reset)
      localStorage.removeItem("personal_id");
      setPersonalId("");
    }
  }, [applyUserLocale]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("full_name");
    localStorage.removeItem("personal_id");

    setToken("");
    setRole("");
    setFullName("");
    setPersonalId("");
  }, []);

  const value = useMemo(
    () => ({ token, role, fullName, personalId, login, logout }),
    [token, role, fullName, personalId, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
