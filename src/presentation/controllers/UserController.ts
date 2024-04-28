import type { Request, Response, NextFunction } from "express";
import { UserService } from "../../application/services/UserService";
import { User } from "../../core/domain/entities/User/User";
import { AppError } from "../../../utils/AppError";

export class UserController {
  constructor(private userService: UserService) {}

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      
      const { name, email, password, passwordConfirm, role } = req.body;
      const user = new User(name, email, role, password, passwordConfirm);
      const newUser = await this.userService.signup(user);

      res.status(201).json({
        status: "success",
        data: {
          user: newUser
        }
      })
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const Users = await this.userService.findAll();
      res.status(200).json({
        status: "success",
        results: Users.length,
        data: {
          Users,
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
