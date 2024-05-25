import './KitchenOrder.less';

const list = [
  {
    id: 1,
    name: "Peperoni Pizza",
    quantity: 1,
  },
  {
    id: 2,
    name: "Margherita Pizza",
    quantity: 2,
  },
  {
    id: 3,
    name: "Ravioli with Tomato Sauce",
    quantity: 1,
  },
  {
    id: 4,
    name: "Tiramisu",
    quantity: 1,
  },
  {
    id: 5,
    name: "Cappuccino",
    quantity: 2,
  },
  {
    id: 6,
    name: "Espresso",
    quantity: 1,
  },
  {
    id: 7,
    name: "Margarita Cocktail",
    quantity: 1,
  },
  {
    id: 8,
    name: "Mojito",
    quantity: 1,
  },
  {
    id: 9,
    name: "Margarita Cocktail",
    quantity: 1,
  },
  {
    id: 10,
    name: "Mojito",
    quantity: 1,
  },
  {
    id: 11,
    name: "Margarita Cocktail",
    quantity: 1,
  },
  {
    id: 12,
    name: "Mojito",
    quantity: 1,
  },
  {
    id: 13,
    name: "Margarita Cocktail",
    quantity: 1,
  },
  {
    id: 14,
    name: "Mojito",
    quantity: 1,
  },
  {
    id: 15,
    name: "Margarita Cocktail",
    quantity: 1,
  },
  {
    id: 16,
    name: "Mojito",
    quantity: 1,
  },
  {
    id: 17,
    name: "Margarita Cocktail",
    quantity: 1,
  },
  {
    id: 18,
    name: "Mojito",
    quantity: 1,
  },
  {
    id: 19,
    name: "Margarita Cocktail",
    quantity: 1,
  },
  {
    id: 20,
    name: "Mojito",
    quantity: 1,
  },
  {
    id: 21,
    name: "Margarita Cocktail",
    quantity: 1,
  },
  {
    id: 22,
    name: "Mojito",
    quantity: 1,
  },
  {
    id: 23,
    name: "Margarita Cocktail",
    quantity: 1,
  },
  {
    id: 24,
    name: "Mojito",
    quantity: 1,
  },
];

const KitchenOrder = () => {
  return (
    <div className="kitchen-order">
      <div className="kitchen-order__header">
        <p>#ID: 123123</p>
        <p>15:23</p>
      </div>
      <ul className="kitchen-order__list">
        {list.map((item) => (
          <li key={item.id} className="kitchen-order__list__item">
            <p>{item.quantity}x</p>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      <div className="kitchen-order__buttons">
        <button className="kitchen-order__buttons__btn">Done</button>
        <button className="kitchen-order__buttons__btn kitchen-order__buttons__btn--hold">Hold</button>
      </div>
    </div>
  );
};

export default KitchenOrder;
