import express from 'express'
import { tableController } from '../controllers/TableController'
import { userController } from '../controllers/UserController'

const router = express.Router()

router
	.route('/')
	.get(
		userController.protect.bind(userController),
		tableController.getAllTables.bind(tableController)
	)
	.post(tableController.createTable.bind(tableController))

router
	.route('/:id')
	.get(tableController.getTableById.bind(tableController))
	.patch(tableController.updateTable.bind(tableController))
	.delete(
		userController.protect.bind(userController),
		userController.restrictTo('manager').bind(userController),
		tableController.deleteTable.bind(tableController)
	)

export { router }
