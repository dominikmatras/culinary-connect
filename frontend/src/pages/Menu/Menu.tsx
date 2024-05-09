import { useState } from "react";
import MealsList from "../../components/Meals/MealsList/MealsList";
import Searchbar from "../../components/ui/Searchbar/Searchbar";
import "./Menu.less";

const Menu = () => {
  const [searchedValue, setSearchValue] = useState("");

  const onChangeSearch = (value: string) => {
    setSearchValue(value);
  };
  return (
    <>
      <Searchbar onChange={onChangeSearch} value={searchedValue} />
      <MealsList searchedValue={searchedValue} />
    </>
  );
};

export default Menu;
