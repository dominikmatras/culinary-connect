import { NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { PiSquaresFour } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { useLogout } from "../../../hooks/useLogout";
import { useUser } from "../../../hooks/useUser";
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
            <li>
              <NavLink to="/menu" className="navbar__nav__items__item">
                <IoFastFoodOutline />
                <span>Menu</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/tables" className="navbar__nav__items__item">
                <PiSquaresFour />
                <span>Tables</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className="navbar__nav__items__item">
                <IoSettingsOutline />
                <span>Settings</span>
              </NavLink>
            </li>
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
