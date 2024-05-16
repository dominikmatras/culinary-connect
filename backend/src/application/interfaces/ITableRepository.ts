import type { Table } from '../../core/domain/entities/Table/Table'

export interface ITableRepository {
	findById(id: number): Promise<Table | null>
	findAll(): Promise<Table[]>
	add(table: Table): Promise<Table>
	update(id: number, table: Table): Promise<Table | null>
	delete(id: number): Promise<Table | null>
}
