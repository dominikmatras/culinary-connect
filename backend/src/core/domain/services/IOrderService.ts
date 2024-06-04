import type { Order } from "../entities/Order/Order";

export interface IOrderService {
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  update(id: string, order: Order): Promise<Order | null>;
  delete(id: string): Promise<Order | null>;
}
