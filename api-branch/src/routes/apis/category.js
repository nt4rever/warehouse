import express from "express";
import CategoryController from "../../controllers/CategoryController";

const router = express.Router();

router.get("/", CategoryController.all);
router.post("/create", CategoryController.create);

export default router;
