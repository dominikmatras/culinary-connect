import { FC } from "react";
import "./Topbar.less";
import { FiMenu } from "react-icons/fi";

interface TopbarProps {
  setIsNavbarOpen: (isOpen: boolean) => void;
}

const Topbar: FC<TopbarProps> = ({ setIsNavbarOpen }) => {
  return (
    <div className="topbar">
      <FiMenu className="topbar__icon" onClick={() => setIsNavbarOpen(true)} />
    </div>
  );
};

export default Topbar;
