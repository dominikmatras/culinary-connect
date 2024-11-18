import { MdLogout } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../../../hooks/Auth/useLogout";
import { useUser } from "../../../hooks/User/useUser";
import { navItems } from "../Navbar/navItems";
import Spinner from "../Spinner/Spinner";
import "./MobileNavbar.less";
import { useState } from "react";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading: isUserLoading } = useUser();
  const { logout, isLoading } = useLogout();

  const closeSidebar = () => {
    setIsOpen(false);
  }

  return (
    <>
      <aside className="mobile-navbar-hidden">
        <TbLayoutSidebarLeftExpand
          className="showSidebarIcon"
          onClick={() => setIsOpen(true)}
        />
        <div className="separator" />
        <nav className="mobile-navbar__nav">
          <ul className="mobile-navbar__nav__items">
            {navItems.map((item) => {
              if (item.roles.includes(user.role)) {
                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    className="mobile-navbar__nav__items__item"
                  >
                    {item.icon}
                  </NavLink>
                );
              }
            })}
          </ul>
        </nav>
        <div className="mobile-navbar__footer">
              <Link to={"/settings"}>
                <div className="mobile-navbar__footer__user-info">
                  <span className="mobile-navbar__footer__user-info__letter">
                    {user.name.split("")[0]}
                  </span>
    
                </div>
              </Link>
              <button
                onClick={() => logout()}
                disabled={isLoading}
                className="mobile-navbar__footer__logout-btn"
              >
                <MdLogout />
              </button>
            </div>
      </aside>

      <aside className="mobile-navbar" style={isOpen ? { left: "0" } : {}}>
        {!isUserLoading ? (
          <>
            <div>
              <div className="mobile-navbar__logo-container">
                <div className="mobile-navbar__logo">Culinary Connect</div>
                <TbLayoutSidebarLeftCollapse
                  onClick={closeSidebar}
                  className="hideSidebarIcon"
                />
              </div>
              <nav className="mobile-navbar__nav">
                <ul className="mobile-navbar__nav__items">
                  {navItems.map((item) => {
                    if (item.roles.includes(user.role)) {
                      return (
                        <NavLink
                          key={item.title}
                          to={item.path}
                          className="mobile-navbar__nav__items__item"
                          onClick={closeSidebar}
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
            <div className="mobile-navbar__footer">
              <Link to={"/settings"} onClick={closeSidebar}>
                <div className="mobile-navbar__footer__user-info">
                  <span className="mobile-navbar__footer__user-info__letter">
                    {user.name.split("")[0]}
                  </span>
                  <span className="mobile-navbar__footer__user-info__name">
                    {user.name}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => logout()}
                disabled={isLoading}
                className="mobile-navbar__footer__logout-btn"
              >
                <MdLogout />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </aside>
    </>
  );
};

export default MobileNavbar;
