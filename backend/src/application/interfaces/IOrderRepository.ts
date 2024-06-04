import type { Order } from '../../core/domain/entities/Order/Order'

export interface IOrderRepository {
	findById(id: string): Promise<Order | null>
	findAll(): Promise<Order[]>
	add(order: Order): Promise<Order>
	update(id: string, order: Order): Promise<Order | null>
	delete(id: string): Promise<Order | null>
}
