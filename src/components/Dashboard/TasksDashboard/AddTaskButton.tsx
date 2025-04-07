import addTask from "../../../assets/tasks/addTask.png";

import { memo } from 'react'

const AddTaskButton = memo(() => {
  return (
    <button
            className=" w-full md:w-[570px] flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 mb-6"
              >
              <img src={addTask} alt="add" className="w-4 h-4" />
              Add a task
            </button>
  )
})

export default AddTaskButton