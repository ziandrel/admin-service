import { business_pool } from "../config/userDB.js";

export const getAllBusinesses = async () => {
  const [rows] = await business_pool.query("SELECT * FROM business");
  return rows; // ✅ Always an array
};

export const updateBusinessStatus = (businessId, newStatus) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE business SET status = ? WHERE id = ?";
    business_pool.query(query, [newStatus, businessId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
