// backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

exports.signup = async (req, res) => {
  try {
    const { full_name, personal_id, email, password, role } = req.body;

    if (!full_name || !personal_id || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userRole = role === "admin" ? "admin" : "citizen";

    // check if personal_id or email exists
    const [exists] = await db.query(
      "SELECT id FROM users WHERE email = ? OR personal_id = ? LIMIT 1",
      [email, personal_id]
    );

    if (exists.length > 0) {
      return res
        .status(409)
        .json({ message: "Email or Personal ID already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (role, personal_id, full_name, email, password, is_active)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [userRole, personal_id, full_name, email, hashed]
    );

    const user = {
      id: result.insertId,
      role: userRole,
      full_name,
      personal_id,
    };

    const token = signToken(user);

    // ✅ return BOTH styles: flat + user object (so frontend works)
    return res.json({
      token,
      role: user.role,
      full_name: user.full_name,
      personal_id: user.personal_id,
      user,
    });
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ message: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { personal_id, password } = req.body;

    if (!personal_id || !password) {
      return res.status(400).json({ message: "Personal ID and password are required" });
    }

    const [rows] = await db.query(
      `SELECT id, full_name, personal_id, password, role, is_active
       FROM users
       WHERE personal_id = ?
       LIMIT 1`,
      [personal_id]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    if (Number(user.is_active) === 0) {
      return res.status(403).json({ message: "Account is disabled" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);

    // ✅ return BOTH styles: flat + user object (so frontend works)
    return res.json({
      token,
      role: user.role,
      full_name: user.full_name,
      personal_id: user.personal_id,
      user: {
        id: user.id,
        role: user.role,
        full_name: user.full_name,
        personal_id: user.personal_id,
      },
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};
