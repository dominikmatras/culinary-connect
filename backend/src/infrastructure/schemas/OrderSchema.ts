import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	tableId: {
		type: Number,
		required: true,
	},
	meals: [
		{
			mealId: {
				type: Number,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
	status: {
		type: String,
		enum: ['pending', 'delivered'],
		required: true,
	},
	createAt: {
		type: Date,
		default: new Date(Date.now()),
	},
})

export const OrderModel = mongoose.model('Order', orderSchema)
