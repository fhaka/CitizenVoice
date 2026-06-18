import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { initTheme } from "./utils/theme";
initTheme();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
