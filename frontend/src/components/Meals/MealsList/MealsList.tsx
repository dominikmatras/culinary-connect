import { useState } from "react";
import { PAGE_SIZE } from "../../../utils/constants";
import { useMeals } from "../../../hooks/useMeals";
import MealItem from "../MealItem/MealItem";
import Pagination from "../../ui/Pagination/Pagination";
import "./MealsList.less";

type MealsListProps = {
  searchedValue: string;
};

type Meal = {
  id: number;
  name: string;
  price: number;
};

const MealsList = ({ searchedValue }: MealsListProps) => {
  const [page, setPage] = useState(1);
  const { meals, isLoading } = useMeals();
  if (isLoading || !meals) return null;

  const pagedMeals = meals.slice(page * PAGE_SIZE - PAGE_SIZE, PAGE_SIZE * page);

  const filteredMeals = pagedMeals.filter((meal: Meal) =>
    meal.name.toLowerCase().includes(searchedValue)
  );

  return (
    <div className="meals-list">
      <ul className="meals-list__list">
        {filteredMeals.map((meal: Meal) => {
          return <MealItem key={meal.id} name={meal.name} price={meal.price} />;
        })}
      </ul>
      <Pagination
        className="meals-list__pagination"
        pageSize={PAGE_SIZE}
        count={meals.length}
        setPage={setPage}
        page={page}
      />
    </div>
  );
};

export default MealsList;
