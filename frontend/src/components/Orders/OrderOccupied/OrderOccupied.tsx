import { Link } from "react-router-dom";
import { useOrderContext } from "../../../context/OrderContext";
import { useUpdateTable } from "../../../hooks/Tables/useUpdateTable";

type OrderOccupiedProps = {
  closeBar: () => void;
};

const OrderOccupied = ({ closeBar }: OrderOccupiedProps) => {
  const { table, dispatch } = useOrderContext();
  const { updateTable } = useUpdateTable();

  const makeTableAvailable = () => {
    updateTable({ id: table.id, status: "available" });
    dispatch({ type: "SET_TABLE", payload: { ...table, status: "available" } });
  };

  const startOrder = () => {
    dispatch({ type: "START_ORDER", payload: true });
  };

  const hasOrders = table.orders?.some((order) => order.status === "pending");

  return (
    <div className="order-bar__content__occupied">
      {!hasOrders ? (
        <>
          <p className="order-bar__content__occupied__text">
            {table.status === "occupied"
              ? "This table is currently occupied. Would you like to make it available?"
              : ""}
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
        </>
      ) : (
        <p className="order-bar__content__occupied__text order-bar__content__occupied__text--warning">
          This table is already occupied and has pending orders. Please wait for the
          orders to be completed.
        </p>
      )}
    </div>
  );
};

export default OrderOccupied;
