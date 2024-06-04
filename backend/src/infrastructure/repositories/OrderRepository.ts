import { Order } from '../../core/domain/entities/Order/Order'
import type { IOrderRepository } from '../../application/interfaces/IOrderRepository'
import { OrderMapper } from '../mappers/OrderMapper'
import { OrderModel } from '../schemas/OrderSchema'

export class OrderRepository implements IOrderRepository {
	async add(order: Order): Promise<Order> {
		const mongoOrder = OrderMapper.toMongoOrder(order)
		const createdOrder = await mongoOrder.save()
		return OrderMapper.toDomainEntity(createdOrder)
	}

	async findAll(): Promise<Order[]> {
		const orderModels = await OrderModel.find()
		return orderModels.map(OrderMapper.toDomainEntity)
	}

	async findById(id: string): Promise<Order | null> {
		const orderModel = await OrderModel.findOne({ id: id })
		return orderModel ? OrderMapper.toDomainEntity(orderModel) : null
	}

	async update(id: string, orderDataToUpdate: Partial<Order>): Promise<Order | null> {
		const updatedOrder = await OrderModel.findOneAndUpdate({ id: id }, orderDataToUpdate, {
			new: true,
			runValidators: true,
		})
		return updatedOrder ? OrderMapper.toDomainEntity(updatedOrder) : null
	}

	async delete(id: string): Promise<Order | null> {
		const order = await OrderModel.findOneAndDelete({ id: id })
		return order ? OrderMapper.toDomainEntity(order) : null
	}
}
