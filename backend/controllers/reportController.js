const db = require("../config/db");
const { audit } = require("../utils/audit");
const { createNotification } = require("../services/notificationService");

const VALID_STATUSES = ["pending", "in_progress", "resolved", "rejected"];
const VALID_PRIORITIES = ["low", "medium", "high", "urgent"];
let assignmentColumnsReady = false;
let assignmentColumnsPromise = null;

// helper to normalize empty values
function toNull(v) {
  if (v === undefined || v === null) return null;
  if (typeof v === "string" && v.trim() === "") return null;
  return v;
}

function isIgnorableMigrationError(err) {
  return [
    "ER_DUP_FIELDNAME",
    "ER_DUP_KEYNAME",
    "ER_CANT_CREATE_TABLE",
    "ER_FK_DUP_NAME",
  ].includes(err?.code);
}

async function runOptionalSchemaChange(sql) {
  try {
    await db.query(sql);
  } catch (err) {
    if (isIgnorableMigrationError(err)) return;
    throw err;
  }
}

async function ensureReportAssignmentColumns() {
  if (assignmentColumnsReady) return true;
  if (assignmentColumnsPromise) return assignmentColumnsPromise;

  assignmentColumnsPromise = (async () => {
    await runOptionalSchemaChange(
      "ALTER TABLE reports ADD COLUMN assigned_admin_id INT DEFAULT NULL"
    );
    await runOptionalSchemaChange(
      "ALTER TABLE reports ADD COLUMN assigned_department VARCHAR(100) DEFAULT NULL"
    );
    await runOptionalSchemaChange(
      "ALTER TABLE reports ADD COLUMN priority ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium'"
    );
    await runOptionalSchemaChange(
      "CREATE INDEX idx_reports_assigned_admin ON reports(assigned_admin_id)"
    );
    await runOptionalSchemaChange(
      "CREATE INDEX idx_reports_priority ON reports(priority)"
    );
    await runOptionalSchemaChange(
      `ALTER TABLE reports
       ADD CONSTRAINT fk_reports_assigned_admin
       FOREIGN KEY (assigned_admin_id) REFERENCES users(id) ON DELETE SET NULL`
    );

    assignmentColumnsReady = true;
    return true;
  })();

  try {
    return await assignmentColumnsPromise;
  } finally {
    assignmentColumnsPromise = null;
  }
}

