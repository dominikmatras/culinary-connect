import { NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useLogout } from "../../../hooks/Auth/useLogout";
import { navItems } from "./navItems";
import { useUser } from "../../../hooks/User/useUser";
import "./Navbar.less";

const Navbar = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const { logout, isLoading } = useLogout();

  if (isUserLoading) return <div>Loading...</div>;

  return (
    <aside className="navbar">
      <div>
        <div className="navbar__logo">Culinary Connect</div>
        <nav className="navbar__nav">
          <ul className="navbar__nav__items">
            {navItems.map((item) => {
              if (item.roles.includes(user.role)) {
                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    className="navbar__nav__items__item"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                );
              }
            })}
          </ul>
        </nav>
      </div>
      <div className="navbar__footer">
        <div className="navbar__footer__user-info">
          <span className="navbar__footer__user-info__letter">
            {user.name.split("")[0]}
          </span>
          <span className="navbar__footer__user-info__name">{user.name}</span>
        </div>
        <button
          onClick={() => logout()}
          disabled={isLoading}
          className="navbar__footer__logout-btn"
        >
          <MdLogout />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
