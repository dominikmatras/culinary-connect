import type { User } from "../entities/User/User";
export interface IUserService {
  signup(userData: User): Promise<User>;
  login(userData: {email: string, password: string}): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
