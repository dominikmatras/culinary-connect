type OrderBarFooterProps = {
  closeBar: () => void;
};

const OrderBarFooter = ({ closeBar }: OrderBarFooterProps) => {
  return (
    <>
      <div className="order-bar__footer">
        <p className="order-bar__footer__subtotal">
          <span className="order-bar__footer__label">Sub Total</span>
          <span className="order-bar__footer__value">$0</span>
        </p>
        <p className="order-bar__footer__tax">
          <span className="order-bar__footer__label">Tax 5%</span>
          <span className="order-bar__footer__value">$2</span>
        </p>
        <div className="order-bar__footer__divider"></div>
        <p className="order-bar__footer__total">
          <span className="order-bar__footer__total__label">Total amount</span>
          <span className="order-bar__footer__total__value">$0</span>
        </p>
      </div>
      <div className="order-bar__buttons">
        <button className="order-bar__buttons__button orange">Place Order</button>
        <button className="order-bar__buttons__button" onClick={closeBar}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default OrderBarFooter;
