const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/requireAdmin");
const optionalAuth = require("../middleware/optionalAuth");
const upload = require("../middleware/upload");

const {
  createReport,
  getMyReports,
  getAllReports,
  getReportById,
  getReportStatusHistory,
  updateReportStatus,
  updateReportAssignment,
  getAdminReports,

  // ✅ NEW: likes & comments
  likeReport,
  unlikeReport,
  listComments,
  addComment,
} = require("../controllers/reportController");

// CREATE REPORT (Citizen)
router.post("/", authMiddleware, upload.single("photo"), createReport);

// MY REPORTS (Citizen)
router.get("/my", authMiddleware, getMyReports);

// COMMUNITY REPORTS (Public) ✅ optional auth so we can return liked_by_me
router.get("/community", optionalAuth, getAllReports);

// ADMIN REPORTS (Admin only) + optional filter ?status=
router.get("/admin", authMiddleware, requireAdmin, getAdminReports);

// ✅ LIKE / UNLIKE
router.post("/:id/like", authMiddleware, likeReport);
router.delete("/:id/like", authMiddleware, unlikeReport);

// ✅ COMMENTS (list is public, add requires auth)
router.get("/:id/comments", listComments);
router.post("/:id/comments", authMiddleware, addComment);

// REPORT DETAILS (Citizen/Admin)
router.get("/:id", authMiddleware, getReportById);

// STATUS HISTORY (Citizen/Admin)
router.get("/:id/status-history", authMiddleware, getReportStatusHistory);

// UPDATE STATUS (Admin only)
router.put("/:id/status", authMiddleware, requireAdmin, updateReportStatus);

// UPDATE ASSIGNMENT (Admin only)
router.put("/:id/assignment", authMiddleware, requireAdmin, updateReportAssignment);

module.exports = router;
