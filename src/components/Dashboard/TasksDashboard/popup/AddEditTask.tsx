/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@tanstack/react-form'
import { useState } from 'react';
import {  popUpOpen, Task, TaskFormValues } from '../../../../types/dashboardTasksTypes';
import { onPopUpClose, onAddPopUpCreate, onEditPopUpCreate } from '../../../../features/dahsboardTasks';
import { QueryObserverResult } from '@tanstack/react-query';



function AddEditTask({popUp,setPopUp,refetch,setTasks}:{popUp:popUpOpen,setPopUp:(popUp:popUpOpen)=>void,refetch:() => Promise<QueryObserverResult<Task[], Error>>,setTasks:(tasks:Task[]|((prev:Task[]|undefined)=>Task[]))=> void}) {

    

    
    
    const [taskErr,setTaskErr] = useState(false)
      
        const form = useForm<TaskFormValues, any, any, any, any, any, any, any, any, any>({
          defaultValues:{
            task:popUp.taskData?popUp.taskData.task:'',
            priority: popUp.taskData?popUp.taskData.priority:1,
            completed: popUp.taskData?popUp.taskData.completed:false
          },

          onSubmit: ({ value }) => {
            if(!value.task){
                setTaskErr(true)
            }else{
              
              if(popUp.content?.includes("add")){
              onAddPopUpCreate({value,setPopUp,refetch})
              }else{
                onEditPopUpCreate({value,id:popUp.taskData?._id,setPopUp,setTasks})
              }
              onPopUpClose(setPopUp)
            }
          },
          
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
            <div className="mb-4 relative">
              <form.Field
                name="task"
                children={(field) => (
                  <>
                    <label className="block text-sm font-medium mb-1">
                      Task Content
                    </label>
                    <textarea
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${taskErr && "border-red-600"} outline-none `}
                      rows={3}
                    />
                  </>
                )}
              />
              {taskErr? <p className='absolute left-0 bottom-[-12px] text-red-600 text-[12px] ' >task content can not be empty</p>:null }
            </div>

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

            <div className="mb-4 flex items-center">
              <form.Field
                name="completed"
                children={(field) => (
                  <>
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <label className="ml-2 text-sm font-medium">
                      Completed
                    </label>
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

export default AddEditTask