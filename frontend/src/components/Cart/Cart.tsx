import { FC } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useOrderContext } from "../../context/OrderContext";
import { TAX_VALUE } from "../../utils/constants";
import "./Cart.less";

interface CartProps {}

const Cart: FC<CartProps> = ({}) => {
  const { mealsToOrder, dispatch, table: {tableNumber} } = useOrderContext();
  const cartItems = mealsToOrder.reduce((acc, currVal) => acc + currVal.quantity, 0);

  const subTotal = mealsToOrder.reduce((acc, currMeal) => {
    acc += currMeal.price * currMeal.quantity;
    return acc;
  }, 0);
  const tax = (subTotal * TAX_VALUE) / 100;
  const total = (tax + subTotal).toFixed(2);

  return (
    cartItems > 0 && (
      <div
        className="cart"
        onClick={() => dispatch({ type: "SHOW_ORDER_BAR", payload: true })}
      >
        <div className="cart__container">
          <FaCartShopping className="cart__icon" />
          <span className="cart__quantity">{cartItems}</span>
        </div>
        <span>Table {tableNumber}</span>
        <span>({total}$)</span>
      </div>
    )
  );
};

export default Cart;
