import dotenv from "dotenv";
dotenv.config();

import chalk from "chalk";

import express from "express";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import { checkConnections } from "./config/db.js";
import { checkConnections as user_connection } from "../user-service/src/config/db.js";
import { checkConnections as business_connection } from "./config/userDB.js";
import createAllTable from "./utils/dbUtils.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRoutes);

const PORT = process.env.ADMIN_PORT || 3001;

app.listen(PORT, async () => {
  console.log(chalk.green(`Server running on port ${PORT}`));

  try {
    await checkConnections();
    await user_connection();
    await business_connection();
    await createAllTable();
  } catch (error) {
    console.log(
      chalk.red("Failed to initialize Admin-Service Database"),
      error
    );
  }
});
