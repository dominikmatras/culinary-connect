import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMeals } from "../../services/api";
import MealItem from "../MealItem/MealItem";
import Pagination from "../ui/Pagination/Pagination";
import "./MealsList.less";

type MealsListProps = {
  searchedValue: string;
};

const MealsList = ({ searchedValue }: MealsListProps) => {
  const [page, setPage] = useState(1);
  const { data: meals, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: getMeals,
  });
  if (isLoading || !meals) return null;

  const pagedMeals = meals.slice(page * 6 - 6, 6 * page);
  const filteredMeals = pagedMeals.filter((meal: any) =>
    meal.name.toLowerCase().includes(searchedValue)
  );

  return (
    <div className="meals-list">
      <ul className="meals-list__list">
        {filteredMeals.map((meal: any) => {
          return <MealItem key={meal.id} name={meal.name} price={meal.price} />;
        })}
      </ul>
      <Pagination
        className="meals-list__pagination"
        pageSize={6}
        count={meals.length}
        setPage={setPage}
        page={page}
      />
    </div>
  );
};

export default MealsList;
