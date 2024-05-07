import { MdLogout } from "react-icons/md";
import { PiSquaresFour } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import "./Navbar.less";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {

  const { logout, isLoading } = useLogout();

  return (
    <aside className="navbar">
      <div>
        <div className="navbar__logo">Culinary Connect</div>
        <nav className="navbar__nav">
          <ul className="navbar__nav__items">
            <li className="navbar__nav__items__item active">
              <IoFastFoodOutline />
              <span>Menu</span>
            </li>
            <li className="navbar__nav__items__item">
              <PiSquaresFour />
              <span>Tables</span>
            </li>
            <li className="navbar__nav__items__item">
              <IoSettingsOutline />
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </div>
      <button onClick={() => logout()} disabled={isLoading} className="navbar__logout-btn">
        <MdLogout />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Navbar;
