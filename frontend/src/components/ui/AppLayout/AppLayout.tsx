import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import OrderBar from "../../Orders/OrderBar/OrderBar";
import "./AppLayout.less";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import Topbar from "../Topbar/Topbar";
import { useState } from "react";

const AppLayout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const path = useLocation().pathname;

  return (
    <div className="app-layout">
      <Topbar setIsNavbarOpen={setIsNavbarOpen} />
      <Navbar />
      <MobileNavbar setIsNavbarOpen={setIsNavbarOpen} isNavbarOpen={isNavbarOpen} />
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
