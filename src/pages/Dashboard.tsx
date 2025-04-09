import { useEffect, useState } from "react";
import { handleFilter } from "../features/dahsboardTasks";
import DashboardTasksHead from "../components/Dashboard/TasksDashboard/DashboardTasksHead";
import TasksBox from "../components/Dashboard/TasksDashboard/TasksBox";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Filter, popUpOpen, Task } from "../types/dashboardTasksTypes";
import { useFetchData } from "../hooks/dahsboardTasks";
import PopupBox from "../components/Dashboard/TasksDashboard/popup/PopupBox";




export default function Dashboard() {


  const [filters, setFilters] = useState<Filter>({
    date: false,
    priority: 0,
    completed: false,
  });  
  const [popUp,setPopUp] = useState<popUpOpen>({open:false,content:""})
  
  const { data, isLoading, error, refetch } = useFetchData({ filter: filters });

  const [tasks,setTasks] = useState<Task[]|undefined>(data)
  
  const router = useRouter()
  const search = useSearch({ from: "/dashboard", strict: true })

  useEffect(()=>{
    handleFilter(search, setFilters)
  },[search])

  useEffect(()=>{
    setTasks(data)
  },[data])


  return (
    <section className="w-full h-full p-[30px] min-h-full bg-gray-100 flex flex-col items-center" >
      <DashboardTasksHead filters={filters} router={router} setPopUp={setPopUp} />
      <TasksBox data={tasks} isLoading={isLoading} error={error} setPopUp={setPopUp} setTasks={setTasks} />
      {popUp.open?<PopupBox setPopUp={setPopUp} popUp={popUp} refetch={refetch} setTasks={setTasks} />:null}
    </section>
  )
}

