import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useOrderContext } from "../../context/OrderContext";
import OrderItem from "../OrderItem/OrderItem";
import "./OrderBar.less";


const OrderBar = () => {
  const [container, setContainer] = useState<Element | null>(null);
  const { showOrderBar, setShowOrderBar } = useOrderContext();

  useEffect(() => {
    setContainer(document.getElementById('order-bar'));
  }, []);

  const closeOrderBar = () => {
    setShowOrderBar(false);
  };

  return (
    <>
      {showOrderBar && container && createPortal((
        <aside  className="order-bar">
          <div className="order-bar__header">
            <h3 className="order-bar__header__title">Table 4</h3>
          </div>
          <div className="order-bar__content">
            <ul className="order-bar__content__list">
            </ul>
          </div>
          <div className="order-bar__footer">
            <p className="order-bar__footer__subtotal">
              <span className="order-bar__footer__label">Sub Total</span>
              <span className="order-bar__footer__value">$62</span>
            </p>
            <p className="order-bar__footer__tax">
              <span className="order-bar__footer__label">Tax 5%</span>
              <span className="order-bar__footer__value">$2</span>
            </p>
            <div className="order-bar__footer__divider"></div>
            <p className="order-bar__footer__total">
              <span className="order-bar__footer__total__label">Total amount</span>
              <span className="order-bar__footer__total__value">$64</span>
            </p>
          </div>
          <div className="order-bar__buttons">
            <button className="order-bar__buttons__button orange">Place Order</button>
            <button className="order-bar__buttons__button" onClick={closeOrderBar}>Cancel</button>
          </div>
        </aside>
      ), container)}
    </>
  );
};

export default OrderBar;
