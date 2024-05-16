import { Table } from '../../core/domain/entities/Table/Table'
import type { ITableRepository } from '../../application/interfaces/ITableRepository'
import { TableMapper } from '../mappers/TableMapper'
import { TableModel } from '../schemas/TableSchema'

export class TableRepository implements ITableRepository {
	async findById(id: number): Promise<Table | null> {
		const tableModel = await TableModel.findOne({ id: id })
		return tableModel ? TableMapper.toDomainEntity(tableModel) : null
	}

	async findAll(): Promise<Table[]> {
		const tableModel = await TableModel.find()
		return tableModel.map(TableMapper.toDomainEntity)
	}

	async add(table: Table): Promise<Table> {
		const mongoTable = await TableMapper.toMongoTable(table)
		const createTable = await mongoTable.save()
		return TableMapper.toDomainEntity(createTable)
	}

	async update(id: number, tableDataToUpdate: Table): Promise<Table | null> {
		const tableUpdate = await TableModel.findOneAndUpdate({ id: id }, tableDataToUpdate, {
			new: true,
			runValidators: true,
		})
		return tableUpdate ? TableMapper.toDomainEntity(tableUpdate) : null // Problem with null in Table.ts (entity)
	}

	async delete(id: number): Promise<Table | null> {
		const deleteTable = await TableModel.findOneAndDelete({ id: id })
		return deleteTable ? TableMapper.toDomainEntity(deleteTable) : null
	}
}
