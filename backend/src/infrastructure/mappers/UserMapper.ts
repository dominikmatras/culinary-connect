import { User } from "../../core/domain/entities/User/User";
import { UserModel } from "../schemas/UserSchema";

export class UserMapper {

  static toDomainEntity(userModel: any): User {
    return new User(
      userModel.id,
      userModel.name,
      userModel.email,
      userModel.role,
      userModel.password,
      userModel.passwordConfirm,
    );
  }

  static toMongoUser(user: User) {
    return new UserModel({
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
    });
  }
}