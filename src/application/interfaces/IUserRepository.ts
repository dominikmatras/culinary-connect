import type { User } from "../../core/domain/entities/User/User";

export interface IUserRepository {
  signup(userData: User): Promise<User>;
  login(userData: {email: string, password: string}): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<void>;
}