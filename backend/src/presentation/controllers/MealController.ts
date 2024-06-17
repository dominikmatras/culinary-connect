import { MealService } from '../../application/services/MealService'
import { MealRepository } from '../../infrastructure/repositories/MealRepository'
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory'

export class MealController {
	constructor(private mealService: MealService) {
		this.createMeal = createOne('Meal', this.mealService)
		this.getAllMeals = getAll(this.mealService)
		this.getMealById = getOne(this.mealService)
		this.updateMeal = updateOne(this.mealService)
		this.deleteMeal = deleteOne(this.mealService)
	}

	createMeal
	getAllMeals
	getMealById
	updateMeal
	deleteMeal
}

const mealRepository = new MealRepository()
const mealService = new MealService(mealRepository)
export const mealController = new MealController(mealService)
