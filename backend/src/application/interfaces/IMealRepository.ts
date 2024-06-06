import type { Meal } from '../../core/domain/entities/Meal/Meal'

export interface IMealRepository {
	add(meal: Meal): Promise<Meal>
	findAll(): Promise<Meal[]>
	findById(id: string): Promise<Meal | null>
	update(id: string, meal: Partial<Meal>): Promise<Meal | null>
	delete(id: string): Promise<Meal | null>
}
