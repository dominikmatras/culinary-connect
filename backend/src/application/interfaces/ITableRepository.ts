import type { Table } from '../../core/domain/entities/Table/Table'

export interface ITableRepository {
	findById(id: string): Promise<Table | null>
	findAll(): Promise<Table[]>
	add(table: Table): Promise<Table>
	update(id: string, table: Table): Promise<Table | null>
	delete(id: string): Promise<Table | null>
}
