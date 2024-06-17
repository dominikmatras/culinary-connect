import { TableService } from '../../application/services/TableService'
import { TableRepository } from '../../infrastructure/repositories/TableRepository'
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory'

export class TableController {
	constructor(private tableService: TableService) {
		this.createTable = createOne('Table', this.tableService)
		this.getAllTables = getAll(this.tableService)
		this.getTableById = getOne(this.tableService)
		this.updateTable = updateOne(this.tableService)
		this.deleteTable = deleteOne(this.tableService)
	}

	createTable
	getAllTables
	getTableById
	updateTable
	deleteTable
}

const tableRepository = new TableRepository()
const tableService = new TableService(tableRepository)
export const tableController = new TableController(tableService)
