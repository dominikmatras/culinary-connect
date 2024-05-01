import type { Meal } from "../entities/Meal/Meal";

export interface IMealService {
  findById(id: number): Promise<Meal | null>;
  findAll(): Promise<Meal[]>;
  create(meal: Meal): Promise<Meal>;
  update(id: number, meal: Meal): Promise<Meal | null>;
  delete(id: number): Promise<Meal | null>;
}
