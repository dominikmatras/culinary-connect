import { expect } from 'chai'
import sinon from 'sinon'
import type { Request, Response, NextFunction } from 'express'
import { TableController } from '../../src/presentation/controllers/TableController'
import { TableService } from '../../src/application/services/TableService'
import { Table } from '../../src/core/domain/entities/Table/Table'

describe('TableController', () => {
	let tableServiceStub: sinon.SinonStubbedInstance<TableService>
	let tableControllerInstance: TableController

	beforeEach(() => {
		tableServiceStub = sinon.createStubInstance(TableService)
		tableControllerInstance = new TableController(tableServiceStub as unknown as TableService)
	})

	describe('getAllTables', () => {
		it('Should return all tables', async () => {
			const req = {} as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const tables = [new Table('1', 1, 'available'), new Table('2', 2, 'occupied')]

			tableServiceStub.findAll.resolves(tables)

			await tableControllerInstance.getAllTables(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					results: tables.length,
					data: tables,
				})
			).to.be.true
		})
	})

	describe('getTableById', () => {
		it('Should return a table by ID', async () => {
			const req = { params: { id: '123' } } as unknown as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const table = new Table('1', 1, 'available')

			tableServiceStub.findById.resolves(table)

			await tableControllerInstance.getTableById(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					data: table,
				})
			).to.be.true
		})
	})

	describe('createTable', () => {
		it('Should create a new table', async () => {
			const req = {
				body: {
					tableNumber: 1,
					status: 'available',
				},
			} as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const table = new Table('1', 1, 'available')
			tableServiceStub.create.resolves(table)

			await tableControllerInstance.createTable(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					data: table,
				})
			).to.be.true
		})
	})

	describe('updateTable', () => {
		it('Should update a table by id', async () => {
			const req = { params: { id: '123' }, body: { status: 'occupied' } } as unknown as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const updatedTable = new Table('123', 1, 'occupied')

			tableServiceStub.update.resolves(updatedTable)

			await tableControllerInstance.updateTable(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
			expect(
				(res.json as sinon.SinonStub).calledWith({
					status: 'success',
					data: updatedTable,
				})
			).to.be.true
		})
	})

	describe('deleteTable', () => {
		it('Should delete a table by id', async () => {
			const req = { params: { id: '123' } } as unknown as Request
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
			} as unknown as Response
			const next = sinon.stub() as unknown as NextFunction

			const table = new Table('123', 1, 'deleted')
			tableServiceStub.delete.resolves(table)

			await tableControllerInstance.deleteTable(req, res, next)

			expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true
			expect((res.json as sinon.SinonStub).calledWith({ status: 'success', data: null })).to.be.true
		})
	})
})
