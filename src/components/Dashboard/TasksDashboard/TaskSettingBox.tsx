import { memo } from 'react'
import importance from "../../../assets/tasks/Settings/importance.png" 
import Complete from "../../../assets/tasks/Settings/Complete.png"
import edit from "../../../assets/tasks/Settings/edit.png"
import Dellete from "../../../assets/tasks/Settings/delete.png"
import { popUpOpen, Task } from '../../../types/dashboardTasksTypes'
import { handleSettingsButtons } from '../../../features/dahsboardTasks'

const TaskSettingBox = memo(({openSettings,setPopUp,setOpenSettings,task,setTasks}:{openSettings:boolean,setPopUp:(popUp:popUpOpen)=>void,setOpenSettings:(openSettings:boolean)=>void,task: Task,setTasks:(tasks:Task[]|((prev:Task[]|undefined)=>Task[]))=> void}) =>{

    const settings = [
        {
            icon:importance,
            title:"importance",
        },
        {
            icon:Complete,
            title:"Complete",
        },
        {
            icon:edit,
            title:"Edit",
        },
        {
            icon:Dellete,
            title:"Delete",
        }
    ]


  return (
    <div className={` flex-col w-[188px] sm:w-[192px] z-[20] bg-[#fff] px-[14px] py-[8px]  ${!openSettings && "hidden"} absolute bottom-0 translate-y-[95%] right-[14px] rounded-[8px] `} >
        {settings.map((setting,index) => {
            const content = setting.title == "Edit"?"editTask":setting.title 
            return(
            <div key={index} className={` flex items-center gap-[10px] pb-[10px] mt-[10px] cursor-pointer ${index != settings.length-1 && "border-b-[1px] border-b-[#E8E9EB] "} `} onClick={()=>{handleSettingsButtons({setPopUp,setOpenSettings,task,content,setTasks})}} >
                <img src={setting.icon} alt={setting.title} className="w-[18px] h-[18px]" />
                <p className="text-[14px] font-normal text-gray-600">{setting.title}</p>
            </div>
        )})}

    </div>
  )
})

export default TaskSettingBox