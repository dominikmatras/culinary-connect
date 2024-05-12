import "./OrderItem.less";

const OrderItem = () => {
  return (
    <li className="order-item">
      <div className="order-item__img" />
      <div className="order-item__title-container">
        <h5 className="order-item__title-container__title">gergergerg</h5>
        <div>
          <p className="order-item__title-container__qty">
            <span>3x</span>
          </p>
          <p className="order-item__title-container__price">
            <span>$23</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
