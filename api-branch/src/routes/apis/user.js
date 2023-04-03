import express from "express";
import UserController from "../../controllers/UserController";
const router = express.Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.patch("/:id", UserController.updateById);

export default router;
