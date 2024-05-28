import { Link } from "react-router-dom";
import { useOrderContext } from "../../../context/OrderContext";
import { useUpdateTable } from "../../../hooks/useUpdateTable";

type OrderOccupiedProps = {
  closeBar: () => void;
};

const OrderOccupied = ({ closeBar }: OrderOccupiedProps) => {
  const { table, dispatch } = useOrderContext();
  const { updateTable, isLoading } = useUpdateTable();

  const makeTableAvailable = () => {
    updateTable({ id: table.id, status: "available" });
    dispatch({ type: "SET_TABLE", payload: { ...table, status: "available" } })
  };

  const startOrder = () => {
    dispatch({ type: "START_ORDER", payload: true });
  };

  return (
    <div className="order-bar__content__occupied">
      <p className="order-bar__content__occupied__text">
        {table.status === "occupied" ? "This table is already occupied" : ""}
      </p>
      <div className="order-bar__content__occupied__buttons">
        {table.status === "occupied" ? (
          <button
            className="order-bar__content__occupied__buttons__btn"
            onClick={makeTableAvailable}
          >
            Make available
          </button>
        ) : (
          <Link
            to={"/menu"}
            onClick={startOrder}
            className="order-bar__content__occupied__buttons__btn"
          >
            Make Order
          </Link>
        )}
        <button
          className="order-bar__content__occupied__buttons__btn"
          onClick={closeBar}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderOccupied;
