const db = require("../config/db");

exports.listMyNotifications = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, title, body, type, link, is_read, created_at
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    if (err && (err.code === "ER_NO_SUCH_TABLE" || err.errno === 1146)) {
      return res.json([]);
    }
    console.error("LIST NOTIFICATIONS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid notification id" });
    }

    await db.query(
      `UPDATE notifications
       SET is_read = 1
       WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    console.error("MARK NOTIFICATION READ ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markAllNotificationsRead = async (req, res) => {
  try {
    await db.query("UPDATE notifications SET is_read = 1 WHERE user_id = ?", [
      req.user.id,
    ]);

    res.json({ message: "Notifications marked as read" });
  } catch (err) {
    console.error("MARK ALL NOTIFICATIONS READ ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
