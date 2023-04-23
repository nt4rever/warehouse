import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import branchRoutes from "./branch";
import warehouseRoutes from "./warehouse";
import employeeRoutes from "./employee";
import categoryRoutes from "./category";
import unitRoutes from "./unit";
import materialRoutes from "./material";
import customerRoutes from "./customer";
import supplierRoutes from "./supplier";
import inventoryRoutes from "./inventory";
import orderRoutes from "./order";
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
// material
router.use("/material", auth, role.check(ROLES.EMPLOYEE), materialRoutes);
// customer
router.use("/customer", auth, role.check(ROLES.EMPLOYEE), customerRoutes);
// supplier
router.use("/supplier", auth, role.check(ROLES.EMPLOYEE), supplierRoutes);
// inventory
router.use("/inventory", auth, role.check(ROLES.EMPLOYEE), inventoryRoutes);
// order
router.use("/order", auth, role.check(ROLES.EMPLOYEE), orderRoutes);

export default router;
