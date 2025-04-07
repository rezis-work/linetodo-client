import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//--------------------------------------------- filter --------------------------------//

export interface Filter {
    date:boolean,
    priority:number,
    completed:boolean
  }

  interface pathFilter{
    sort?: string,
    priority?: number,
    completed?: boolean
  }

export  interface RouterType {
    navigate: (options: {
      to: "/" | "/dashboard" | "/login"
      search?: 
        | true  // Keep existing params
        | ((prev: Record<string, unknown>) => Record<string, unknown>)
        | {
            completed?: boolean
            priority?: number
            sort?: string
          }
    }) => Promise<void>
    
    state: {
      location: {
        pathname: string
        search: {
          completed?: boolean
          priority?: number
          sort?: string
        }
      }
    },
    latestLocation:{
        search: {
          completed?: boolean
          priority?: number
          sort?: string
        
      }
    }
    // Other methods...
  }

export const handlePath = (
  key: keyof Filter | React.ChangeEvent<HTMLSelectElement>,
  router:RouterType
) => {
  
  // Get current search params from URL
  const currentParams = router.latestLocation.search  ;
  

  const navigateWithToggle = (newParams: Partial<pathFilter>) => {
    const finalParams = { ...currentParams };
    console.log(finalParams);
    
    // Toggle logic
    Object.entries(newParams).forEach(([key, value]) => {
      if (finalParams[key as keyof pathFilter] === value) {
        delete finalParams[key as keyof pathFilter];
      }else if(typeof value == "number" && value<=0){
        delete finalParams[key as keyof pathFilter];
      } else {
        switch (key) {
        case "sort":
          if (typeof value === "string") finalParams.sort = value;
          break;
        case "priority":
          if (typeof value === "number") finalParams.priority = value;
          break;
        case "completed":
          if (typeof value === "boolean") finalParams.completed = value;
          break;
      }
      }
    });

    router.navigate({
      to: "/dashboard",
      search: finalParams,
    });

    console.log("Navigation params:", finalParams);
  };

  if (typeof key === "object") {
    const priority = Number(key.target?.value);
      navigateWithToggle({ priority });
  } else if (key === "completed") {
    navigateWithToggle({ completed: true });
  } else {
    navigateWithToggle({ sort: "createdAt" });
  }
};


export const handleFilter = (filter: {
  priority?: number | undefined;
  completed?: boolean | undefined;
  sort?: string | undefined;
}, setFilter:(filter:Filter)=>void) =>{
  const newFilter = {
    date:filter.sort?true:false,
    completed:filter.completed?true:false,
    priority:filter.priority?filter.priority:0
  }  
  console.log(newFilter);
  
  setFilter(newFilter)
  
} 

//------------------------------------- fatching ----------------------------------------//


export interface Task {
    completed: boolean,
    createdAt: string
    priority: number
    task: string
    _id: string
    color?: string;
  }

const colors:string[] = ["#e3ebfc","#FBF0E4","#E4F6FC","#FCE4E4","#E7E4FC","#FCE4F5"]


const fetchData = async (search:Filter) => {

    const params = {
      ...(search.date ?{ sort: "asc" }:{}),
      ...(search.priority > 0 ? { priority: search.priority }:{}),
      ...(search.completed ? { completed: search.completed } : {}),
    };
  
    console.log("params ",params);
    

    const response = await axios.get('http://localhost:5000/tasks', {
      params,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2YyNjFhMDg2YWYxOWViMTgyZDk2N2UiLCJ1c2VybmFtZSI6Im5pa2FuaWthIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ0MDIyNTA4LCJleHAiOjE3NDQwMjYxMDh9.l0iVjRfBFM2BWAI7Fuyyvm73SHfGoTprLaijTUISIR4`,  
      },
    });
    console.log("response",response);
    
    const  data = response.data.map((item:Task)=>{return {...item,color:colors[Math.floor(Math.random() * colors.length)]}})
    return data;
  };

 export const useFetchData = ({ filter }:{filter:Filter}) => {
    return useQuery<Task[], Error>({
      queryKey: ["data", filter.date, filter.priority, filter.completed],
      queryFn: () => fetchData(filter),
    });
  };