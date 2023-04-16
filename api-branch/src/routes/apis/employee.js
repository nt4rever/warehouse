import express from "express";
import EmployeeController from "../../controllers/EmployeeController";

const router = express.Router();

router.get("/", EmployeeController.getAll);

export default router;
