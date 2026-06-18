const db = require("../config/db");

async function createNotification({ userId, title, body, type = "info", link = null }) {
  if (!userId || !title || !body) return;

  try {
    await db.query(
      `INSERT INTO notifications (user_id, title, body, type, link)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, title, body, type, link]
    );
  } catch (err) {
    if (err && (err.code === "ER_NO_SUCH_TABLE" || err.errno === 1146)) return;
    throw err;
  }
}

module.exports = { createNotification };
