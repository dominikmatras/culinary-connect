import type { User } from "../entities/User/User";
export interface IUserService {
  signup(userData: User): Promise<User>;
  login(userData: { email: string; password: string }): Promise<User | null>;
  forgotPassword(email: string, resetURL: string): Promise<User | null>;
  resetPassword(
    token: string,
    reqBody: { password: string; passwordConfirm: string }
  ): Promise<User | null>;
  protect(
    id: number,
    issuedAt: number
  ): Promise<{ user: User; changedPasswordAfter: boolean } | null>;
  findAll(): Promise<User[]>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