// ======================
// CREATE REPORT (Citizen)
// ======================
exports.createReport = async (req, res) => {
  try {
    const { title, description, category, city, latitude, longitude } = req.body;

    if (!title || !description || !category || !city) {
      return res.status(400).json({
        message: "title, description, category, city are required",
      });
    }

    const userId = req.user.id;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.query(
      `INSERT INTO reports 
       (title, description, category, city, latitude, longitude, photo_url, user_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        title,
        description,
        category,
        city,
        toNull(latitude),
        toNull(longitude),
        photoUrl,
        userId,
      ]
    );

    const reportId = result.insertId;

    // ✅ history insert (ONLY valid columns)
    await db.query(
      `INSERT INTO report_status_history
       (report_id, old_status, new_status, note, changed_by)
       VALUES (?, NULL, 'pending', 'Report created', ?)`,
      [reportId, userId]
    );

    return res.status(201).json({ message: "Report created", reportId });
  } catch (err) {
    console.error("CREATE REPORT ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================
// MY REPORTS (Citizen) + filters
// GET /api/reports/my?status=&city=&category=&q=
// ======================
exports.getMyReports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, city, category, q } = req.query;

    let sql = `
      SELECT *
      FROM reports
      WHERE user_id = ?
    `;
    const params = [userId];

    if (status) {
      // optional: validate if you only want valid statuses
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ message: "Invalid status filter" });
      }
      sql += ` AND status = ? `;
      params.push(status);
    }
    if (city) {
      sql += ` AND city LIKE ? `;
      params.push(`%${city}%`);
    }
    if (category) {
      sql += ` AND category LIKE ? `;
      params.push(`%${category}%`);
    }
    if (q) {
      sql += ` AND (title LIKE ? OR description LIKE ?) `;
      params.push(`%${q}%`, `%${q}%`);
    }

    sql += ` ORDER BY created_at DESC `;

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("GET MY REPORTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// COMMUNITY REPORTS (Public/Citizen) + filters
// GET /api/reports/community?status=&city=&category=&q=
// ======================
exports.getAllReports = async (req, res) => {
  try {
    const { status, city, category, q } = req.query;
    const userId = req.user?.id || null;

    let sql = `
      SELECT 
        r.id, r.title, r.description, r.category, r.city,
        r.latitude, r.longitude, r.photo_url, r.status, r.created_at,

        -- counts
        (SELECT COUNT(*) FROM report_likes rl WHERE rl.report_id = r.id) AS likes_count,
        (SELECT COUNT(*) FROM report_comments rc WHERE rc.report_id = r.id) AS comments_count,

        -- liked by me (0/1)
        ${userId
        ? `(SELECT COUNT(*) FROM report_likes rl2 WHERE rl2.report_id = r.id AND rl2.user_id = ?) AS liked_by_me`
        : `0 AS liked_by_me`
      }

      FROM reports r
      WHERE 1=1
    `;

    const params = [];
    if (userId) params.push(userId);

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ message: "Invalid status filter" });
      }
      sql += ` AND r.status = ? `;
      params.push(status);
    }

    if (city) {
      sql += ` AND r.city LIKE ? `;
      params.push(`%${city}%`);
    }

    if (category) {
      sql += ` AND r.category LIKE ? `;
      params.push(`%${category}%`);
    }

    if (q) {
      sql += ` AND (r.title LIKE ? OR r.description LIKE ?) `;
      params.push(`%${q}%`, `%${q}%`);
    }

    sql += ` ORDER BY r.created_at DESC `;

    const [rows] = await db.query(sql, params);

    // normalize liked_by_me into boolean-ish number 0/1
    const fixed = rows.map((r) => ({
      ...r,
      liked_by_me: Number(r.liked_by_me || 0) > 0 ? 1 : 0,
      likes_count: Number(r.likes_count || 0),
      comments_count: Number(r.comments_count || 0),
    }));

    res.json(fixed);
  } catch (err) {
    console.error("GET COMMUNITY REPORTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ======================
// REPORT DETAILS (Citizen/Admin)
// ======================
exports.getReportById = async (req, res) => {
  try {
    const reportId = Number(req.params.id);
    if (!Number.isFinite(reportId)) {
      return res.status(400).json({ message: "Invalid report id" });
    }

    const [rows] = await db.query(
      `SELECT r.*, u.full_name
       FROM reports r
       JOIN users u ON u.id = r.user_id
       WHERE r.id = ?`,
      [reportId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Report not found" });
    }

    const report = rows[0];

    if (req.user.role !== "admin" && report.user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(report);
  } catch (err) {
    console.error("GET REPORT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// STATUS HISTORY (Citizen/Admin)
// GET /api/reports/:id/history
// ======================
exports.getReportStatusHistory = async (req, res) => {
  try {
    const reportId = Number(req.params.id);
    if (!Number.isFinite(reportId)) {
      return res.status(400).json({ message: "Invalid report id" });
    }

    const [rep] = await db.query("SELECT user_id FROM reports WHERE id = ?", [
      reportId,
    ]);

    if (!rep.length) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (req.user.role !== "admin" && rep[0].user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const [rows] = await db.query(
      `SELECT
         h.id,
         h.old_status,
         h.new_status,
         h.note,
         h.created_at,
         u.full_name AS changed_by
       FROM report_status_history h
       LEFT JOIN users u ON h.changed_by = u.id
       WHERE h.report_id = ?
       ORDER BY h.created_at ASC`,
      [reportId]
    );

    res.json(rows);
  } catch (err) {
    console.error("GET STATUS HISTORY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// UPDATE STATUS (Admin only)
// PUT /api/reports/:id/status { status, admin_note }
// ======================
exports.updateReportStatus = async (req, res) => {
  try {
    const reportId = Number(req.params.id);
    if (!Number.isFinite(reportId)) {
      return res.status(400).json({ message: "Invalid report id" });
    }

    const { status, admin_note } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // ✅ load old status first
    const [rows] = await db.query("SELECT id, title, status, user_id FROM reports WHERE id = ?", [
      reportId,
    ]);
    if (!rows.length) return res.status(404).json({ message: "Report not found" });

    const oldStatus = rows[0].status;

    // ✅ update report status + note
    await db.query("UPDATE reports SET status = ?, admin_note = ? WHERE id = ?", [
      status,
      toNull(admin_note),
      reportId,
    ]);

    // ✅ insert into report_status_history (ONLY correct columns)
    await db.query(
      `INSERT INTO report_status_history
       (report_id, old_status, new_status, note, changed_by)
       VALUES (?, ?, ?, ?, ?)`,
      [reportId, oldStatus, status, toNull(admin_note), req.user.id]
    );

    await audit({
      adminId: req.user.id,
      action: "REPORT_STATUS_UPDATED",
      entityType: "report",
      entityId: reportId,
      details: { old_status: oldStatus, new_status: status, admin_note: toNull(admin_note) },
    });

    await createNotification({
      userId: rows[0].user_id,
      title: "Report status updated",
      body: `"${rows[0].title}" is now ${status.replace("_", " ")}.`,
      type: "report_status",
      link: `/reports/${reportId}`,
    });

    res.json({ message: "Status updated" });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// UPDATE ASSIGNMENT (Admin only)
// PUT /api/reports/:id/assignment { assigned_admin_id, assigned_department, priority }
// ======================
exports.updateReportAssignment = async (req, res) => {
  try {
    await ensureReportAssignmentColumns();

    const reportId = Number(req.params.id);
    if (!Number.isInteger(reportId) || reportId <= 0) {
      return res.status(400).json({ message: "Invalid report id" });
    }

    const assignedAdminId =
      req.body.assigned_admin_id === "" ||
      req.body.assigned_admin_id === undefined ||
      req.body.assigned_admin_id === null
        ? null
        : Number(req.body.assigned_admin_id);
    const assignedDepartment = toNull(req.body.assigned_department);
    const priority = req.body.priority || "medium";

    if (assignedAdminId !== null && (!Number.isInteger(assignedAdminId) || assignedAdminId <= 0)) {
      return res.status(400).json({ message: "Invalid assigned admin" });
    }

    if (!VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }

    const [reports] = await db.query(
      "SELECT id, title, assigned_admin_id, assigned_department, priority FROM reports WHERE id = ?",
      [reportId]
    );
    if (!reports.length) return res.status(404).json({ message: "Report not found" });

    if (assignedAdminId !== null) {
      const [admins] = await db.query(
        "SELECT id FROM users WHERE id = ? AND role = 'admin' AND is_active = 1",
        [assignedAdminId]
      );
      if (!admins.length) {
        return res.status(400).json({ message: "Assigned user must be an active admin" });
      }
    }

    await db.query(
      `UPDATE reports
       SET assigned_admin_id = ?, assigned_department = ?, priority = ?
       WHERE id = ?`,
      [assignedAdminId, assignedDepartment, priority, reportId]
    );

    await audit({
      adminId: req.user.id,
      action: "REPORT_ASSIGNED",
      entityType: "report",
      entityId: reportId,
      details: {
        previous: {
          assigned_admin_id: reports[0].assigned_admin_id,
          assigned_department: reports[0].assigned_department,
          priority: reports[0].priority,
        },
        next: {
          assigned_admin_id: assignedAdminId,
          assigned_department: assignedDepartment,
          priority,
        },
      },
    });

    if (assignedAdminId) {
      await createNotification({
        userId: assignedAdminId,
        title: "Report assigned to you",
        body: `"${reports[0].title}" has been assigned to you.`,
        type: "assignment",
        link: `/admin-reports`,
      });
    }

    res.json({ message: "Assignment updated" });
  } catch (err) {
    console.error("UPDATE ASSIGNMENT ERROR:", err);
    if (err && (err.code === "ER_BAD_FIELD_ERROR" || err.errno === 1054)) {
      return res.status(500).json({
        message: "Assignment columns are missing. Please apply the latest database.sql migration.",
      });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// ADMIN REPORTS (Admin only)
// GET /api/reports/admin?status=
// ======================
exports.getAdminReports = async (req, res) => {
  try {
    const status = req.query.status; // optional
    let hasAssignmentColumns = true;

    try {
      await ensureReportAssignmentColumns();
    } catch (migrationErr) {
      hasAssignmentColumns = false;
      console.warn(
        "Assignment columns are not available yet; returning reports without assignment fields:",
        migrationErr.message
      );
    }

    let sql = hasAssignmentColumns
      ? `
      SELECT r.*, u.full_name, au.full_name AS assigned_admin_name
      FROM reports r
      JOIN users u ON u.id = r.user_id
      LEFT JOIN users au ON au.id = r.assigned_admin_id
    `
      : `
      SELECT r.*, u.full_name,
             NULL AS assigned_admin_id,
             NULL AS assigned_department,
             'medium' AS priority,
             NULL AS assigned_admin_name
      FROM reports r
      JOIN users u ON u.id = r.user_id
    `;
    const params = [];

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ message: "Invalid status filter" });
      }
      sql += ` WHERE r.status = ? `;
      params.push(status);
    }

    sql += ` ORDER BY r.created_at DESC `;

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("GET ADMIN REPORTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// LIKE REPORT (Citizen)
// POST /api/reports/:id/like
// ======================
exports.likeReport = async (req, res) => {
  try {
    const reportId = Number(req.params.id);
    if (!Number.isFinite(reportId)) return res.status(400).json({ message: "Invalid report id" });

    // ensure report exists
    const [rep] = await db.query("SELECT id FROM reports WHERE id = ?", [reportId]);
    if (!rep.length) return res.status(404).json({ message: "Report not found" });

    await db.query(
      `INSERT IGNORE INTO report_likes (report_id, user_id) VALUES (?, ?)`,
      [reportId, req.user.id]
    );

    res.json({ message: "Liked" });
  } catch (err) {
    console.error("LIKE REPORT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// UNLIKE REPORT
// DELETE /api/reports/:id/like
// ======================
exports.unlikeReport = async (req, res) => {
  try {
    const reportId = Number(req.params.id);
    if (!Number.isFinite(reportId)) return res.status(400).json({ message: "Invalid report id" });

    await db.query(`DELETE FROM report_likes WHERE report_id = ? AND user_id = ?`, [
      reportId,
      req.user.id,
    ]);

    res.json({ message: "Unliked" });
  } catch (err) {
    console.error("UNLIKE REPORT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// LIST COMMENTS (Public)
// GET /api/reports/:id/comments
// ======================
exports.listComments = async (req, res) => {
  try {
    const reportId = Number(req.params.id);
    if (!Number.isFinite(reportId)) return res.status(400).json({ message: "Invalid report id" });

    const [rows] = await db.query(
      `SELECT c.id, c.body, c.created_at, u.full_name
       FROM report_comments c
       JOIN users u ON u.id = c.user_id
       WHERE c.report_id = ?
       ORDER BY c.created_at DESC`,
      [reportId]
    );

    res.json(rows);
  } catch (err) {
    console.error("LIST COMMENTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// ADD COMMENT (Citizen)
// POST /api/reports/:id/comments { body }
// ======================
exports.addComment = async (req, res) => {
  try {
    const reportId = Number(req.params.id);
    if (!Number.isFinite(reportId)) return res.status(400).json({ message: "Invalid report id" });

    const body = String(req.body.body || "").trim();
    if (!body) return res.status(400).json({ message: "Comment body is required" });
    if (body.length > 500) return res.status(400).json({ message: "Comment is too long (max 500)" });

    // ensure report exists
    const [rep] = await db.query("SELECT id FROM reports WHERE id = ?", [reportId]);
    if (!rep.length) return res.status(404).json({ message: "Report not found" });

    const [result] = await db.query(
      `INSERT INTO report_comments (report_id, user_id, body) VALUES (?, ?, ?)`,
      [reportId, req.user.id, body]
    );

    res.status(201).json({ message: "Comment added", id: result.insertId });
  } catch (err) {
    console.error("ADD COMMENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
