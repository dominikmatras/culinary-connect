import type { Table } from '../entities/Table/Table'

export interface ITableService {
	findById(id: string): Promise<Table | null>
	findAll(): Promise<Table[]>
	create(table: Table): Promise<Table>
	update(id: string, table: Table): Promise<Table | null>
	delete(id: string): Promise<Table | null>
}
