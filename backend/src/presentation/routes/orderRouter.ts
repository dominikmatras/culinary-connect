import express from 'express'
import { orderController } from '../controllers/OrderController'
import { userController } from '../controllers/UserController'

const router = express.Router()

router.use(userController.protect.bind(userController))

router
	.route('/')
	.get(orderController.getAllOrders.bind(orderController))
	.post(orderController.orderCreate.bind(orderController))

router
	.route('/:id')
	.get(orderController.getOrderById.bind(orderController))
	.patch(orderController.updateOrder.bind(orderController))
	.delete(
		userController.restrictTo('manager').bind(userController),
		orderController.deleteOrder.bind(orderController)
	)

export { router }
