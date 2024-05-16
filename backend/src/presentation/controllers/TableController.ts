import type { Request, Response, NextFunction } from 'express'
import { Table } from '../../core/domain/entities/Table/Table'
import { TableService } from '../../application/services/TableService'
import { TableRepository } from '../../infrastructure/repositories/TableRepository'
import { AppError } from '../../../utils/AppError'

class TableController {
	constructor(private tableService: TableService) {}

	async getAllTables(req: Request, res: Response, next: NextFunction) {
		try {
			const tables = await this.tableService.findAll()
			res.status(200).json({
				status: 'success',
				results: tables.length,
				data: {
					tables,
				},
			})
		} catch (error) {
			next(error)
		}
	}

	async getTablesById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = parseInt(req.params.id)
			const table = await this.tableService.findById(id)

			if (!table) {
				return next(new AppError('Table not found.', 404))
			}

			res.status(200).json({
				status: 'success',
				data: {
					table,
				},
			})
		} catch (error) {
			next(error)
		}
	}

	async createTable(req: Request, res: Response, next: NextFunction) {
		try {
			const { id, tableNumber, status } = req.body
			const table = new Table(id, tableNumber, status)
			const createTable = await this.tableService.create(table)

			res.status(201).json({
				status: 'success',
				data: {
					createTable,
				},
			})
		} catch (error) {
			next(error)
		}
	}

	async updateTable(req: Request, res: Response, next: NextFunction) {
		try {
			const id = parseInt(req.params.id)
			const updateData = req.body
			const updatedTable = this.tableService.update(id, updateData)

			if (!updatedTable) {
				return new AppError('Table not found', 404)
			}

			res.status(200).json({
				status: 'success',
				data: {
					updatedTable,
				},
			})
		} catch (error) {
			next(error)
		}
	}

	async deleteTable(req: Request, res: Response, next: NextFunction) {
		try {
			const id = parseInt(req.params.id)
			const deleteTables = await this.tableService.delete(id)

			if (!deleteTables) {
				return new AppError('Tables not found', 404)
			}

			res.status(204).json({
				status: 'success',
				data: null,
			})
		} catch (error) {
			next(error)
		}
	}
}

const tableRepository = new TableRepository()
const tableService = new TableService(tableRepository)
export const tableController = new TableController(tableService)
