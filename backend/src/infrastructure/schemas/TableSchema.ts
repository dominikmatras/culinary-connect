import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema({
	id: {
		type: Number,
		require: true,
		unique: true,
	},
	tableNumber: {
		type: Number,
		minlength: [1, 'A table number must have more or equal then 1 character'],
		require: true,
		unique: true,
	},
	status: {
		type: String,
		enum: ['avaliable', 'occupied'],
		require: true,
	},
})

export const TableModel = mongoose.model('Table', tableSchema)
