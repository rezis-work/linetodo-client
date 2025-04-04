
function taskBox(task: any) {
  return (
    <div
          style={{
            breakInside:"avoid",
          }} 
          className={`p-4 rounded-lg shadow-md ${task.color} h-min w-[252px] mb-[1.5rem] `}>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <span>{task.date}</span>
            </div>
            <p className="mt-2 text-gray-600">{task.content}</p>
          </div>
  )
}

export default taskBox