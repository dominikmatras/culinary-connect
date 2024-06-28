import { Meal } from '../../core/domain/entities/Meal/Meal'
import type { IMealService } from '../../core/domain/services/IMealService'
import type { IMealRepository } from '../interfaces/IMealRepository'

export class MealService implements IMealService {
	constructor(private mealRepository: IMealRepository) {}

	async create(mealData: Meal): Promise<Meal> {
		return this.mealRepository.add(mealData)
	}

	async findAll(): Promise<Meal[]> {
		return this.mealRepository.findAll()
	}

	async findById(id: string): Promise<Meal | null> {
		return this.mealRepository.findById(id)
	}

	async update(id: string, mealData: Meal): Promise<Meal | null> {
		return this.mealRepository.update(id, mealData)
	}

	async delete(id: string): Promise<Meal | null> {
		return this.mealRepository.delete(id)
	}
}
