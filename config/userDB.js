import chalk from "chalk";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.BUSINESS_DB,
  connectionLimit: 10,
  queueLimit: 1,
  waitForConnections: true,
};

// Create the pool after ensuring the database exists
const createPool = async () => {
  return mysql.createPool(dbConfig);
};

// Create pool instance
const business_pool = await createPool();

// Check DB connection
const checkConnections = async () => {
  try {
    const connection = await business_pool.getConnection();
    console.log("Connected to Business-Service Database");
    connection.release();
  } catch (error) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "Error connecting to Business-Service Database"
    );
    throw error;
  }
};

// Export
export { business_pool, checkConnections };
