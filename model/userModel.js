import { pool } from "../../user-service/src/config/db.js";

const User = {
  // Get all users
  get: async () => {
    const [rows] = await pool.query(
      "SELECT userid, name, email, phone, role, street, city, province, zip FROM users"
    );
    return rows;
  },

  // Create a new user
  create: async (user) => {
    const sql = `
      INSERT INTO users (
        name, email, passwordhash, phone, role,
        street, city, province, zip
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [
      user.name,
      user.email,
      user.passwordhash,
      user.phone,
      user.role,
      user.street,
      user.city,
      user.province,
      user.zip,
    ]);
    return { userid: result.insertId, ...user };
  },

  // Update a user by userid
  update: async (userid, user) => {
    const sql = `
      UPDATE users SET
        name = ?, email = ?, phone = ?, role = ?,
        street = ?, city = ?, province = ?, zip = ?
      WHERE userid = ?
    `;
    await pool.query(sql, [
      user.name,
      user.email,
      user.phone,
      user.role,
      user.street,
      user.city,
      user.province,
      user.zip,
      userid,
    ]);
    return { userid, ...user };
  },

  // Delete a user by userid
  delete: async (userid) => {
    const sql = "DELETE FROM users WHERE userid = ?";
    const [result] = await pool.query(sql, [userid]);
    return result;
  },

  getById: async (userid) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE userid = ?", [
      userid,
    ]);
    return rows[0];
  },

  updatePassword: async (userid, passwordHash) => {
    const sql = "UPDATE users SET passwordhash = ? WHERE userid = ?";
    const [result] = await pool.query(sql, [passwordHash, userid]);
    return result;
  },
};

export default User;
