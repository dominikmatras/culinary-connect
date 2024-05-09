import './MealItem.less';

type MealItemProps = {
  name: string;
  price: number;
};

const MealItem = ({ name, price }: MealItemProps) => {
  return (
    <div className="meal-item">
      <img src="/burger.jpg" alt="burger image" className="meal-item__img" />
      <h5 className="meal-item__title">{name}</h5>
      <p className="meal-item__price">
        <span>${price}</span>
      </p>
      <button className="meal-item__btn">Add dish</button>
    </div>
  );
};

export default MealItem;
