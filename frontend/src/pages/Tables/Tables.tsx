import { useTables } from "../../hooks/Tables/useTables";
import Spinner from "../../components/ui/Spinner/Spinner";
import Table from "../../components/ui/Table/Table";
import "./Tables.less";

export type Table = {
  id: number;
  status: string;
  tableNumber: number;
  orders?: {
    id: string;
    tableNumber: number;
    meals: { meal: number; quantity: number }[];
    status: string;
    createdAt: Date;
  }[];
};

const Tables = () => {
  const { tables, isLoading } = useTables();

  if (isLoading || !tables) return <Spinner />;

  const sortedTables = tables.sort(
    (tableA: Table, tableB: Table) => tableA.id - tableB.id
  );

  return (
    <div className="tables">
      <h1 className="tables__title">Choose table</h1>
      {sortedTables.map((table: Table) => {
        if (table.tableNumber === 2 || table.tableNumber === 7) {
          return (
            <Table
              type="long"
              id={table.id}
              key={table.id}
              tableNumber={table.tableNumber}
              status={table.status}
              orders={table.orders}
              style={
                table.tableNumber === 2
                  ? { gridRow: "2 / 5", gridColumn: "2 / 3" }
                  : { gridRow: "5 / 8", gridColumn: "2 / 3" }
              }
            />
          );
        }
        return (
          <Table
            type="short"
            id={table.id}
            key={table.id}
            tableNumber={table.tableNumber}
            status={table.status}
            orders={table.orders}
          />
        );
      })}
    </div>
  );
};

export default Tables;
