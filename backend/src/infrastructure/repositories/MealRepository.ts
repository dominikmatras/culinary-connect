import type { IMealRepository } from '../../application/interfaces/IMealRepository'
import { Meal } from '../../core/domain/entities/Meal/Meal'
import { MealMapper } from '../mappers/MealMapper'
import { MealModel } from '../schemas/MealSchema'

export class MealRepository implements IMealRepository {
	async add(meal: Meal): Promise<Meal> {
		const mongoMeal = MealMapper.toMongoMeal(meal)
		const createdMeal = await mongoMeal.save() // Save directly using the mongoose model instance
		return MealMapper.toDomainEntity(createdMeal)
	}

	async findAll(): Promise<Meal[]> {
		const mealModels = await MealModel.find()
		return mealModels.map(MealMapper.toDomainEntity) // Convert each MongoDB model to domain entity
	}

	async findById(id: string): Promise<Meal | null> {
		const mealModel = await MealModel.findOne({ id: id })
		return mealModel ? MealMapper.toDomainEntity(mealModel) : null
	}

	async update(id: string, mealDataToUpdate: Partial<Meal>): Promise<Meal | null> {
		const updatedMeal = await MealModel.findOneAndUpdate({ id: id }, mealDataToUpdate, {
			new: true,
			runValidators: true,
		})
		return updatedMeal ? MealMapper.toDomainEntity(updatedMeal) : null
	}

	async delete(id: string): Promise<Meal | null> {
		const meal = await MealModel.findOneAndDelete({ id: id })
		return meal ? MealMapper.toDomainEntity(meal) : null
	}
}
