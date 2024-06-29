import type { Meal } from '../Meal/Meal'
import type { orderStatus } from './OrderStatus'

export class Order {
	constructor(
		public readonly id: string,
		public readonly tableNumber: number,
		public readonly meals: Meal[],
		public readonly status: orderStatus,
		public readonly createdAt: Date
	) {}
}
