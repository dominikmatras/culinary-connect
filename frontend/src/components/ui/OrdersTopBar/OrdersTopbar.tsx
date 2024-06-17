import { Order } from "../../../pages/Orders/Orders";
import "./OrdersTopbar.less";

type OrdersTopbarProps = {
  chooseFilter: (filter: "all" | "pending" | "completed" | "cancelled") => void;
  filter: string;
  orders: Order[];
};

const OrdersTopbar = ({ chooseFilter, filter, orders }: OrdersTopbarProps) => {
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const completedOrders = orders.filter((order) => order.status === "completed");
  const cancelledOrders = orders.filter((order) => order.status === "cancelled");

  const chooseFilterHandler = (e: any) => {
    chooseFilter(e.target.innerText.toLowerCase().split(" ")[1]);
  };

  return (
    <div className="orders-top-bar">
      <button
        className={`orders-top-bar__btn ${
          filter === "all" ? "orders-top-bar__btn--active" : ""
        }`}
        onClick={(e) => chooseFilterHandler(e)}
      >
        {orders?.length} All
      </button>
      <button
        className={`orders-top-bar__btn ${
          filter === "pending" ? "orders-top-bar__btn--active" : ""
        }`}
        onClick={(e) => chooseFilterHandler(e)}
      >
        {pendingOrders?.length} Pending
      </button>
      <button
        className={`orders-top-bar__btn ${
          filter === "completed" ? "orders-top-bar__btn--active" : ""
        }`}
        onClick={(e) => chooseFilterHandler(e)}
      >
        {completedOrders?.length} Completed
      </button>
      <button
        className={`orders-top-bar__btn ${
          filter === "cancelled" ? "orders-top-bar__btn--active" : ""
        }`}
        onClick={(e) => chooseFilterHandler(e)}
      >
        <span>{cancelledOrders?.length}</span> Cancelled
      </button>
    </div>
  );
};

export default OrdersTopbar;
