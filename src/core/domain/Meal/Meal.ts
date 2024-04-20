export class Meal {
	constructor(
		public readonly id: number,
		public readonly mealName: string,
		public readonly price: number,
		public readonly description: string
	) {}
}
