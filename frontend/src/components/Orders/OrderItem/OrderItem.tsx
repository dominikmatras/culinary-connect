import { Meal } from "../../Meals/MealsList/MealsList";
import "./OrderItem.less";

const OrderItem = ({ id, price, name, photoPath, quantity }: Meal & {quantity: number}) => {
  return (
    <li className="order-item">
      <div className="order-item__img" style={{ backgroundImage: `url(${photoPath})`}}/>
      <div className="order-item__title-container">
        <h5 className="order-item__title-container__title">{name}</h5>
        <div>
          <p className="order-item__title-container__qty">
            <span>{quantity}x</span>
          </p>
          <p className="order-item__title-container__price">
            <span>${(price * quantity).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
