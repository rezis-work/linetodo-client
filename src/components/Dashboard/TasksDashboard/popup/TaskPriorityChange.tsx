/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@tanstack/react-form'
import { popUpOpen, Task } from '../../../../types/dashboardTasksTypes'
import { onPopUpClose, onEditPopUpCreate } from '../../../../features/dahsboardTasks'

function TaskPriorityChange({popUp,setPopUp,setTasks}:{popUp:popUpOpen,setPopUp:(popUp:popUpOpen)=>void,setTasks:(tasks:Task[]|((prev:Task[]|undefined)=>Task[]))=> void}) {

    const form = useForm<{priority:number}, any, any, any, any, any, any, any, any, any>({
              defaultValues:{
                priority: popUp.taskData?popUp.taskData.priority:1,
              },
    
              onSubmit: ({ value }) => {
                
                onEditPopUpCreate({value,id:popUp.taskData?._id,setPopUp,setTasks})
                  onPopUpClose(setPopUp)
                }
              
              
})

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{popUp.content?.includes("add")?'Create New Task':"Edit Task"}</h2>
            
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  void form.handleSubmit()
                }}
              >

    
                <div className="mb-4">
                  <form.Field
                    name="priority"
                    children={(field) => (
                      <>
                        <label className="block text-sm font-medium mb-1">
                          Priority
                        </label>
                        <select
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(Number(e.target.value))}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
    
    
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={()=>{onPopUpClose(setPopUp)}}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {popUp.content?.includes("add")?"Create Task":"Edit Task"}
                  </button>
                </div>
              </form>
          </div>
  )
}

export default TaskPriorityChange