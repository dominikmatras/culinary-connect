import express from "express";
import { MealRepository } from "../../infrastructure/repositories/MealRepository";
import { MealService } from "../../application/services/MealService";
import { MealController } from "../controllers/MealController";

const router = express.Router();

const mealRepository = new MealRepository();
const mealService = new MealService(mealRepository);
const mealController = new MealController(mealService);

router
  .route("/")
  .get(mealController.getAllMeals.bind(mealController))
  .post(mealController.createMeal.bind(mealController));

router
  .route("/:id")
  .get(mealController.getMealById.bind(mealController))
  .patch(mealController.updateMeal.bind(mealController))
  .delete(mealController.deleteMeal.bind(mealController));

export { router };
