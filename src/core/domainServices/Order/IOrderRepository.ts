import { Order } from "../../domain/Order/Order";

export interface IOrderRepository {
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  update(id: number, order: Order): Promise<Order>;
  delete(id: number): Promise<void>;
}
