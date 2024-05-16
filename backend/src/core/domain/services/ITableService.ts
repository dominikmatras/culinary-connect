import type { Table } from '../entities/Table/Table'

export interface ITableService {
	findById(id: number): Promise<Table | null>
	findAll(): Promise<Table[]>
	create(table: Table): Promise<Table>
	update(id: number, table: Table): Promise<Table | null>
	delete(id: number): Promise<Table | null>
}
