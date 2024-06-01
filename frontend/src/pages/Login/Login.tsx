import { useState } from "react";
import "./Login.less";
import { useLogin } from "../../hooks/Auth/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("karol@onet.pl");
  const [password, setPassword] = useState("12345678!");
  const { login, isLoading } = useLogin();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-container__login">
        <div className="login-container__login__logo">
          <h1>Culinary Connect</h1>
          <p className="login-container__login__logo__text">
            We streamline food service: Waiters take orders, kitchen prepares, and waiters
            serve customers.
          </p>
        </div>

        <div className="login-container__login__inner">
          <h2 className="login-container__login__inner__title">Login</h2>
          <form className="login-container__login__inner__form" onSubmit={handleSubmit}>
            <div className="login-container__login__inner__form__box">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input"
                type="text"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
              />
            </div>
            <div className="login-container__login__inner__form__box">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="input"
                type="text"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
            </div>
            <div className="login-container__login__inner__form__btn--forgot">
              <Link to={"/forgotPassword"}>Forgot password?</Link>
            </div>
            <button
              className="login-container__login__inner__form__btn"
              disabled={isLoading}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="login-container__img"></div>
    </div>
  );
};

export default Login;
