import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import branchRoutes from "./branch";
import warehouseRoutes from "./warehouse";
import employeeRoutes from "./employee";
import categoryRoutes from "./category";
import unitRoutes from "./unit";
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
// employee routes
router.use("/employee", auth, role.check(ROLES.EMPLOYEE), employeeRoutes);
// category routes
router.use("/category", auth, role.check(ROLES.EMPLOYEE), categoryRoutes);
// unit routes
router.use("/unit", auth, role.check(ROLES.EMPLOYEE), unitRoutes);

export default router;
