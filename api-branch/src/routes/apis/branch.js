import express from "express";
import BrandController from "../../controllers/BrandController";

const router = express.Router();

router.get("/", BrandController.getAll);

export default router;
