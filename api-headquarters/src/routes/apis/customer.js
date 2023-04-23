import express from "express";
import CustomerController from "../../controllers/CustomerController";

const router = express.Router();

router.get("/", CustomerController.all);
router.post("/create", CustomerController.create);
router.patch("/:id", CustomerController.update);

export default router;
