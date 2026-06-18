const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  getMe,
  updateMe,
  updateMyPhoto,
  updateMyCredentials,
  deleteMe, // ✅ NEW
} = require("../controllers/userController");

router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateMe);
router.put("/me/photo", authMiddleware, upload.single("photo"), updateMyPhoto);
router.put("/me/credentials", authMiddleware, updateMyCredentials);

// ✅ Delete account
router.delete("/me", authMiddleware, deleteMe);

module.exports = router;

