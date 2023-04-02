import express from "express";
import UserController from "../../controllers/UserController";
const router = express.Router();

router.post("/create", UserController.createUser);
router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.delete("/:id", UserController.deleteById);
router.patch("/:id", UserController.updateById);

export default router;
