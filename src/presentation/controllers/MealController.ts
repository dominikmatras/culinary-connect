import type { Request, Response } from "express";
import { MealService } from "../../application/services/MealService";
import { Meal } from "../../core/domain/entities/Meal/Meal";

export class MealController {
  constructor(private mealService: MealService) {}

  async createMeal(req: Request, res: Response) {
    const { id, name, price, description } = req.body;
    const meal = new Meal(id, name, price, description);
    const createdMeal = await this.mealService.create(meal);
    res.status(201).json({
      status: 'success',
      data: {
        meal: createdMeal,
      },
    });
  }

  async getAllMeals(req: Request, res: Response) {
    const meals = await this.mealService.findAll();
    res.status(200).json({
      status: "success",
      results: meals.length,
      data: {
        meals,
      },
    });
  }

  async getMealById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const meal = await this.mealService.findById(id);
    if (!meal) {
      res.status(404).send("Meal not found");
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        meal
      }
    });
  }

  async updateMeal(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const updateData = req.body;
    const updatedMeal = await this.mealService.update(id, updateData);
    if (!updatedMeal) {
      res.status(404).send("Meal not found");
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        updatedMeal
      }
    });
  }

  async deleteMeal(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await this.mealService.delete(id);
    res.status(204).json({
      status: "success",
      data: null
    });
  }
}
