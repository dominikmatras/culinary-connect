import { Order } from '../../core/domain/entities/Order/Order'
import type { IOrderRepository } from '../interfaces/IOrderRepository'
import type { IOrderService } from '../../core/domain/services/IOrderService'

export class OrderService implements IOrderService {
	constructor(private orderRepository: IOrderRepository) {}

	async create(order: Order): Promise<Order> {
		return this.orderRepository.add(order)
	}

	async findAll(): Promise<Order[]> {
		return this.orderRepository.findAll()
	}

	async findById(id: string): Promise<Order | null> {
		return this.orderRepository.findById(id)
	}

	async update(id: string, order: Order): Promise<Order | null> {
		return this.orderRepository.update(id, order)
	}

	async delete(id: string): Promise<Order | null> {
		return this.orderRepository.delete(id)
	}
}
