export class Meal {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly price: number,
		public readonly description: string,
		public readonly photoPath: string
	) {}
}
