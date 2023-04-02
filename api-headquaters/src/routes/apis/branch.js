import express from "express";
import BrandController from "../../controllers/BrandController";

const router = express.Router();

router.get("/", BrandController.getAll);
router.post("/create", BrandController.create);
router.patch("/:id", BrandController.update);
router.delete("/:id", BrandController.destroy);

export default router;
