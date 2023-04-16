import express from "express";
import EmployeeController from "../../controllers/EmployeeController";

const router = express.Router();

router.get("/", EmployeeController.getAll);
router.post("/create", EmployeeController.createEmployee);

export default router;
