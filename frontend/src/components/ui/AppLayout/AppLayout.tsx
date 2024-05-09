import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./AppLayout.less";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-layout__main">
        <div className="app-layout__main__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
