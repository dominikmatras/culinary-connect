import { useOrderContext } from "../../../context/OrderContext";
import { Meal } from "../../Meals/MealsList/MealsList";
import "./OrderItem.less";

const OrderItem = ({
  id,
  price,
  name,
  photoPath,
  quantity,
}: Meal & { quantity: number }) => {
  const { dispatch } = useOrderContext();

  const addMealToOrder = () => {
    dispatch({ type: "ADD_MEAL_TO_ORDER", payload: { id } });
  };

  const removeMealFromOrder = () => {
    dispatch({ type: "REMOVE_MEAL_FROM_ORDER", payload: { id } });
  };

  return (
    <li className="order-item">
      <div className="order-item__img" style={{ backgroundImage: `url(${photoPath})` }} />
      <div className="order-item__title-container">
        <h5 className="order-item__title-container__title">{name}</h5>
        <div className="order-item__title-container__inner">
          <p className="order-item__title-container__qty">
            <span>{quantity}x</span>
          </p>
          <div>
            <button
              className="order-item__title-container__qty__button"
              onClick={removeMealFromOrder}
            >
              -
            </button>
            <button
              className="order-item__title-container__qty__button"
              onClick={addMealToOrder}
            >
              +
            </button>
          </div>
          <p className="order-item__title-container__price">
            <span>${(price * quantity).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
