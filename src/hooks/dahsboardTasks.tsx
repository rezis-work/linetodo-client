import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../features/dahsboardTasks";
import { Filter, Task } from "../types/dashboardTasksTypes";

export const useFetchData = ({ filter }:{filter:Filter}) => {
    return useQuery<Task[], Error>({
      queryKey: ["data", filter.date, filter.priority, filter.completed],
      queryFn: () => fetchData(filter),
    });
  };

