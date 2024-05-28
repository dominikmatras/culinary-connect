import { useOrderContext } from "../../../context/OrderContext";
import { Meal } from "../MealsList/MealsList";
import "./MealItem.less";

const MealItem = ({ id, name, price }: Meal) => {
  const { dispatch } = useOrderContext();

  const addMealToOrderHandler = () => {
    dispatch({ type: "ADD_MEAL_TO_ORDER", payload: { id, name, price } });
  };

  return (
    <div className="meal-item">
      <img src="/burger.jpg" alt="burger image" className="meal-item__img" />
      <h5 className="meal-item__title">{name}</h5>
      <p className="meal-item__price">
        <span>${price}</span>
      </p>
      <button className="meal-item__btn" onClick={addMealToOrderHandler}>
        Add dish
      </button>
    </div>
  );
};

export default MealItem;
