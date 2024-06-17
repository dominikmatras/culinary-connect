import type { IUserRepository } from "../../application/interfaces/IUserRepository";
import type { User } from "../../core/domain/entities/User/User";
import { UserModel } from "../schemas/UserSchema";
import { UserMapper } from "../mappers/UserMapper";
import sendEmail from "../../../utils/email";

export class UserRepository implements IUserRepository {
  async signup(userData: User): Promise<User> {
    const newUser = await UserModel.create(userData);

    return UserMapper.toDomainEntity(newUser);
  }

  async login(userData: { email: string; password: string }): Promise<User | null> {
    const { email, password } = userData;
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return null;
    }

    return UserMapper.toDomainEntity(user);
  }

  async forgotPassword(email: string, resetURL: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    if (!user) return null;

    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const message = `Forgot your password? Go to this link to change your password: ${
      resetURL + resetToken
    }`;

    try {
      await sendEmail({ email, subject: "PASSWORD RESET (valid 10 minutes)", message });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return null;
    }

    return UserMapper.toDomainEntity(user);
  }

  async resetPassword(
    token: string,
    reqBody: { password: string; passwordConfirm: string }
  ): Promise<User | null> {
    const user = await UserModel.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) return null;

    user.password = reqBody.password;
    user.passwordConfirm = reqBody.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return UserMapper.toDomainEntity(user);
  }

  async updatePassword(
    id: string,
    reqBody: { password: string; newPassword: string; passwordConfirm: string }
  ): Promise<User | null> {
    const user = await UserModel.findOne({ id }).select("+password");

    if (!user) return null;
    if (!(await user.correctPassword(reqBody.password, user.password))) return null;

    user.password = reqBody.newPassword;
    user.passwordConfirm = reqBody.passwordConfirm;

    await user.save();

    return UserMapper.toDomainEntity(user);
  }

  async updateMe(
    id: string,
    reqBody: { email: string; name: string }
  ): Promise<User | null> {
    const body = {
      email: reqBody.email,
      name: reqBody.name,
    }

    const user = await UserModel.findOneAndUpdate({ id }, body, {
      new: true,
      runValidators: true,
    });

    if (!user) return null;

    return UserMapper.toDomainEntity(user);
  }

  async protect(
    id: string,
    issuedAt: number
  ): Promise<{ user: User; changedPasswordAfter: boolean } | null> {
    const user = await UserModel.findOne({ id });
    if (!user) return null;
    return {
      user: UserMapper.toDomainEntity(user),
      changedPasswordAfter: user.changedPasswordAfter(issuedAt),
    };
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();

    return users.map(UserMapper.toDomainEntity);
  }

  async update(id: string, user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
