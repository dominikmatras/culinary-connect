import { OrderService } from '../../application/services/OrderService'
import { OrderRepository } from '../../infrastructure/repositories/OrderRepository'
import { createOne, getAll, getOne, updateOne, deleteOne } from './handlerFactory'

export class OrderController {
	constructor(private orderService: OrderService) {
		this.orderCreate = createOne('Order', this.orderService)
		this.getAllOrders = getAll(this.orderService)
		this.getOrderById = getOne(this.orderService)
		this.updateOrder = updateOne(this.orderService)
		this.deleteOrder = deleteOne(this.orderService)
	}

	orderCreate
	getAllOrders
	getOrderById
	updateOrder
	deleteOrder
}

const orderRepository = new OrderRepository()
const orderService = new OrderService(orderRepository)
export const orderController = new OrderController(orderService)
