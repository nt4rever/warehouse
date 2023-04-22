import express from "express";
import InventoryController from "../../controllers/InventoryController";

const router = express.Router();

router.get("/", InventoryController.all);
router.post("/", InventoryController.create);
router.patch("/:id", InventoryController.update);
router.delete("/:id", InventoryController.destroy);

export default router;
