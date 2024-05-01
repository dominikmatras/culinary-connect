import { useQuery } from "@tanstack/react-query";
import MealItem from "../MealItem/MealItem";
import "./MealsList.less";
import { getMeals } from "../../services/api";

type MealsListProps = {
  searchedValue: string;
};

const MealsList = ({ searchedValue }: MealsListProps) => {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: getMeals,
  });
  if (isLoading) return null;

  const filteredMeals = meals.filter((meal: any) =>
    meal.name.toLowerCase().includes(searchedValue)
  );

  return (
    <div className="meals-list">
      <ul className="meals-list__list">
        {filteredMeals.map((meal: any) => {
          return <MealItem key={meal.id} name={meal.name} price={meal.price} />;
        })}
      </ul>
    </div>
  );
};

export default MealsList;
