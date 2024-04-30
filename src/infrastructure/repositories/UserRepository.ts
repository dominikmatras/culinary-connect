import type { IUserRepository } from "../../application/interfaces/IUserRepository";
import type { User } from "../../core/domain/entities/User/User";
import { UserModel } from "../schemas/UserSchema";
import { UserMapper } from "../mappers/UserMapper";

export class UserRepository implements IUserRepository {
  async signup(userData: User): Promise<User> {
    const newUser = await UserModel.create(userData);
    
    return UserMapper.toDomainEntity(newUser);
  }
  
  async login(userData: {email: string, password: string}): Promise<User | null> {
    const { email, password } = userData;
    const user = await UserModel.findOne({ email }).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))) {
      return null
    }
    
    return UserMapper.toDomainEntity(user);
  }

  async findById(id: number): Promise<User | null> {
    const user = await UserModel.findOne({id});
    return user ? UserMapper.toDomainEntity(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();

    return users.map(UserMapper.toDomainEntity);
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
