import { IoSearchSharp } from "react-icons/io5";
import { useOrderContext } from "../../../context/OrderContext";
import { useIsMobileView } from "../../../hooks/useIsMobileView";
import "./Searchbar.less";

type SearchbarProps = {
  onChange: (value: string) => void;
  value: string;
};

const Searchbar = ({ onChange, value }: SearchbarProps) => {
  const { mealsToOrder } = useOrderContext();
  const isMobileView = useIsMobileView();

  const cartItems = mealsToOrder.reduce((acc, currVal) => acc + currVal.quantity, 0);
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`searchbar ${cartItems > 0 && !isMobileView ?  "searchbar-lower" : ""}`}>
      <input
        value={value}
        onChange={changeInputHandler}
        className="searchbar__input"
        type="text"
        placeholder="Search for meals..."
      />
      <IoSearchSharp className="searchbar__icon" />
    </div>
  );
};

export default Searchbar;
