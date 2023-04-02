import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";

const router = express.Router();
// auth routes
router.use("/auth", authRoutes);

// user routes
router.use("/user", userRoutes);

export default router;
