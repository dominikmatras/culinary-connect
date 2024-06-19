import crypto from 'crypto'
import type { Request, Response, NextFunction, CookieOptions } from 'express'
import { UserService } from '../../application/services/UserService'
import { User } from '../../core/domain/entities/User/User'
import { AppError } from '../../../utils/AppError'
import { signToken } from '../../../utils/signToken'
import { UserRepository } from '../../infrastructure/repositories/UserRepository'
import { verifyToken } from '../../../utils/verifyToken'
import { deleteOne, getAll, getOne, updateOne } from './handlerFactory'

export class UserController {
	constructor(private userService: UserService) {
		this.getAllUsers = getAll(this.userService)
		this.getUserById = getOne(this.userService)
		this.updateUser = updateOne(this.userService)
		this.deleteUser = deleteOne(this.userService)
	}

	getAllUsers
	getUserById
	updateUser
	deleteUser

	signTokenAndSendResponse(
		res: Response,
		statusCode: number,
		user: User,
		sendUser: boolean = false
	) {
		const token = signToken(user.id)
		const expiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN) || 90

		const cookieOptions: CookieOptions = {
			expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: process.env.NODE_ENV === 'development' ? false : true,
		}
		res.cookie('jwt', token, cookieOptions)

		if (sendUser) {
			//@ts-ignore
			user.password = undefined
			res.status(statusCode).json({
				status: 'success',
				token,
				data: user,
			})
		}

		res.status(statusCode).json({
			status: 'success',
			token,
		})
	}

	async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const id = crypto.randomUUID()
			const { name, email, password, passwordConfirm, role } = req.body
			const user = new User(id, name, email, role, password, passwordConfirm)
			const newUser = await this.userService.signup(user)

			this.signTokenAndSendResponse(res, 201, newUser, true)
		} catch (error) {
			next(error)
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				return next(new AppError('You must provide valid email and password!', 400))
			}

			const user = await this.userService.login({ email, password })

			if (!user) {
				return next(new AppError('Incorrect user data!', 401))
			}

			this.signTokenAndSendResponse(res, 200, user, true)
		} catch (error) {
			next(error)
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const cookieOptions = {
				expires: new Date(Date.now() + 10 * 1000),
				httpOnly: true,
			}

			res.cookie('jwt', '', cookieOptions)

			res.status(200).json({
				status: 'success',
			})
		} catch (error) {
			next(error)
		}
	}

	async protect(req: Request & { user?: User }, res: Response, next: NextFunction) {
		try {
			let token
			if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
				token = req.headers.authorization.split(' ')[1]
			} else if (req.cookies.jwt) {
				token = req.cookies.jwt
			}

			if (!token) {
				return next(new AppError('You are not loged in! Please login to get access.', 401))
			}

			const verifiedData = await verifyToken(token)

			const response = await this.userService.protect(verifiedData.id, verifiedData.iat)

			if (!response)
				return next(new AppError('The user belonging to this token does no longer exist.', 401))

			const { user, changedPasswordAfter } = response

			if (changedPasswordAfter) {
				return next(new AppError('User recently changed password! Please login again.', 401))
			}

			req.user = user
			next()
		} catch (error) {
			next(error)
		}
	}

	restrictTo(...userRoles: string[]) {
		return async (req: Request & { user?: User }, res: Response, next: NextFunction) => {
			try {
				const user = req.user

				if (user && !userRoles.includes(user?.role)) {
					return next(new AppError('You do not have permission to perform this action', 403))
				}

				next()
			} catch (error) {
				next(error)
			}
		}
	}

	async forgotPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body

			const resetURL = `${req.get('origin')}/resetPassword/`

			const user = await this.userService.forgotPassword(email, resetURL)

			if (!user) {
				return next(
					new AppError('User cannot be found or there was an error sending an email', 404)
				)
			}

			res.status(200).json({
				status: 'success',
				message: 'The email was sended sucessfully!',
			})
		} catch (error) {
			next(error)
		}
	}

	async resetPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const encryptToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

			const reqBody = req.body

			const user = await this.userService.resetPassword(encryptToken, reqBody)

			if (!user) {
				return next(new AppError('User cannot be found!', 404))
			}

			this.signTokenAndSendResponse(res, 200, user, false)
		} catch (error) {
			next(error)
		}
	}

	async updatePassword(req: Request & { user?: User }, res: Response, next: NextFunction) {
		try {
			const id = req.user?.id!
			const user = await this.userService.updatePassword(id, req.body)

			if (!user) {
				return next(new AppError('User cannot be found or you put wrong password!', 404))
			}

			this.signTokenAndSendResponse(res, 200, user, false)
		} catch (error) {
			next(error)
		}
	}

	async updateMe(req: Request & { user?: User }, res: Response, next: NextFunction) {
		try {
			const id = req.user?.id!
			const user = await this.userService.updateMe(id, req.body)

			if (!user) {
				return next(new AppError('User cannot be found!', 404))
			}

			res.status(200).json({
				status: 'success',
				data: user,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async getUser(req: Request & { user?: User }, res: Response, next: NextFunction) {
		try {
			const user = req.user

			if (!user) {
				return next(new AppError('User cannot be found!', 404))
			}

			res.status(200).json({
				status: 'success',
				data: user,
			})
			next()
		} catch (error) {
			next(error)
		}
	}
}

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
export const userController = new UserController(userService)
