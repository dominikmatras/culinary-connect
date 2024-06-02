import toast from "react-hot-toast";
import { useState } from "react";
import { useLogin } from "../../hooks/Auth/useLogin";
import { Link } from "react-router-dom";
import AuthFormHeader from "../../components/ui/AuthFormHeader/AuthFormHeader";
import './AuthStyles.less'
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
    if (!email || !password) {
      toast.error("Please fill all the required fields")
      return;
    };
    login({ email, password });
  };

  return (
    <div className="auth-container">
      <div className="auth-container__auth">
        <AuthFormHeader />
        <div className="auth-container__auth__inner">
          <h2 className="auth-container__auth__inner__title">Login</h2>
          <form className="auth-container__auth__inner__form" onSubmit={handleSubmit}>
            <div className="auth-container__auth__inner__form__box">
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
            <div className="auth-container__auth__inner__form__box">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="input"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
            </div>
            <div className="auth-container__auth__inner__form__btn--forgot">
              <Link to={"/forgotPassword"}>Forgot password?</Link>
            </div>
            <button
              className="auth-container__auth__inner__form__btn"
              disabled={isLoading}
              type="submit"
            >
              Login
            </button>
            <p className="auth-container__auth__inner__form__link">
              Don't have an account? <Link to={"/signup"}>Click here</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="auth-container__img"></div>
    </div>
  );
};

export default Login;
