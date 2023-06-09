import express from "express";
import UnitController from "../../controllers/UnitController";

const router = express.Router();

router.get("/", UnitController.all);
router.post("/create", UnitController.create);
router.patch("/:id", UnitController.update);

export default router;
