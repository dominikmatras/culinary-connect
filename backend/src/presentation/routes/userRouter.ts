import express from "express";
import { userController } from "../controllers/UserController";

const router = express.Router();

router.post("/signup", userController.signup.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post("/logout", userController.logout.bind(userController));
router.route('/').get(userController.getAllUsers.bind(userController));

export { router };
