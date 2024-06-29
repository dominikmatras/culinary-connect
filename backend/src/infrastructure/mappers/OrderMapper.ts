import { Order } from '../../core/domain/entities/Order/Order'
import { OrderModel } from '../schemas/OrderSchema'

export class OrderMapper {
	static toDomainEntity(orderModel: any): Order {
		return new Order(
			orderModel.id,
			orderModel.tableNumber,
			orderModel.meals,
			orderModel.status,
			orderModel.createdAt
		)
	}

	static toMongoOrder(order: Order) {
		return new OrderModel({
			id: order.id,
			tableNumber: order.tableNumber,
			meals: order.meals,
			status: order.status,
			createdAt: order.createdAt,
		})
	}
}
