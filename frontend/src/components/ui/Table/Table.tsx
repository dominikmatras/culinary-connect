import { useOrderContext } from "../../../context/OrderContext";
import { Table as TableType } from "../../../pages/Tables/Tables";
import "./Table.less";

type TableProps = {
  style?: React.CSSProperties;
  type: "long" | "short";
};

const Table = ({
  id,
  style = {},
  status,
  tableNumber,
  orders,
  type,
}: TableProps & TableType) => {
  const { dispatch } = useOrderContext();

  const longTableContent = (
    <>
      <span className="long-table__seats long-table__seats--1" />
      <span className="long-table__seats long-table__seats--2" />
      <span className="long-table__seats long-table__seats--3" />
    </>
  );

  const occupyTableHandler = () => {
    dispatch({ type: "SHOW_ORDER_BAR", payload: true });
    dispatch({ type: "SET_TABLE", payload: { id, tableNumber, status, orders } });
  };

  return (
    <div
      style={style}
      className={`${type}-table-wrapper ${
        status === "occupied" ? `${type}-table-wrapper--occupied` : ""
      }`}
      onClick={occupyTableHandler}
    >
      <div className={`${type}-table`}>
        <span className={`${type}-table__label`}>T{tableNumber}</span>
        <span className={`${type}-table__status`}>{status}</span>
        {type === "long" && longTableContent}
      </div>
    </div>
  );
};

export default Table;
