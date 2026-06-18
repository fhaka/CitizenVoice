const db = require("../config/db");
const bcrypt = require("bcrypt");

// GET /api/users/me
exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT id, role, personal_id, full_name, email, phone, city, profile_photo, is_active, created_at
       FROM users
       WHERE id = ?`,
      [userId]
    );

    if (!rows.length) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("GET ME ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/me
exports.updateMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, phone, city } = req.body;

    if (!full_name) {
      return res.status(400).json({ message: "full_name is required" });
    }

    await db.query(
      `UPDATE users
       SET full_name = ?, phone = ?, city = ?
       WHERE id = ?`,
      [full_name, phone || null, city || null, userId]
    );

    res.json({ message: "Profile updated" });
  } catch (err) {
    console.error("UPDATE ME ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/me/photo
exports.updateMyPhoto = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No photo uploaded" });
    }

    const photoUrl = `/uploads/${req.file.filename}`;

    await db.query("UPDATE users SET profile_photo = ? WHERE id = ?", [
      photoUrl,
      userId,
    ]);

    res.json({ message: "Photo updated", profile_photo: photoUrl });
  } catch (err) {
    console.error("UPDATE PHOTO ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUT /api/users/me/credentials
// Update account credentials EXCEPT personal_id.
// Supports: email, full_name, phone, city, password (requires current_password)
exports.updateMyCredentials = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, phone, city, email, current_password, new_password } = req.body;

    // Load user including password hash
    const [rows] = await db.query(
      `SELECT id, email, password, full_name, phone, city
       FROM users
       WHERE id = ?`,
      [userId]
    );

    if (!rows.length) return res.status(404).json({ message: "User not found" });

    const user = rows[0];

    // If changing password, verify current password
    let newPasswordHash = null;
    if (new_password && new_password.trim().length > 0) {
      if (!current_password) {
        return res
          .status(400)
          .json({ message: "current_password is required to change password" });
      }

      const ok = await bcrypt.compare(current_password, user.password);
      if (!ok) return res.status(400).json({ message: "Current password is incorrect" });

      if (new_password.length < 6) {
        return res
          .status(400)
          .json({ message: "New password must be at least 6 characters" });
      }

      newPasswordHash = await bcrypt.hash(new_password, 10);
    }

    // Email uniqueness check (if email provided & changed)
    if (email && email !== user.email) {
      const [exists] = await db.query(
        `SELECT id FROM users WHERE email = ? AND id <> ?`,
        [email, userId]
      );
      if (exists.length) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Build update values safely (keep old values if not sent)
    const nextFullName = full_name !== undefined ? full_name : user.full_name;
    const nextPhone = phone !== undefined ? (phone || null) : user.phone;
    const nextCity = city !== undefined ? (city || null) : user.city;
    const nextEmail = email !== undefined ? email : user.email;

    if (!nextFullName || String(nextFullName).trim().length === 0) {
      return res.status(400).json({ message: "full_name is required" });
    }

    if (newPasswordHash) {
      await db.query(
        `UPDATE users
         SET full_name = ?, phone = ?, city = ?, email = ?, password = ?
         WHERE id = ?`,
        [nextFullName, nextPhone, nextCity, nextEmail, newPasswordHash, userId]
      );
    } else {
      await db.query(
        `UPDATE users
         SET full_name = ?, phone = ?, city = ?, email = ?
         WHERE id = ?`,
        [nextFullName, nextPhone, nextCity, nextEmail, userId]
      );
    }

    res.json({ message: "Credentials updated" });
  } catch (err) {
    console.error("UPDATE CREDENTIALS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE /api/users/me
// Requires: { password } to confirm deletion
exports.deleteMe = async (req, res) => {
  let conn;
  try {
    const userId = req.user.id;
    const { password } = req.body || {};

    if (!password) {
      return res.status(400).json({ message: "Password is required to delete account" });
    }

    // mysql2 promise pool usually supports getConnection()
    conn = await db.getConnection();

    await conn.beginTransaction();

    const [rows] = await conn.query("SELECT id, password FROM users WHERE id = ?", [userId]);
    if (!rows.length) {
      await conn.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    const ok = await bcrypt.compare(password, rows[0].password);
    if (!ok) {
      await conn.rollback();
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Helper: delete table rows, but don't crash if a table doesn't exist
    async function safeDelete(sql, params) {
      try {
        await conn.query(sql, params);
      } catch (e) {
        // Ignore missing tables only; rethrow everything else
        if (e && (e.code === "ER_NO_SUCH_TABLE" || e.errno === 1146)) return;
        throw e;
      }
    }

    // --- If likes/comments exist ---
    await safeDelete("DELETE FROM report_likes WHERE user_id = ?", [userId]);
    await safeDelete("DELETE FROM report_comments WHERE user_id = ?", [userId]);

    // History records created by this user (if your table uses changed_by)
    await safeDelete("DELETE FROM report_status_history WHERE changed_by = ?", [userId]);

    // Delete user's reports (and their child rows if you don't have cascade)
    const [myReports] = await conn.query("SELECT id FROM reports WHERE user_id = ?", [userId]);
    const reportIds = myReports.map((r) => r.id);

    if (reportIds.length) {
      const placeholders = reportIds.map(() => "?").join(",");
      await safeDelete(`DELETE FROM report_likes WHERE report_id IN (${placeholders})`, reportIds);
      await safeDelete(`DELETE FROM report_comments WHERE report_id IN (${placeholders})`, reportIds);
      await safeDelete(`DELETE FROM report_status_history WHERE report_id IN (${placeholders})`, reportIds);
    }

    await safeDelete("DELETE FROM reports WHERE user_id = ?", [userId]);

    // Finally delete the user
    await conn.query("DELETE FROM users WHERE id = ?", [userId]);

    await conn.commit();
    return res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("DELETE ME ERROR:", err);
    try {
      if (conn) await conn.rollback();
    } catch {}
    return res.status(500).json({ message: "Server error" });
  } finally {
    try {
      if (conn) conn.release();
    } catch {}
  }
};
