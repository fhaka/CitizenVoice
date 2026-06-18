// backend/controllers/adminController.js
const db = require("../config/db");
const { audit } = require("../utils/audit");

const VALID_ROLES = ["admin", "citizen"];

function asPositiveInt(value) {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
}

exports.listUsers = async (req, res) => {
  try {
    const { q, role, active } = req.query;

    let sql = `
      SELECT id, role, personal_id, full_name, email, phone, city, profile_photo, is_active, created_at
      FROM users
      WHERE 1=1
    `;
    const params = [];

    if (q) {
      sql += ` AND (full_name LIKE ? OR email LIKE ? OR personal_id LIKE ?) `;
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (role && VALID_ROLES.includes(role)) {
      sql += ` AND role = ? `;
      params.push(role);
    }

    if (active === "1" || active === "0") {
      sql += ` AND is_active = ? `;
      params.push(Number(active));
    }

    sql += ` ORDER BY created_at DESC `;

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("ADMIN listUsers ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = asPositiveInt(req.params.id);
    if (!userId) return res.status(400).json({ message: "Invalid user id" });

    const [rows] = await db.query(
      `SELECT id, role, personal_id, full_name, email, phone, city, profile_photo, is_active, created_at
       FROM users
       WHERE id = ?`,
      [userId]
    );

    if (!rows.length) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("ADMIN getUserById ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const userId = asPositiveInt(req.params.id);
    if (!userId) return res.status(400).json({ message: "Invalid user id" });

    const { role } = req.body;

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    await db.query("UPDATE users SET role = ? WHERE id = ?", [role, userId]);

    await audit({
      adminId: req.user.id,
      action: "USER_ROLE_UPDATED",
      entityType: "user",
      entityId: userId,
      details: { role },
    });

    res.json({ message: "Role updated" });
  } catch (err) {
    console.error("ADMIN updateUserRole ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const userId = asPositiveInt(req.params.id);
    if (!userId) return res.status(400).json({ message: "Invalid user id" });

    const { is_active } = req.body;

    if (is_active !== 0 && is_active !== 1) {
      return res.status(400).json({ message: "is_active must be 0 or 1" });
    }

    await db.query("UPDATE users SET is_active = ? WHERE id = ?", [is_active, userId]);

    await audit({
      adminId: req.user.id,
      action: "USER_ACTIVE_UPDATED",
      entityType: "user",
      entityId: userId,
      details: { is_active },
    });

    res.json({ message: "User status updated" });
  } catch (err) {
    console.error("ADMIN updateUserStatus ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserReports = async (req, res) => {
  try {
    const userId = asPositiveInt(req.params.id);
    if (!userId) return res.status(400).json({ message: "Invalid user id" });

    const [rows] = await db.query(
      `SELECT r.*
       FROM reports r
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("ADMIN getUserReports ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const [[totals]] = await db.query(`
      SELECT
        COUNT(*) AS total_reports,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress,
        SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) AS resolved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected
      FROM reports
    `);

    const [byCategory] = await db.query(`
      SELECT category, COUNT(*) AS count
      FROM reports
      GROUP BY category
      ORDER BY count DESC
    `);

    const [byCity] = await db.query(`
      SELECT city, COUNT(*) AS count
      FROM reports
      GROUP BY city
      ORDER BY count DESC
      LIMIT 10
    `);

    const [monthly] = await db.query(`
      SELECT
        DATE_FORMAT(created_at, '%Y-%m') AS month,
        COUNT(*) AS count
      FROM reports
      GROUP BY month
      ORDER BY month ASC
    `);

    res.json({ totals, byCategory, byCity, monthly });
  } catch (err) {
    console.error("ADMIN analytics ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listAuditLogs = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 100), 500);

    const [rows] = await db.query(
      `SELECT
         l.id,
         l.admin_id,
         u.full_name AS admin_name,
         l.action,
         l.entity_type,
         l.entity_id,
         l.details,
         l.created_at
       FROM admin_audit_logs l
       LEFT JOIN users u ON u.id = l.admin_id
       ORDER BY l.created_at DESC
       LIMIT ?`,
      [limit]
    );

    res.json(rows);
  } catch (err) {
    console.error("ADMIN audit logs ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
