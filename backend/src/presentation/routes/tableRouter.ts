import express from 'express'
import { tableController } from '../controllers/TableController'
import { userController } from '../controllers/UserController'
import { TableService } from '../../application/services/TableService'

const router = express.Router()

router
	.route('/')
	.get(
		userController.protect.bind(userController),
		tableController.getAllTables.bind(tableController)
	)
	.post(tableController.createTable.bind(userController))

router
	.route('/:id')
	.get(tableController.getTablesById.bind(tableController))
	.patch(tableController.updateTable.bind(tableController))
	.delete(
		userController.protect.bind(userController),
		userController.restrictTo('admin', 'manager').bind(userController),
		tableController.deleteTable.bind(tableController)
	)

export { router }
