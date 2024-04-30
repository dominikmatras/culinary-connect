import type { Request, Response, NextFunction } from "express";
import { MealService } from "../../application/services/MealService";
import { Meal } from "../../core/domain/entities/Meal/Meal";
import { AppError } from "../../../utils/AppError";
import { MealRepository } from "../../infrastructure/repositories/MealRepository";

class MealController {
  constructor(private mealService: MealService) {}

  async createMeal(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, price, description } = req.body;
      const meal = new Meal(id, name, price, description);
      const createdMeal = await this.mealService.create(meal);
      res.status(201).json({
        status: "success",
        data: {
          meal: createdMeal,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllMeals(req: Request, res: Response, next: NextFunction) {
    try {
      const meals = await this.mealService.findAll();
      res.status(200).json({
        status: "success",
        results: meals.length,
        data: {
          meals,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMealById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const meal = await this.mealService.findById(id);

      if (!meal) {
        return next(new AppError("Meal not found", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          meal,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMeal(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const updatedMeal = await this.mealService.update(id, updateData);

      if (!updatedMeal) {
        return next(new AppError("Meal not found", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          updatedMeal,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteMeal(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const meal = await this.mealService.delete(id);

      if (!meal) {
        return next(new AppError("Meal not found", 404));
      }
      
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

const mealRepository = new MealRepository();
const mealService = new MealService(mealRepository);
export const mealController = new MealController(mealService);