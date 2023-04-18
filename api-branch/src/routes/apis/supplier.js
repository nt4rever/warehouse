import express from "express";
import SupplierController from "../../controllers/SupplierController";

const router = express.Router();

router.get("/", SupplierController.all);
router.post("/create", SupplierController.create);
router.patch("/:id", SupplierController.update);

export default router;
