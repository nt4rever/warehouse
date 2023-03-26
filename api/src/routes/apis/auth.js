import express from "express";
import AuthController from "../../controller/AuthController";
const router = express.Router();

router.post("/login", AuthController.login);

export default router;
