import { useOrderContext } from "../../../context/OrderContext";
import { TAX_VALUE } from "../../../utils/constants";

type OrderBarFooterProps = {
  closeBar: () => void;
  createOrder: (data: any) => void;
  isLoading: boolean;
};

const OrderBarFooter = ({ closeBar, createOrder, isLoading }: OrderBarFooterProps) => {
  const { mealsToOrder, table } = useOrderContext();

  const subTotal = mealsToOrder.reduce((acc, currMeal) => {
    acc += currMeal.price * currMeal.quantity;
    return acc;
  }, 0);
  const tax = (subTotal * TAX_VALUE) / 100;
  const total = (tax + subTotal).toFixed(2);

  const finalMealsToOrder = mealsToOrder.map((meal) => ({
    meal: meal.id,
    mealName: meal.name,
    quantity: meal.quantity,
  }));

  const placeOrderHandler = () => {
    createOrder({ meals: finalMealsToOrder, tableNumber: table.tableNumber });
  };

  return (
    <>
      <div className="order-bar__footer">
        <p className="order-bar__footer__subtotal">
          <span className="order-bar__footer__label">Sub Total</span>
          <span className="order-bar__footer__value">${subTotal.toFixed(2)}</span>
        </p>
        <p className="order-bar__footer__tax">
          <span className="order-bar__footer__label">Tax 5%</span>
          <span className="order-bar__footer__value">${tax.toFixed(2)}</span>
        </p>
        <div className="order-bar__footer__divider"></div>
        <p className="order-bar__footer__total">
          <span className="order-bar__footer__total__label">Total amount</span>
          <span className="order-bar__footer__total__value">${total}</span>
        </p>
      </div>
      <div className="order-bar__buttons">
        <button
          className="order-bar__buttons__button orange"
          disabled={mealsToOrder?.length <= 0 || isLoading}
          onClick={placeOrderHandler}
        >
          Place Order
        </button>
        <button
          className="order-bar__buttons__button"
          disabled={isLoading}
          onClick={closeBar}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default OrderBarFooter;
