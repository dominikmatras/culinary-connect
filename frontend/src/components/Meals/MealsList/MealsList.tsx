import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcInfo } from "react-icons/fc";
import { PAGE_SIZE } from "../../../utils/constants";
import { useMeals } from "../../../hooks/Meals/useMeals";
import { useOrderContext } from "../../../context/OrderContext";
import Pagination from "../../ui/Pagination/Pagination";
import MealItem from "../MealItem/MealItem";
import Spinner from "../../ui/Spinner/Spinner";
import MealItemMobile from "../MealItemMobile/MealItemMobile";
import Cart from "../../Cart/Cart";
import { useIsMobileView } from "../../../hooks/useIsMobileView";
import "./MealsList.less";

type MealsListProps = {
  searchedValue: string;
};

export type Meal = {
  id: number;
  name: string;
  price: number;
  photoPath: string;
};

const MealsList = ({ searchedValue }: MealsListProps) => {
  const [page, setPage] = useState(1);
  const { meals, isLoading } = useMeals();
  const navigate = useNavigate();
  const { dispatch, startOrder } = useOrderContext();
  const isMobileView = useIsMobileView(570);

  if (isLoading || !meals) return <Spinner />;

  const pagedMeals = meals.slice(page * PAGE_SIZE - PAGE_SIZE, PAGE_SIZE * page);

  const filteredMeals = pagedMeals.filter((meal: Meal) =>
    meal.name.toLowerCase().includes(searchedValue)
  );

  const addMealToOrderHandler = (
    id: number,
    name: string,
    price: number,
    photoPath: string
  ) => {
    if (!startOrder) {
      toast("You have to choose a table first!", { icon: <FcInfo /> });
      navigate("/tables");
      return;
    }
    dispatch({
      type: "ADD_MEAL_TO_ORDER",
      payload: { id, name, price, photoPath, quantity: 1 },
    });
  };

  return (
    <>
      <Cart />
      <div className="meals-list">
        <ul className="meals-list__list">
          {filteredMeals.map((meal: Meal) => {
            return isMobileView ? (
              <MealItemMobile
                key={meal.id}
                id={meal.id}
                name={meal.name}
                price={meal.price}
                photoPath={meal.photoPath}
                addMealToOrderHandler={addMealToOrderHandler}
              />
            ) : (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                price={meal.price}
                photoPath={meal.photoPath}
                addMealToOrderHandler={addMealToOrderHandler}
              />
            );
          })}
        </ul>
      </div>
      <Pagination
        className="meals-list__pagination"
        pageSize={PAGE_SIZE}
        count={meals.length}
        setPage={setPage}
        page={page}
      />
    </>
  );
};

export default MealsList;
