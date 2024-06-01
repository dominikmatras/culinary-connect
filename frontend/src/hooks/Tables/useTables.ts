import { useQuery } from "@tanstack/react-query";
import { getTables } from "../../services/apiTables";

export const useTables = () => {
  const { data: tables, isLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  return { tables, isLoading };
};
