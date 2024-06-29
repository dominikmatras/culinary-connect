import moment from "moment-timezone";
import { useUpdateOrder } from "../../../hooks/Orders/useUpdateOrder";
import { Order } from "../../../pages/Orders/Orders";
import "./KitchenOrder.less";

type KitchenOrderProps = {
  order: Order;
};

const KitchenOrder = ({ order }: KitchenOrderProps) => {
  const { updateOrder, isLoading } = useUpdateOrder();
  const time = moment(order.createdAt).tz("Europe/Warsaw").format("HH:mm");

  const updateOrderStatus = (status: string) => {
    updateOrder({ orderId: order.id, status });
  };

  return (
    <div className="kitchen-order">
      <div
        className="kitchen-order__header"
        style={{
          backgroundColor:
            order.status === "completed"
              ? "var(--color-green-800)"
              : order.status === "cancelled"
              ? "var(--color-red-700)"
              : "var(--color-yellow-600)",
        }}
      >
        <p>Table {order.tableNumber}</p>
        <p>{time}</p>
      </div>
      <ul className="kitchen-order__list">
        {order?.meals?.map((meal) => (
          <li key={meal._id} className="kitchen-order__list__item">
            <p>{meal.quantity}x</p>
            <p>{meal.mealName}</p>
          </li>
        ))}
      </ul>
      <div className="kitchen-order__buttons">
        {order.status !== "completed" && order.status !== "cancelled" && (
          <>
            <button
              disabled={isLoading}
              className="kitchen-order__buttons__btn"
              onClick={() => updateOrderStatus("completed")}
            >
              Done
            </button>
            <button
              disabled={isLoading}
              className="kitchen-order__buttons__btn kitchen-order__buttons__btn--hold"
              onClick={() => updateOrderStatus("cancelled")}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default KitchenOrder;
