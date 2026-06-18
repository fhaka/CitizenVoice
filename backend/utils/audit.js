const db = require("../config/db");

async function audit({ adminId, action, entityType, entityId = null, details = null }) {
  try {
    await db.query(
      `INSERT INTO admin_audit_logs (admin_id, action, entity_type, entity_id, details)
       VALUES (?, ?, ?, ?, ?)`,
      [adminId, action, entityType, entityId, details ? JSON.stringify(details) : null]
    );
  } catch (err) {
    if (err && (err.code === "ER_NO_SUCH_TABLE" || err.errno === 1146)) return;
    throw err;
  }
}

module.exports = { audit };
