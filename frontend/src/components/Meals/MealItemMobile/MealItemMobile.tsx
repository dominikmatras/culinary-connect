import { FC } from "react";
import { FaPlus } from "react-icons/fa6";
import { MealItemProps } from "../MealItem/MealItem";
import "./MealItemMobile.less";

const MealItemMobile: FC<MealItemProps> = ({
  id,
  name,
  price,
  photoPath,
  addMealToOrderHandler,
}) => {

  return (
    <div className="meal-item-mobile">
      <div className="meal-item-mobile__title-container">
      <h5 className="meal-item-mobile__title">{name}</h5>

      <p className="meal-item-mobile__price">
        <span>${price}</span>
      </p>
      </div>
      <div className="meal-item-mobile__image-container">

      <img src={photoPath} alt={name} className="meal-item-mobile__img" />
      <button
        className="meal-item-mobile__btn"
        onClick={() => addMealToOrderHandler(id, name, price, photoPath)}
      >
        <FaPlus />
      </button>
      </div>
    </div>
  );
};

export default MealItemMobile;
