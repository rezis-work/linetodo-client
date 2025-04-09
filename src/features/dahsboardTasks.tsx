import axios from "axios";
import { Filter, pathFilter, popUpOpen, RouterType, Task } from "../types/dashboardTasksTypes";
import { QueryObserverResult } from "@tanstack/react-query";

//--------------------------------------------- filter --------------------------------//



export const handlePath = (
  key: keyof Filter | React.ChangeEvent<HTMLSelectElement>,
  router:RouterType
) => {
  
  // Get current search params from URL
  const currentParams = router.latestLocation.search  ;
  

  const navigateWithToggle = (newParams: Partial<pathFilter>) => {
    const finalParams = { ...currentParams };
    
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
  
  setFilter(newFilter)
  
} 

//------------------------------------- fatching ----------------------------------------//




const colors:string[] = ["#e3ebfc","#FBF0E4","#E4F6FC","#FCE4E4","#E7E4FC","#FCE4F5"]


export const fetchData = async (search:Filter) => {

    const params = {
      ...(search.date ?{ sort: "asc" }:{}),
      ...(search.priority > 0 ? { priority: search.priority }:{}),
      ...(search.completed ? { completed: search.completed } : {}),
    };
  
    try{

    const response = await axios.get('http://localhost:5000/tasks', {
      params,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2YyNjFhMDg2YWYxOWViMTgyZDk2N2UiLCJ1c2VybmFtZSI6Im5pa2FuaWthIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ0MjM2OTA1LCJleHAiOjE3NDQyNDA1MDV9.TpUErHuN3J3fj6FgVpg7Y97iFOp_HfVmCZgBKCDep-c`,  
      },
    });
    
    const  data = response.data.map((item:Task)=>{return {...item,color:colors[Math.floor(Math.random() * colors.length)]}})
    return data;
    }catch(err){
      console.log(err);
      
    }
  };
//------------------------------------------- TaskSettingBox ----------------------------------------------------------//

export const handleSettingsButtons = ({setPopUp,setOpenSettings,task,content,setTasks}:{setPopUp:(popUp:popUpOpen)=>void,setOpenSettings:(openSettings:boolean)=>void,task: Task,content:string|null,setTasks:(tasks:Task[]|((prev:Task[]|undefined)=>Task[]))=> void})=>{
  
  if(content == "Delete"){
    deleteData(task._id,setTasks)
  }else if(content == "Complete"){
    const changeCompleted = {completed:!task.completed}
    updateData(changeCompleted,task._id,setTasks)
  }else{
    setPopUp({open:true,content,taskData:task})
  }
  setOpenSettings(false)
}

//------------------------------------------- addTask -----------------------------------------------------------------//

export const postData = async (task: Task) => {

  try{
    await axios.post('http://localhost:5000/tasks', 
      task,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2YyNjFhMDg2YWYxOWViMTgyZDk2N2UiLCJ1c2VybmFtZSI6Im5pa2FuaWthIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ0MjM2OTA1LCJleHAiOjE3NDQyNDA1MDV9.TpUErHuN3J3fj6FgVpg7Y97iFOp_HfVmCZgBKCDep-c`,  
        },
      }
    );
  }catch(err){
    console.log(err);
  }
  
};

export const onPopUpClose = (setPopUp:(popUp:popUpOpen)=>void)=>{
  setPopUp({open:false,content:""})
}

export const onAddPopUpCreate = async ({value,setPopUp,refetch}:{value:Task,setPopUp:(popUp:popUpOpen)=>void,refetch:() => Promise<QueryObserverResult<Task[], Error>>}) => {
        await postData(value);
        refetch()
        onPopUpClose(setPopUp);
}

//------------------------------------ editTask --------------------------------------------------//

export const updateData = async (task: Task|{priority:number}|{ completed: boolean; },id:string|undefined,setTasks:(tasks:Task[]|((prev:Task[]|undefined)=>Task[]))=> void) => {
  
  try{
    await axios.patch(`http://localhost:5000/tasks/${id}`, 
      task,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2YyNjFhMDg2YWYxOWViMTgyZDk2N2UiLCJ1c2VybmFtZSI6Im5pa2FuaWthIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ0MjM2OTA1LCJleHAiOjE3NDQyNDA1MDV9.TpUErHuN3J3fj6FgVpg7Y97iFOp_HfVmCZgBKCDep-c`,  
        },
      }
    )
    const updatedTask = {...task};
    if ('color' in updatedTask && !updatedTask.color) {
        updatedTask.color = "#FBF0E4";
    }
    
    setTasks((prev: Task[]|undefined) => {
      
      const newTasks = prev ? prev.map(t => t._id === id ? { ...t, ...updatedTask } : t) : [];
      
      return newTasks
    });
  }catch(err){
    console.log(err);
  }
  
};

export const onEditPopUpCreate = ({value,id,setPopUp,setTasks}:{value:Task|{priority:number},id:string|undefined,setPopUp:(popUp:popUpOpen)=>void,setTasks:(tasks:Task[]|((prev:Task[]|undefined)=>Task[]))=> void}) => {
  updateData(value,id,setTasks);  
  onPopUpClose(setPopUp);
}

//------------------------------------------- delete task ------------------------------------------------------//

export const deleteData = async (id:string|undefined,setTasks:(tasks:Task[]|((prev:Task[]|undefined)=>Task[]))=> void) => {
  
  try{
    await axios.delete(`http://localhost:5000/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2YyNjFhMDg2YWYxOWViMTgyZDk2N2UiLCJ1c2VybmFtZSI6Im5pa2FuaWthIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ0MjM2OTA1LCJleHAiOjE3NDQyNDA1MDV9.TpUErHuN3J3fj6FgVpg7Y97iFOp_HfVmCZgBKCDep-c`,  
        },
      }
    )

    setTasks((prev)=>{
      return prev? prev.filter(i => i._id != id):[]
    })  
  }catch(err){
    console.log(err);
  }
  
};

