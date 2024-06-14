import type { User } from "../entities/User/User";
export interface IUserService {
  signup(userData: User): Promise<User>;
  login(userData: { email: string; password: string }): Promise<User | null>;
  forgotPassword(email: string, resetURL: string): Promise<User | null>;
  resetPassword(
    token: string,
    reqBody: { password: string; passwordConfirm: string }
  ): Promise<User | null>;
  updatePassword(
    id: string,
    reqBody: { password: string; newPassword: string; passwordConfirm: string }
  ): Promise<User | null>;
  updateMe(id: string, reqBody: { email: string, name: string }): Promise<User | null>;
  protect(
    id: string,
    issuedAt: number
  ): Promise<{ user: User; changedPasswordAfter: boolean } | null>;
  findAll(): Promise<User[]>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
