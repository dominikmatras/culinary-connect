
import { useState } from 'react';
import MealsList from '../../components/MealsList/MealsList';
import Navbar from '../../components/Navbar/Navbar';
import Searchbar from '../../components/ui/Searchbar/Searchbar';
import './Menu.less';

const Menu = () => {
  const [searchedValue, setSearchValue] = useState("");

  const onChangeSearch = (value: string) => {
    setSearchValue(value);
  };
  return (
        <div
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <Navbar />
          <div
            style={{
              flexGrow: 1,
              flexShrink: 0,
            }}
          >
            <Searchbar onChange={onChangeSearch} value={searchedValue} />
            <MealsList searchedValue={searchedValue} />
          </div>
        </div>
  )
}

export default Menu
