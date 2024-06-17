import mongoose from 'mongoose'

const mealSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		minlength: [5, 'A meal name must have more or equal then 5 characters'],
		required: true,
	},
	price: {
		type: Number,
		min: [1, 'Price must be above 1'],
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	photoPath: {
		type: String,
		required: true,
	},
})

export const MealModel = mongoose.model('Meal', mealSchema)
