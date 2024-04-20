import { User } from "../../domain/User/User";

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
