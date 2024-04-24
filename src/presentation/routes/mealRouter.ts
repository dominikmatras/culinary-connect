import express from "express";
import { MealRepository } from "../../infrastructure/repositories/MealRepository";
import { MealService } from "../../application/services/MealService";
import { MealController } from "../controllers/mealController";

const router = express.Router();

const mealRepository = new MealRepository();
const mealService = new MealService(mealRepository);
const mealController = new MealController(mealService);

router.route("/").get(mealController.getAllMeals.bind(mealController));

export { router };
