import type { Request, Response, NextFunction } from "express";
import { UserService } from "../../application/services/UserService";
import { User } from "../../core/domain/entities/User/User";
import { AppError } from "../../../utils/AppError";
import { signToken } from "../../../utils/signToken";

export class UserController {
  constructor(private userService: UserService) {}

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, email, password, passwordConfirm } = req.body;
      const user = new User(id, name, email, "waiter", password, passwordConfirm);
      const newUser = await this.userService.signup(user);

      const token = signToken(newUser.id);

      res.status(201).json({
        status: "success",
        token,
        data: {
          user: newUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if(!email || !password) {
        return next(new AppError("You must provide valid email and password!", 400))
      };

      const user = await this.userService.login({email, password});
      
      if(!user) {
        return next(new AppError("Incorrect user data!", 401))
      }

      const token = signToken(user.id);

      res.status(200).json({
        status: "success",
        token
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findAll();
      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const User = await this.userService.findById(id);

      if (!User) {
        return next(new AppError("User not found", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          User,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
