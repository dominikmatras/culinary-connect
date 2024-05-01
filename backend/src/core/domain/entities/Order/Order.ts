import type { Meal } from "../Meal/Meal";

export class Order {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly meals: Meal[],
    public readonly tableId: number,
    public readonly quantity: number,
    public readonly status: string,
    public readonly createdAt: Date
  ) {}
}
