import express from "express";
import BranchController from "../../controllers/BranchController";

const router = express.Router();

router.get("/", BranchController.getAll);
router.post("/create", BranchController.create);
router.patch("/:id", BranchController.update);
router.delete("/:id", BranchController.destroy);

export default router;
