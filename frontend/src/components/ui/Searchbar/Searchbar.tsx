import { IoSearchSharp } from "react-icons/io5";
import "./Searchbar.less";

type SearchbarProps = {
  onChange: (value: string) => void;
  value: string;
};

const Searchbar = ({ onChange, value }: SearchbarProps) => {
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="searchbar">
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
