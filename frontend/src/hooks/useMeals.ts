import { useQuery } from "@tanstack/react-query";
import { getMeals } from "../services/api";

export const useMeals = () => {
  const { data: meals, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: getMeals,
  });

  return { meals, isLoading };
}