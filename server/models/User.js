const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (email, password, fullName, role = 'customer') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (email, password, full_name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, role',
      [email, hashedPassword, fullName, role]
    );
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await db.query('SELECT id, email, full_name, role FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
};

module.exports = User;
