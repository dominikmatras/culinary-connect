import { Meal } from "../../domain/Meal/Meal";

export interface IMealRepository {
  findById(id: number): Promise<Meal | null>;
  findAll(): Promise<Meal[]>;
  create(meal: Meal): Promise<Meal>;
  update(id: number, meal: Meal): Promise<Meal>;
  delete(id: number): Promise<void>;
}
