import express from "express";
import WarehouseController from "../../controllers/WarehouseController";

const router = express.Router();

router.get("/", WarehouseController.getAll);
router.post("/create", WarehouseController.create);
router.patch("/:id", WarehouseController.update);
router.delete("/:id", WarehouseController.destroy);
router.get("/branch/:id", WarehouseController.getByBranch);

export default router;
