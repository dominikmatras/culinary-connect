import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import OrderBar from "../../Orders/OrderBar/OrderBar";
import "./AppLayout.less";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-layout__main">
        <div className="app-layout__main__container">
          <Outlet />
        </div>
        <OrderBar />
      </main>
    </div>
  );
};

export default AppLayout;
