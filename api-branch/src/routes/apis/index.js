import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import branchRoutes from "./branch";
import warehouseRoutes from "./warehouse";
import auth from "../../middleware/auth";
import { role } from "../../middleware/role";
import { ROLES } from "../../utils/constant";

const router = express.Router();
// auth routes
router.use("/auth", authRoutes);
// user routes
router.use("/user", auth, role.check(ROLES.EMPLOYEE), userRoutes);
// branch routes
router.use("/branch", auth, role.check(ROLES.EMPLOYEE), branchRoutes);
// warehouse routes
router.use("/warehouse", auth, role.check(ROLES.EMPLOYEE), warehouseRoutes);

export default router;
