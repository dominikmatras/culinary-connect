import { Meal } from "../../Meals/MealsList/MealsList";
import "./OrderItem.less";

const OrderItem = ({ id, price, name }: Meal) => {
  return (
    <li className="order-item">
      <div className="order-item__img" />
      <div className="order-item__title-container">
        <h5 className="order-item__title-container__title">{name}</h5>
        <div>
          <p className="order-item__title-container__qty">
            <span>1x</span>
          </p>
          <p className="order-item__title-container__price">
            <span>${price}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
