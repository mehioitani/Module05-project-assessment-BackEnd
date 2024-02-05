import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdmin,
} from "../controllers/adminController.js";
import Protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/me", Protect, getAdmin);

export default router;
