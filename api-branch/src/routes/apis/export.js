import express from "express";
import ExportController from "../../controllers/ExportController";

const router = express.Router();

router.get("/", ExportController.all);
router.post("/", ExportController.create);

export default router;
