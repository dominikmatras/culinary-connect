import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useForgotPassword } from "../../hooks/Auth/useForgotPassword";
import Spinner from "../../components/ui/Spinner/Spinner";
import "./ForgotPassword.less";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const ref = useRef({ value: email });
  const { forgotPassword, isLoading, isSuccess } = useForgotPassword();

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please provide an email");
      return
    };
    forgotPassword(email);
    ref.current.value = email;
    setEmail("");
  };

  return (
    <div className="change-password-modal">
      {isLoading && <Spinner />}
      {!isSuccess ? (
        <div
          className="change-password-modal__inner"
          style={
            isLoading
              ? {
                  opacity: "0.5",
                }
              : {}
          }
        >
          <div className="change-password-modal__title-container">
            <Link to={"/"} className="change-password-modal__title-container__icon-back">
              <FaArrowLeftLong />
            </Link>
            <h2 className="change-password-modal__title-container__title">
              Reset your password
            </h2>
          </div>
          <p className="change-password-modal__text">
            We will send you an email to rest your password
          </p>
          <form onSubmit={onSubmitHandler} className="change-password-modal__form">
            <div className="change-password-modal__form__input">
              <label htmlFor="email">Email</label>
              <input
                className="input-secondary"
                disabled={isLoading}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="change-password-modal__form__btn"
              type="submit"
              disabled={isLoading}
            >
              Send email
            </button>
          </form>
        </div>
      ) : (
        <div className="change-password-modal__success-message">
          <p className="change-password-modal__success-message__text">
            A password reset email has been sent to <b>{ref.current.value}</b>, if this
            address is registered in our system.
          </p>
          <Link to={"/login"} className="change-password-modal__success-message__link">
            <FaArrowLeftLong />
            <span>Login</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
