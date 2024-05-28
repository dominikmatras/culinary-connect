import { useEffect } from "react";
import { useOrderContext } from "../../../context/OrderContext";
import { Meal } from "../../Meals/MealsList/MealsList";
import OrderItem from "../OrderItem/OrderItem";
import OrderBarFooter from "../OrderBarFooter/OrderBarFooter";
import OrderOccupied from "../OrderOccupied/OrderOccupied";
import "./OrderBar.less";

const OrderBar = () => {
  const { showOrderBar, table, startOrder, mealsToOrder, dispatch } = useOrderContext();

  const closeOrderBar = () => {
    dispatch({ type: "SHOW_ORDER_BAR", payload: false });
  };

  useEffect(() => {
    if (table.status === "occupied") {
      dispatch({ type: "START_ORDER", payload: false });
    }
  }, [table.status, dispatch]);

  return (
    showOrderBar && (
      <aside className="order-bar">
        <div className="order-bar__header">
          <h3 className="order-bar__header__title">Table {table.tableNumber}</h3>
        </div>

        <div className="order-bar__content">
          {!startOrder ? (
            <OrderOccupied closeBar={closeOrderBar} />
          ) : (
            <ul className="order-bar__content__list">
              {mealsToOrder.map((meal: Meal) => (
                <OrderItem
                  key={meal.id}
                  id={meal.id}
                  price={meal.price}
                  name={meal.name}
                />
              ))}
            </ul>
          )}
        </div>
        {startOrder && table.status === "available" && (
          <OrderBarFooter closeBar={closeOrderBar} />
        )}
      </aside>
    )
  );
};

export default OrderBar;
