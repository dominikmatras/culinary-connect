import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	tableId: {
		type: Number,
		ref: "Table",
		required: [true, 'Order must have a table'],
	},
	meals: [
		{
			meal: {
				type: Number,
				ref: 'Meal',
				required: [true, 'Order must have a meal'],
			},
			quantity: {
				type: Number,
				required: [true, 'Meal in order must have a quantity'],
			},
		},
	],
	status: {
		type: String,
		enum: ['pending', 'completed', 'cancelled'],
		required: true,
	},
	createAt: {
		type: Date,
		default: new Date(Date.now()),
	},
})

export const OrderModel = mongoose.model('Order', orderSchema)
