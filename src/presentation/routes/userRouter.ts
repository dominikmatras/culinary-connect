import express from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserService } from "../../application/services/UserService";
import { UserController } from "../controllers/UserController";

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/signup", userController.signup.bind(userController));
router.post("/login", userController.login.bind(userController));
router.route('/').get(userController.getAllUsers.bind(userController));

export { router };
