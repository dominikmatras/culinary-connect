export class Table {
	constructor(
		public readonly id: string,
		public readonly tableNumber: number,
		public readonly status: string,
		public readonly orders?: {
			id: string
			tableNumber: number
			meals: { meal: number; quantity: number }[]
			status: string
			createdAt: Date
		}[]
	) {}
}
