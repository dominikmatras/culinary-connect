import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import OrderBar from "../../Orders/OrderBar/OrderBar";
import "./AppLayout.less";
import MobileNavbar from "../MobileNavbar/MobileNavbar";

const AppLayout = () => {
  const path = useLocation().pathname;

  return (
    <div className="app-layout">
      <Navbar />
      <MobileNavbar />
      <main className="app-layout__main">
        <div className="app-layout__main__container">
          <Outlet />
        </div>
        {(path === "/menu" || path === "/tables") && <OrderBar />}
      </main>
    </div>
  );
};

export default AppLayout;
