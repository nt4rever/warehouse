import express from "express";
import auth from "../../middleware/auth";
import { role } from "../../middleware/role";
import UserController from "../../controllers/UserController";
import { ROLES } from "../../utils/constant";
const router = express.Router();

router.post(
  "/create",
  auth,
  role.check(ROLES.ADMIN),
  UserController.createUser
);

router.get("/", auth, role.check(ROLES.ADMIN), UserController.getAll);
router.get("/:id", auth, role.check(ROLES.ADMIN), UserController.getById);
router.delete("/:id", auth, role.check(ROLES.ADMIN), UserController.deleteById);
router.patch("/:id", auth, role.check(ROLES.ADMIN), UserController.updateById);

export default router;
