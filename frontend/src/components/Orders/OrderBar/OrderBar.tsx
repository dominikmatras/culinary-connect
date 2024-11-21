import { useEffect } from "react";
import { useOrderContext } from "../../../context/OrderContext";
import { Meal } from "../../Meals/MealsList/MealsList";
import OrderItem from "../OrderItem/OrderItem";
import OrderBarFooter from "../OrderBarFooter/OrderBarFooter";
import OrderOccupied from "../OrderOccupied/OrderOccupied";
import { useCreateOrder } from "../../../hooks/Orders/useCreateOrder";
import Spinner from "../../ui/Spinner/Spinner";
import { useUpdateTable } from "../../../hooks/Tables/useUpdateTable";
import "./OrderBar.less";
import { useLocation } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

const OrderBar = () => {
  const { showOrderBar, table, startOrder, mealsToOrder, dispatch } = useOrderContext();
  const { isLoading, createOrder, isSuccess } = useCreateOrder();
  const { updateTable } = useUpdateTable();
  const path = useLocation().pathname;

  const cancelOrder = () => {
    dispatch({ type: "CLEAR_ORDER" });
  };
  const closeOrderBar = () => {
    dispatch({ type: "HIDE_ORDER_BAR", payload: false });
  };

  useEffect(() => {
    if (table.status === "occupied") {
      dispatch({ type: "START_ORDER", payload: false });
    }
  }, [table.status, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "CLEAR_ORDER" });
      updateTable({ id: table.id, status: "occupied" });
    }
  }, [isSuccess, dispatch]);

  return (
    showOrderBar && (
      <aside className={`order-bar ${path === "/tables" ? "order-bar-tables" : ""}`} style={isLoading ? { opacity: ".5" } : {}}>
        {isLoading && <Spinner />}
        <div className="order-bar__header">
          <h3 className="order-bar__header__title">Table {table.tableNumber}</h3>
          <IoCloseOutline className="order-bar__header__icon" onClick={closeOrderBar} />
        </div>

        <div className="order-bar__content">
          {!startOrder ? (
            <OrderOccupied closeBar={cancelOrder} />
          ) : mealsToOrder.length ? (
            <ul className="order-bar__content__list">
              {mealsToOrder.map((meal: Meal & { quantity: number }) => (
                <OrderItem
                  key={meal.id}
                  id={meal.id}
                  price={meal.price}
                  name={meal.name}
                  photoPath={meal.photoPath}
                  quantity={meal.quantity}
                />
              ))}
            </ul>
          ) : (
            <p className="order-bar__content__no-meals">
              Please add some meals to place an order
            </p>
          )}
        </div>
        {startOrder && table.status === "available" && (
          <OrderBarFooter
            closeBar={cancelOrder}
            createOrder={createOrder}
            isLoading={isLoading}
          />
        )}
      </aside>
    )
  );
};

export default OrderBar;
