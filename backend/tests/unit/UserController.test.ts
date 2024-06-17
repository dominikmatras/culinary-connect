import { expect } from 'chai'
import sinon from 'sinon'
import mockRequire from 'mock-require'
import type { Request, Response, NextFunction } from 'express'
import { UserService } from '../../src/application/services/UserService'
import { User } from '../../src/core/domain/entities/User/User'
import crypto from 'crypto'

interface VerifiedData {
	id: string
	iat: number
	exp: number
}

// Stubbing the signToken and verifyToken functions
const signTokenStub = sinon.stub().returns('token')
const verifyTokenStub = sinon.stub().resolves({
	id: '1',
	iat: Date.now(),
	exp: Date.now() + 1000,
} as VerifiedData)

// Use mock-require to override dependencies
mockRequire('../../src/utils/signToken', { signToken: signTokenStub })
mockRequire('../../src/utils/verifyToken', { verifyToken: verifyTokenStub })

// Import the UserController after mocking dependencies
const { UserController } = mockRequire.reRequire(
	'../../src/presentation/controllers/UserController'
)

describe('UserController', () => {
	let userServiceStub: sinon.SinonStubbedInstance<UserService>
	let userControllerInstance: typeof UserController

	beforeEach(() => {
		userServiceStub = sinon.createStubInstance(UserService)
		userControllerInstance = new UserController(userServiceStub as unknown as UserService)
	})

	afterEach(() => {
		mockRequire.stopAll()
	})

	describe('getAllUsers', () => {
		it('should return all users', async () => {
			const req = {} as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const users = [
				new User('1', 'User 1', 'user1@example.com', 'waiter', 'password', 'password'),
				new User('2', 'User 2', 'user2@example.com', 'cooker', 'password', 'password'),
			]

			userServiceStub.findAll.resolves(users)

			await userControllerInstance.getAllUsers(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					results: users.length,
					data: users,
				})
			).to.be.true
		})
	})

	describe('logout', () => {
		it('should logout a user', async () => {
			const req = {} as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
				cookie: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			await userControllerInstance.logout(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
				})
			).to.be.true
		})
	})

	describe('restrictTo', () => {
		it('should restrict access based on roles', async () => {
			const req = {
				user: new User('1', 'Test User', 'test@example.com', 'waiter', 'password', 'password'),
			} as Request & { user?: User }
			const res = {} as Response
			const next = sinon.stub() as sinon.SinonStub

			const restrictToAdmin = userControllerInstance.restrictTo('admin')
			await restrictToAdmin(req, res, next)

			expect(next.calledOnce).to.be.true
			expect(next.args[0][0].message).to.equal('You do not have permission to perform this action')
		})
	})
})
