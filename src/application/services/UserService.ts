import type { User } from "../../core/domain/entities/User/User";
import type { IUserService } from "../../core/domain/services/IUserService";
import type { IUserRepository } from "../interfaces/IUserRepository";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {};

  async signup(userData: User): Promise<User | null> {
    return this.userRepository.signup(userData);
  }
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
  async update(id: number, user: User): Promise<User> {
    return this.userRepository.update(id, user);
  }
  async delete(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
  
}