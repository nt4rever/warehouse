import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import branchRoutes from "./branch";
import auth from "../../middleware/auth";
import { role } from "../../middleware/role";
import { ROLES } from "../../utils/constant";

const router = express.Router();
// auth routes
router.use("/auth", authRoutes);
// user routes
router.use("/user", auth, role.check(ROLES.ADMIN), userRoutes);
// branch routes
router.use("/branch", auth, role.check(ROLES.ADMIN), branchRoutes);

export default router;
