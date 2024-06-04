import { Table } from '../../core/domain/entities/Table/Table'
import { TableModel } from '../schemas/TableSchema'

export class TableMapper {
	static toDomainEntity(tableModel: any) {
		return new Table(tableModel.id, tableModel.tableNumber, tableModel.status, tableModel.orders)
	}

	static toMongoTable(table: Table) {
		return new TableModel({
			id: table.id,
			tableNumber: table.tableNumber,
			status: table.status,
		})
	}
}
