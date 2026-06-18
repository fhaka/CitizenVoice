import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import CitizenNavbar from "./components/CitizenNavbar";
import AdminNavbar from "./components/AdminNavbar";
import GuestNavbar from "./components/GuestNavbar";
import HomeNavbar from "./components/HomeNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";

import HowItWorks from "./pages/HowItWorks.jsx";
import FAQs from "./pages/FAQs.jsx";
import Question from "./pages/Question.jsx";

import GuestHome from "./pages/GuestHome";
import Home from "./pages/Home";
import AdminUserProfile from "./pages/AdminUserProfile";
import Report from "./pages/Report";
import MyReports from "./pages/MyReports";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import CitizenHome from "./pages/CitizenHome.jsx";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import AdminHome from "./pages/AdminHome.jsx";
import AdminAudit from "./pages/AdminAudit";
import ReportDetails from "./pages/ReportDetails";
import AdminReports from "./pages/AdminReports";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminUsers from "./pages/AdminUsers";
import ChangeCredentials from "./pages/ChangeCredentials";

import { useAuth } from "./context/AuthContext.jsx";

function NavbarSwitcher() {
  const { token, role } = useAuth();
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");

  // hide navbar on auth pages
  if (path === "/login" || path === "/signup") return null;

  // logged in
  if (token) {
    if (role === "admin") return <AdminNavbar />;
    if (role === "citizen") return <CitizenNavbar />;
    return null;
  }

  // not logged in
  if (path.startsWith("/guest")) return <GuestNavbar />;
  return <HomeNavbar />;
}

export default function App() {
  return (
    <Router>
      <NavbarSwitcher />

      <div className="routes-wrapper">
        <Routes>
          {/* PUBLIC */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PUBLIC HELP CENTER */}
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="/contact" element={<Contact />} />

          {/* GUEST */}
          <Route path="/guest" element={<GuestHome />} />
          <Route path="/guest/how-it-works" element={<HowItWorks />} />
          <Route path="/guest/faqs" element={<FAQs />} />
          <Route path="/guest/community" element={<Community />} />

          {/* CITIZEN */}
          <Route
            path="/citizen-home"
            element={
              <ProtectedRoute role="citizen">
                <CitizenHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute role="citizen">
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reports"
            element={
              <ProtectedRoute role="citizen">
                <MyReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute role="citizen">
                <Community />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute role="citizen">
                <Resources />
              </ProtectedRoute>
            }
          />

          {/* DETAILS (citizen/admin) */}
          <Route
            path="/reports/:id"
            element={
              <ProtectedRoute>
                <ReportDetails />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin-home"
            element={
              <ProtectedRoute role="admin">
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-reports"
            element={
              <ProtectedRoute role="admin">
                <AdminReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-analytics"
            element={
              <ProtectedRoute role="admin">
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedRoute role="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-users/:id"
            element={
              <ProtectedRoute role="admin">
                <AdminUserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-audit"
            element={
              <ProtectedRoute role="admin">
                <AdminAudit />
              </ProtectedRoute>
            }
          />

          {/* SHARED */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-credentials"
            element={
              <ProtectedRoute>
                <ChangeCredentials />
              </ProtectedRoute>
            }
          />

          {/* OPTIONAL: redirect root to /home */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
