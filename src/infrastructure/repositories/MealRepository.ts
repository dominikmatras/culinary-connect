import type { IMealRepository } from "../../application/interfaces/IMealRepository";
import { Meal } from "../../core/domain/entities/Meal/Meal";
import { MealMapper } from "../mappers/MealMapper";
import { MealModel } from "../schemas/MealSchema";

export class MealRepository implements IMealRepository {
  async add(meal: Meal): Promise<Meal> {
    const mongoMeal = MealMapper.toMongoMeal(meal);
    const createdMeal = await mongoMeal.save(); // Save directly using the mongoose model instance
    return MealMapper.toDomain(createdMeal);
  }

  async findAll(): Promise<Meal[]> {
    const mealModels = await MealModel.find();
    return mealModels.map(MealMapper.toDomain); // Convert each MongoDB model to domain entity
  }

  async findById(id: number): Promise<Meal | null> {
    const mealModel = await MealModel.findOne({ id: id });
    return mealModel ? MealMapper.toDomain(mealModel) : null;
  }

  async update(id: number, mealData: Partial<Meal>): Promise<Meal | null> {
    // Convert domain entity to mongoose model data for update operation
    const updateData = MealMapper.toMongoMeal(
      new Meal(id, mealData.name!, mealData.price!, mealData.description!)
    ).toObject();

    // @ts-ignore
    delete updateData._id; // Remove _id if present to avoid conflicts in findByIdAndUpdate

    const updatedMealModel = await MealModel.findOneAndUpdate(
      { id: id },
      updateData,
      { new: true }
    );
    return updatedMealModel ? MealMapper.toDomain(updatedMealModel) : null;
  }

  async delete(id: number): Promise<void> {
    await MealModel.findOneAndDelete({ id: id });
  }
}
