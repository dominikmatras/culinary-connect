import toast from "react-hot-toast";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/Auth/useResetPassword";
import Spinner from "../../components/ui/Spinner/Spinner";
import "../ForgotPassword/ForgotPassword.less";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { resetPassword, isLoading } = useResetPassword();

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !password || !passwordConfirm) {
      toast.error("Please fill all the required fields")
      return;
    };
    resetPassword({
      password,
      passwordConfirm,
      token,
    });
  };

  return (
    <div className="change-password-modal">
      {isLoading && <Spinner />}
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
          <h2 className="change-password-modal__title-container__title">
            Change your password
          </h2>
        </div>
        <p className="change-password-modal__text">
          Please enter a new password below to update your current password.
        </p>
        <form onSubmit={onSubmitHandler} className="change-password-modal__form">
          <div className="change-password-modal__form__input">
            <label htmlFor="password">New Password</label>
            <input
              className="input-secondary"
              disabled={isLoading}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="change-password-modal__form__input">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              className="input-secondary"
              disabled={isLoading}
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            className="change-password-modal__form__btn"
            type="submit"
          >
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
