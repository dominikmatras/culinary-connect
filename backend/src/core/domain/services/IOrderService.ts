import type { Order } from "../entities/Order/Order";

export interface IOrderService {
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  update(id: number, order: Order): Promise<Order | null>;
  delete(id: number): Promise<Order | null>;
}
