import type { Meal } from '../Meal/Meal'
import type { orderStatus } from './OrderStatus'

export class Order {
	constructor(
		public readonly id: number,
		public readonly tableId: number,
		public readonly meals: Meal[],
		public readonly quantity: number,
		public readonly status: orderStatus,
		public readonly createdAt: Date
	) {}
}
