import { useEffect, useState } from "react";
import { Filter, handleFilter, useFetchData } from "../features/dahsboardTasks";
import DashboardTasksHead from "../components/Dashboard/TasksDashboard/DashboardTasksHead";
import TasksBox from "../components/Dashboard/TasksDashboard/TasksBox";
import { useRouter, useSearch } from "@tanstack/react-router";



export default function Dashboard() {


  const [filters, setFilters] = useState<Filter>({
    date: false,
    priority: 0,
    completed: false,
  });  
  
  const { data, isLoading, error } = useFetchData({ filter: filters });
  
  const router = useRouter()
  const search = useSearch({ from: "/dashboard", strict: true })

  useEffect(()=>{
    handleFilter(search, setFilters)
  },[search])


  return (
    <section className="w-full h-full p-[30px] min-h-full bg-gray-100 flex flex-col items-center " >
      <DashboardTasksHead filters={filters} router={router} />
      <TasksBox data={data} isLoading={isLoading} error={error} />
    </section>
  )
}

