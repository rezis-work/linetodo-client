import { memo, useState } from "react";
import calendar from "../../assets/tasks/calendar.png";
import settings from "../../assets/tasks/settings.png";
import check from "../../assets/tasks/check.png";
import TaskSettingBox from "./TaskSettingBox";

interface Task {
  id: number;
  date: string;
  title: string;
  completed: boolean;
  priority: number;
  color?: string;
}

export const TaskBox = memo(({ task }:{ task:Task}) => {
  const [openSettings,setOpenSettings] = useState<boolean>(false);
  const handleClick = () => {
    console.log("Task clicked:", task.id);
    setOpenSettings(!openSettings);
    
  }

  return (
    <div
      style={{
        breakInside: "avoid",
        backgroundColor: task.color,
      }}
      className={`p-4 rounded-lg shadow-md h-min w-full sm:w-[252px] mb-[1.5rem] relative `}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-gray-700 font-medium bg-[#fff] rounded-[20px] px-3 py-[4px] w-fit">
          <img className="w-[18px] h-[18px] " src={calendar} alt="calendar" />
          <p className="text-[14px] leading-4 ">{task.date}</p>
        </div>
        <div className="flex gap-4 items-center" >
          <div className="w-[18px] h-[18px] border-[2px] rounded-[4px] relative " > 
            <img src={check} alt="check" className={` w-[20px] h-[20px] max-w-[20px] absolute translate-x-[-45%] left-[50%]  translate-y-[-50%] top-[50%] ${!task.completed && "hidden"} `}  />
          </div>
          <p className="text-[20px] leading-[18px] font-semibold ">{task.priority}</p>
        </div>
      </div>
      <p className="mt-3.5 text-gray-600">{task.title}</p>
      <div className="flex justify-end mt-6">
        <img src={settings} alt="settings" onClick={handleClick} />
      </div>
      <TaskSettingBox openSettings={openSettings} setOpenSettings={setOpenSettings} />
    </div>
  );
});

export default TaskBox;
