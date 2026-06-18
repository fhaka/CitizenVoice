const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/requireAdmin");

const {
  listUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  getUserReports,
  getAnalytics,
  listAuditLogs,
} = require("../controllers/adminController");

const {
  listContactMessages,
} = require("../controllers/contactController");

// ================= USERS =================
router.get("/users", authMiddleware, requireAdmin, listUsers);
router.get("/users/:id", authMiddleware, requireAdmin, getUserById);
router.put("/users/:id/role", authMiddleware, requireAdmin, updateUserRole);
router.put("/users/:id/status", authMiddleware, requireAdmin, updateUserStatus);
router.get("/users/:id/reports", authMiddleware, requireAdmin, getUserReports);

// ================= CONTACT MESSAGES ✅ =================
router.get("/contacts", authMiddleware, requireAdmin, listContactMessages);

// ================= ANALYTICS =================
router.get("/analytics", authMiddleware, requireAdmin, getAnalytics);

// ================= AUDIT LOGS =================
router.get("/audit", authMiddleware, requireAdmin, listAuditLogs);
router.get("/audit-logs", authMiddleware, requireAdmin, listAuditLogs);

module.exports = router;
