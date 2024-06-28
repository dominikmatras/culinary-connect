import { Table } from '../../core/domain/entities/Table/Table'
import type { ITableRepository } from '../interfaces/ITableRepository'
import type { ITableService } from '../../core/domain/services/ITableService'

export class TableService implements ITableService {
	constructor(private tableRepository: ITableRepository) {}

	async findById(id: string): Promise<Table | null> {
		return this.tableRepository.findById(id)
	}

	async findAll(): Promise<Table[]> {
		return this.tableRepository.findAll()
	}

	async create(table: Table): Promise<Table> {
		return this.tableRepository.add(table)
	}

	async update(id: string, table: Table): Promise<Table | null> {
		return this.tableRepository.update(id, table)
	}

	async delete(id: string): Promise<Table | null> {
		return this.tableRepository.delete(id)
	}
}
