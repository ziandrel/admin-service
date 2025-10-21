import express from "express";
import { getAdmins, loginAdmin } from "../controllers/adminControllers.js";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} from "../controllers/userControllers.js";
import {
  fetchBusiness,
  changeBusinessStatus,
} from "../controllers/businessControllers.js";

const router = express.Router();

router.get("/login", getAdmins);
router.post("/login", loginAdmin);

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/password", changeUserPassword);

router.get("/business", fetchBusiness);
router.put("/business/:id/status", changeBusinessStatus);

export default router;
