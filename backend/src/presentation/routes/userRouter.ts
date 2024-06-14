import express from "express";
import { userController } from "../controllers/UserController";

const router = express.Router();

router.post("/signup", userController.signup.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post("/logout", userController.logout.bind(userController));
router.post("/forgotPassword", userController.forgotPassword.bind(userController));
router.patch("/resetPassword/:token", userController.resetPassword.bind(userController));
router.patch(
  "/updatePassword",
  userController.protect.bind(userController),
  userController.updatePassword.bind(userController)
);
router.patch(
  "/updateMe",
  userController.protect.bind(userController),
  userController.updateMe.bind(userController)
);
router.get(
  "/getUser",
  userController.protect.bind(userController),
  userController.getUser.bind(userController)
);
router.route("/").get(userController.getAllUsers.bind(userController));

export { router };
