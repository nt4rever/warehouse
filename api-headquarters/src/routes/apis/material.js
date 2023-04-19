import express from "express";
import MaterialController from "../../controllers/MaterialController";

const router = express.Router();

router.get("/", MaterialController.all);
router.patch("/:id", MaterialController.update);

export default router;
