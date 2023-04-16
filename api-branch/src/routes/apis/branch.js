import express from "express";
import BranchController from "../../controllers/BranchController";

const router = express.Router();

router.get("/", BranchController.getAll);
router.patch("/:id", BranchController.update);

export default router;
