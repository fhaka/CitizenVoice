const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  listMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} = require("../controllers/notificationController");

router.get("/", authMiddleware, listMyNotifications);
router.put("/read-all", authMiddleware, markAllNotificationsRead);
router.put("/:id/read", authMiddleware, markNotificationRead);

module.exports = router;
