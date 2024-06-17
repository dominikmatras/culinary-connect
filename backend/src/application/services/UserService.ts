import type { User } from '../../core/domain/entities/User/User'
import type { IUserService } from '../../core/domain/services/IUserService'
import type { IUserRepository } from '../interfaces/IUserRepository'

export class UserService implements IUserService {
	constructor(private userRepository: IUserRepository) {}

	async signup(userData: User): Promise<User> {
		return this.userRepository.signup(userData)
	}
	async login(userData: { email: string; password: string }): Promise<User | null> {
		return this.userRepository.login(userData)
	}
	async protect(
		id: string,
		issuedAt: number
	): Promise<{ user: User; changedPasswordAfter: boolean } | null> {
		return this.userRepository.protect(id, issuedAt)
	}
	async findAll(): Promise<User[]> {
		return this.userRepository.findAll()
	}
	async forgotPassword(email: string, resetURL: string): Promise<User | null> {
		return this.userRepository.forgotPassword(email, resetURL)
	}
	async resetPassword(
		token: string,
		reqBody: { password: string; passwordConfirm: string }
	): Promise<User | null> {
		return this.userRepository.resetPassword(token, reqBody)
	}

	async updatePassword(
		id: string,
		reqBody: { password: string; newPassword: string; passwordConfirm: string }
	): Promise<User | null> {
		return this.userRepository.updatePassword(id, reqBody)
	}

	async updateMe(id: string, reqBody: { email: string; name: string }): Promise<User | null> {
		return this.userRepository.updateMe(id, reqBody)
	}

	async update(id: string, user: User): Promise<User> {
		return this.userRepository.update(id, user)
	}
	async delete(id: string): Promise<void> {
		return this.userRepository.delete(id)
	}
}
