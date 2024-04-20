export class Order {
	constructor(
		public readonly id: number,
		public readonly userId: number,
		public readonly meals: number[],
		public readonly tableId: number,
		public readonly quantity: number,
		public readonly status: string,
		public readonly createdAt: Date
	) {}
}
