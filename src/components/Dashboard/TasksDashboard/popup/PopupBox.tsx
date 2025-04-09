import { QueryObserverResult } from '@tanstack/react-query'
import { popUpOpen, Task } from '../../../../types/dashboardTasksTypes'
import AddEditTask from './AddEditTask'
import TaskPriorityChange from './TaskPriorityChange'

export function PopupBox ({setPopUp,popUp,refetch,setTasks}:{setPopUp:(popUp:popUpOpen)=>void,popUp:popUpOpen,refetch:() => Promise<QueryObserverResult<Task[], Error>>,setTasks:(tasks:Task[]|((prev:Task[]|undefined)=>Task[]))=> void}) {

  


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" >
      {/* <button className='text-green-300 bg-red-600' onClick={()=>{setPopUp({open:false,content:""})}} >asdasf</button> */}
        {
          popUp.content?.includes("Task")?
          (
            <AddEditTask  popUp={popUp} setPopUp={setPopUp} refetch={refetch} setTasks={setTasks} />
          )
          :
          (
            <TaskPriorityChange popUp={popUp} setPopUp={setPopUp} setTasks={setTasks} />
          )
        }
    </div>
  )
}

export default PopupBox