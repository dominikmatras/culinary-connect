import { Meal } from '../../core/domain/entities/Meal/Meal'
import { MealModel } from '../schemas/MealSchema'

export class MealMapper {
	// Convert from Mongoose model to domain entity (Meal)
	static toDomainEntity(mealModel: any): Meal {
		return new Meal(
			mealModel.id,
			mealModel.name,
			mealModel.price,
			mealModel.description,
			mealModel.photoPath
		)
	}

	// Convert from domain entity (Meal) to Mongoose model data
	static toMongoMeal(meal: Meal) {
		return new MealModel({
			id: meal.id,
			name: meal.name,
			price: meal.price,
			description: meal.description,
			photoPath: meal.photoPath,
		})
	}
}
