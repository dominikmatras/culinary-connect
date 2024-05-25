import { useTables } from "../../hooks/useTables";
import LongTable from "../../components/ui/LongTable/LongTable";
import ShortTable from "../../components/ui/ShortTable/ShortTable";
import "./Tables.less";

export type Table = {
  id: number;
  status: string;
  tableNumber: number;
};

const Tables = () => {
  const { tables, isLoading } = useTables();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="tables">
      <h1 className="tables__title">Choose table</h1>
      {tables.map((table: Table) => {
        if (table.id === 2 || table.id === 7) {
          return (
            <LongTable
              id={table.id}
              key={table.id}
              tableNumber={table.tableNumber}
              status={table.status}
              style={
                table.id === 2
                  ? { gridRow: "2 / 5", gridColumn: "2 / 3" }
                  : { gridRow: "5 / 8", gridColumn: "2 / 3" }
              }
            />
          );
        }
        return (
          <ShortTable
            id={table.id}
            key={table.id}
            tableNumber={table.tableNumber}
            status={table.status}
          />
        );
      })}
    </div>
  );
};

export default Tables;
