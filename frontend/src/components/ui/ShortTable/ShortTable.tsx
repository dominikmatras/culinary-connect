import { Table } from "../../../pages/Tables/Tables";
import { useOrderContext } from "../../../context/OrderContext";
import "./ShortTable.less";

const ShortTable = ({ id, status, tableNumber }: Table) => {
  const { dispatch } = useOrderContext();

  const occupyTableHandler = () => {
    dispatch({ type: "SHOW_ORDER_BAR", payload: true });
    dispatch({ type: "SET_TABLE", payload: { id, tableNumber, status } });
  };

  return (
    <div
      className={`short-table-wrapper ${
        status === "occupied" ? "short-table-wrapper--occupied" : ""
      }`}
      onClick={occupyTableHandler}
    >
      <div className="short-table">
        <span className="short-table__label">T{tableNumber}</span>
        <span className="short-table__status">{status}</span>
      </div>
    </div>
  );
};

export default ShortTable;
