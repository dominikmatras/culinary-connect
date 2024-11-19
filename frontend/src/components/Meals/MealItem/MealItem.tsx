import { FC } from "react";
import { Meal } from "../MealsList/MealsList";
import "./MealItem.less";

export type MealItemProps = Meal & {
  addMealToOrderHandler: (
    id: number,
    name: string,
    price: number,
    photoPath: string
  ) => void;
};

const MealItem: FC<MealItemProps> = ({
  id,
  name,
  price,
  photoPath,
  addMealToOrderHandler,
}) => {
  return (
    <div className="meal-item">
      <img src={photoPath} alt={name} className="meal-item__img" />
      <h5 className="meal-item__title">{name}</h5>
      <p className="meal-item__price">
        <span>${price}</span>
      </p>
      <button
        className="meal-item__btn"
        onClick={() => addMealToOrderHandler(id, name, price, photoPath)}
      >
        Add dish
      </button>
    </div>
  );
};

export default MealItem;
