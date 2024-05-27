import { useOrderContext } from "../../../context/OrderContext";
import { Table } from "../../../pages/Tables/Tables";
import "./LongTable.less";

type LongTableProps = {
  style: React.CSSProperties;
};

const LongTable = ({ id, style, status, tableNumber }: LongTableProps & Table) => {
  const { setShowOrderBar } = useOrderContext();
  return (
    <div
      style={style}
      className={`long-table-wrapper ${
        status === "occupied" ? "long-table-wrapper--occupied" : ""
      }`}
      onClick={() => setShowOrderBar(true)}
    >
      <div className="long-table">
        <span className="long-table__label">T{tableNumber}</span>
        <span className="long-table__status">{status}</span>
        <span className="long-table__seats long-table__seats--1" />
        <span className="long-table__seats long-table__seats--2" />
        <span className="long-table__seats long-table__seats--3" />
      </div>
    </div>
  );
};

export default LongTable;