import express from "express";
import OrderController from "../../controllers/OrderController";

const router = express.Router();

router.get("/", OrderController.all);
router.get("/:id", OrderController.detail);
router.post("/", OrderController.create);
router.patch("/", OrderController.updateOrder);
router.delete("/:id", OrderController.destroy);
router.post("/delete-detail", OrderController.destroyDetail);

export default router;
