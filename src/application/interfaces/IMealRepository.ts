import type { Meal } from "../../core/domain/entities/Meal/Meal";

export interface IMealRepository {
  add(meal: Meal): Promise<Meal>;
  findAll(): Promise<Meal[]>;
  findById(id: number): Promise<Meal | null>;
  update(id: number, meal: Partial<Meal>): Promise<Meal | null>;
  delete(id: number): Promise<void>;
}
