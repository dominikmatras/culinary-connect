import "./Login.less";

const Login = () => {
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
          <form className="login-container__login__inner__form">
            <div className="login-container__login__inner__form__box">
              <label className="label" htmlFor="">Email</label>
              <input className="input" type="text" />
            </div>
            <div className="login-container__login__inner__form__box">
              <label className="label" htmlFor="">Password</label>
              <input className="input" type="text" />
            </div>
          <button className="login-container__login__inner__form__btn">Login</button>
          </form>
        </div>
      </div>
      <div className="login-container__img"></div>
    </div>
  );
};

export default Login;
