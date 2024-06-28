import type { Meal } from '../entities/Meal/Meal'

export interface IMealService {
	findById(id: string): Promise<Meal | null>
	findAll(): Promise<Meal[]>
	create(meal: Meal): Promise<Meal>
	update(id: string, meal: Meal): Promise<Meal | null>
	delete(id: string): Promise<Meal | null>
}
