import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";

export const useOrders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  return { orders, isLoading };
};
