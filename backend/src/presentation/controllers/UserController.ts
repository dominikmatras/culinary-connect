import type { Request, Response, NextFunction } from "express";
import { UserService } from "../../application/services/UserService";
import { User } from "../../core/domain/entities/User/User";
import { AppError } from "../../../utils/AppError";
import { signToken } from "../../../utils/signToken";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { verifyToken } from "../../../utils/verifyToken";

class UserController {
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

      if (!email || !password) {
        return next(new AppError("You must provide valid email and password!", 400));
      }

      const user = await this.userService.login({ email, password });

      if (!user) {
        return next(new AppError("Incorrect user data!", 401));
      }

      const token = signToken(user.id);

      res.status(200).json({
        status: "success",
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async protect(req: Request & { user?: User }, res: Response, next: NextFunction) {
    try {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return next(
          new AppError("You are not loged in! Please login to get access.", 401)
        );
      }

      const verifiedData = await verifyToken(token);

      const user = await this.userService.findById(verifiedData.id);

      if (!user)
        return next(
          new AppError("The user belonging to this token does no longer exist.", 401)
        );

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }

  restrictTo(...userRoles: string[]) {
    return async (req: Request & { user?: User }, res: Response, next: NextFunction) => {
      try {
        const user = req.user;
        
        if(user && !userRoles.includes(user?.role)) {
          return next(new AppError('You do not have permission to perform this action', 403))
        }

        next();
      } catch (error) {
        next(error);
      }
    };
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

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);
