import { useUpdateTable } from "../../../hooks/useUpdateTable";
import { Table } from "../../../pages/Tables/Tables";
import "./ShortTable.less";
import { useOrderContext } from "../../../context/OrderContext";

const ShortTable = ({ id, status, tableNumber }: Table) => {
  const { setShowOrderBar } = useOrderContext();
  // const { updateTable, isLoading } = useUpdateTable();
  return (
    <div
      className={`short-table-wrapper ${
        status === "occupied" ? "short-table-wrapper--occupied" : ""
      }`}
      onClick={() => setShowOrderBar(true)}
    >
      <div className="short-table">
        <span className="short-table__label">T{tableNumber}</span>
        <span className="short-table__status">{status}</span>
      </div>

      {/* <div className="table-buttons">
        {status === "occupied" ? (
          <button className="table-buttons__button--free" onClick={() => updateTable({id, status: "available"})}>free</button>
        ) : (
          <button className="table-buttons__button--order">order</button>
        )}
      </div> */}
    </div>
  );
};

export default ShortTable;
