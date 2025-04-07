import { memo } from 'react'
import { Task } from '../../../features/dahsboardTasks'
import TaskBox from './TaskComp'

interface tasksBoxs { 
    data: Task[] | undefined;
    isLoading: boolean;
    error: Error | null;
  }

const TasksBoxs = memo(({data,isLoading,error}:tasksBoxs) => {
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
          <TaskBox key={Tasks._id} task={Tasks} />
        )})
        :
        "No task found"
        }
        
    
      </div>
  )
})

export default TasksBoxs