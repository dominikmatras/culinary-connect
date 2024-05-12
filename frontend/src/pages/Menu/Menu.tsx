import { useState } from "react";
import MealsList from "../../components/Meals/MealsList/MealsList";
import Searchbar from "../../components/ui/Searchbar/Searchbar";
import "./Menu.less";
import OrderBar from "../../components/OrderBar/OrderBar";
import "./Menu.less";

const Menu = () => {
  const [searchedValue, setSearchValue] = useState("");

  const onChangeSearch = (value: string) => {
    setSearchValue(value);
  };
  return (
    <div className="menu">
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1}}>
        <div>
          <Searchbar onChange={onChangeSearch} value={searchedValue} />
          <OrderBar />
        </div>
        <MealsList searchedValue={searchedValue} />
      </div>
      <div id="order-bar"></div>
    </div>
  );
};

export default Menu;
