import { expect } from 'chai'
import sinon from 'sinon'
import type { Request, Response, NextFunction } from 'express'
import { OrderController } from '../../src/presentation/controllers/OrderController'
import { OrderService } from '../../src/application/services/OrderService'
import { Order } from '../../src/core/domain/entities/Order/Order'

describe('OrderController', () => {
	let orderServiceStub: sinon.SinonStubbedInstance<OrderService>
	let orderControllerInstance: OrderController

	beforeEach(() => {
		orderServiceStub = sinon.createStubInstance(OrderService)
		orderControllerInstance = new OrderController(orderServiceStub as unknown as OrderService)
	})

	describe('getAllOrders', () => {
		it('Should return all orders', async () => {
			const req = {} as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const orders = [
				new Order('1', 1, [], 'pending', new Date()),
				new Order('2', 2, [], 'completed', new Date()),
			]

			orderServiceStub.findAll.resolves(orders)

			await orderControllerInstance.getAllOrders(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					results: orders.length,
					data: orders,
				})
			).to.be.true
		})
	})

	describe('getOrderById', () => {
		it('Should return an order by ID', async () => {
			const req = { params: { id: '123' } } as unknown as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const order = new Order('1', 1, [], 'pending', new Date())

			orderServiceStub.findById.resolves(order)

			await orderControllerInstance.getOrderById(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					data: order,
				})
			).to.be.true
		})
	})

	describe('createOrder', () => {
		it('Should create a new order', async () => {
			const req = {
				body: {
					tableNumber: 1,
					meals: [],
					status: 'pending',
					createAt: new Date(),
				},
			} as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const order = new Order('1', 1, [], 'pending', new Date())
			orderServiceStub.create.resolves(order)

			await orderControllerInstance.orderCreate(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					data: order,
				})
			).to.be.true
		})
	})

	describe('updateOrder', () => {
		it('Should update an order by id', async () => {
			const req = { params: { id: '123' }, body: { status: 'completed' } } as unknown as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const updatedOrder = new Order('123', 1, [], 'completed', new Date())

			orderServiceStub.update.resolves(updatedOrder)

			await orderControllerInstance.updateOrder(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					data: updatedOrder,
				})
			).to.be.true
		})
	})

	describe('deleteOrder', () => {
		it('Should delete an order by id', async () => {
			const req = { params: { id: '123' } } as unknown as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const order = new Order('123', 1, [], 'pending', new Date())
			orderServiceStub.delete.resolves(order)

			await orderControllerInstance.deleteOrder(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true
			expect((res.json as sinon.SinonStub).calledWith({ status: 'success', data: null })).to.be.true
		})
	})
})
