const db = require("../config/db");

// POST /api/contact
// Public: guest or logged-in user can submit
exports.createContactMessage = async (req, res) => {
  try {
    const { email, prefix, phone, topic, description } = req.body;

    if (!email || !topic || !description) {
      return res.status(400).json({ message: "email, topic, and description are required" });
    }

    // If logged in, authMiddleware will set req.user, otherwise it's undefined
    const userId = req.user?.id || null;

    await db.query(
      `INSERT INTO contact_messages (user_id, email, phone_prefix, phone, topic, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        email.trim(),
        prefix || null,
        phone || null,
        topic.trim(),
        description.trim(),
      ]
    );

    res.status(201).json({ message: "Message stored" });
  } catch (err) {
    console.error("CREATE CONTACT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/contacts?limit=10
// Admin only
exports.listContactMessages = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 8), 50);

    const [rows] = await db.query(
      `
      SELECT
        cm.id,
        cm.email,
        cm.phone_prefix,
        cm.phone,
        cm.topic,
        cm.description,
        cm.status,
        cm.created_at,
        u.full_name AS user_full_name
      FROM contact_messages cm
      LEFT JOIN users u ON u.id = cm.user_id
      ORDER BY cm.created_at DESC
      LIMIT ?
      `,
      [limit]
    );

    res.json(rows);
  } catch (err) {
    console.error("LIST CONTACTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
