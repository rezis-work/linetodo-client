import { memo } from 'react'
import TaskBox from './TaskComp'
import { Task, tasksBoxs } from '../../../types/dashboardTasksTypes'



const TasksBoxs = memo(({data,isLoading,error,setPopUp,setTasks}:tasksBoxs) => {
  return (
    <div
      className={`${data &&  data.length > 0?"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4":"flex justify-center"} sm:w-fit w-full max-w-[1080px]`} 
      >
        {isLoading && !error?
        "Loading..." 
        :
        data &&  data.length > 0?
        data?.map((Tasks:Task) => {
          return(
          <TaskBox key={Tasks._id} task={Tasks} setPopUp={setPopUp} setTasks={setTasks} />
        )})
        :
        "No task found"
        }
        
    
      </div>
  )
})

export default TasksBoxs