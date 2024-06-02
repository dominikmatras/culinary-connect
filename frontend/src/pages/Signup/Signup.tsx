import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthFormHeader from "../../components/ui/AuthFormHeader/AuthFormHeader";
import "../Login/AuthStyles.less";
import { useSignup } from "../../hooks/Auth/useSignup";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("");

  const { signup, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !passwordConfirm || !name || !role) {
      toast.error("Please fill all the required fields")
      return;
    };

    signup({
      name,
      email,
      password,
      passwordConfirm,
      role
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-container__auth" style={{ paddingTop: "7rem" }}>
        <AuthFormHeader />
        <div className="auth-container__auth__inner">
          <h2 className="auth-container__auth__inner__title">Signup</h2>
          <form className="auth-container__auth__inner__form" onSubmit={handleSubmit}>
            <div className="auth-container__auth__inner__form__box">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="auth-container__auth__inner__form__box">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="auth-container__auth__inner__form__box">
              <label className="label" htmlFor="passwordConfirm">
                Confirm password
              </label>
              <input
                id="passwordConfirm"
                className="input"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <fieldset className="auth-container__auth__inner__form__roles">
              <legend className="auth-container__auth__inner__form__roles__legend">
                Please select your role:
              </legend>
              <div className="auth-container__auth__inner__form__roles__inner">
                <div className="auth-container__auth__inner__form__roles__inner__role">
                  <input
                    type="radio"
                    id="waiter"
                    name="role"
                    value="waiter"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="waiter">Waiter</label>
                </div>

                <div className="auth-container__auth__inner__form__roles__inner__role">
                  <input
                    type="radio"
                    id="cooker"
                    name="role"
                    value="cooker"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="cooker">Cooker</label>
                </div>
              </div>
            </fieldset>
            <button
              disabled={isLoading}
              className="auth-container__auth__inner__form__btn"
              type="submit"
            >
              Signup
            </button>
            <p className="auth-container__auth__inner__form__link">
              Already have an account? <Link to={"/login"}>Click here</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="auth-container__img"></div>
    </div>
  );
};

export default Signup;
