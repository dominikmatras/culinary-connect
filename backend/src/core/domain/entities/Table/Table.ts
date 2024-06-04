export class Table {
	constructor(
		public readonly id: number,
		public readonly tableNumber: number,
		public readonly status: string,
		public readonly orders?: {
			id: string;
			tableId: number;
			meals: { meal: number; quantity: number }[];
			status: string;
			createAt: Date;
		}[]
	) {}
}
