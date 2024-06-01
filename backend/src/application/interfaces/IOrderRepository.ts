import type { Order } from '../../core/domain/entities/Order/Order'

export interface IOrderRepository {
	findById(id: number): Promise<Order | null>
	findAll(): Promise<Order[]>
	add(order: Order): Promise<Order>
	update(id: number, order: Order): Promise<Order | null>
	delete(id: number): Promise<Order | null>
}
