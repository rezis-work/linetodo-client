import addTask from "../../../assets/tasks/addTask.png";

import { memo } from 'react'
import { popUpOpen } from "../../../types/dashboardTasksTypes";

const AddTaskButton = memo(({setPopUp}:{setPopUp:(popUp:popUpOpen)=>void}) => {
  return (
    <button
            className=" w-full md:w-[570px] flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 mb-6"
            onClick={()=>{setPopUp({open:true,content:"addTask"})}}
              >
              <img src={addTask} alt="add" className="w-4 h-4" />
              Add a task
            </button>
  )
})

export default AddTaskButton