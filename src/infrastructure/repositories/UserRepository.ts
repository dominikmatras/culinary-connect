import type { IUserRepository } from "../../application/interfaces/IUserRepository";
import type { User } from "../../core/domain/entities/User/User";
import { UserModel } from "../schemas/UserSchema";

export class UserRepository implements IUserRepository {
  async signup(userData: User): Promise<User | null> {
    const newUser = await UserModel.create(userData);
    return newUser ? newUser : null;
  }

  async findById(id: number): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async create(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async update(id: number, user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}