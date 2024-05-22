import express from 'express'
import { mealController } from '../controllers/MealController'
import { userController } from '../controllers/UserController'

const router = express.Router()

router
	.route('/')
	.get(userController.protect.bind(userController), mealController.getAllMeals.bind(mealController))
	.post(mealController.createMeal.bind(mealController))

router
	.route('/:id')
	.get(mealController.getMealById.bind(mealController))
	.patch(mealController.updateMeal.bind(mealController))
	.delete(
		userController.protect.bind(userController),
		userController.restrictTo('manager').bind(userController),
		mealController.deleteMeal.bind(mealController)
	)

export { router }
