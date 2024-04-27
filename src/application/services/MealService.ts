import { Meal } from "../../core/domain/entities/Meal/Meal";
import type { IMealService } from "../../core/domain/services/Meal/IMealService";
import type { IMealRepository } from "../interfaces/IMealRepository";

export class MealService implements IMealService {
  constructor(private mealRepository: IMealRepository) {}

  async create(mealData: Meal): Promise<Meal> {
    const { id, name, price, description } = mealData;
    return this.mealRepository.add(new Meal(id, name, price, description));
  }

  async findAll(): Promise<Meal[]> {
    return this.mealRepository.findAll();
  }

  async findById(id: number): Promise<Meal | null> {
    return this.mealRepository.findById(id);
  }

  async update(id: number, mealData: Meal): Promise<Meal | null> {
    return this.mealRepository.update(id, mealData);
  }

  async delete(id: number): Promise<void> {
    return this.mealRepository.delete(id);
  }
}
