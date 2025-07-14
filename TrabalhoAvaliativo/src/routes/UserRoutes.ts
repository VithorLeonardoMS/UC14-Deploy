import { Router } from "express";
import { UserController } from "../controllers/UserController"

const router = Router();
const userController:UserController = new UserController()

router.post("/users", userController.createUser)
router.post("/users/login", userController.login);
router.get("/users/email/:email", userController.getByEmail);
router.get("/users/:id", userController.show);

export default router;