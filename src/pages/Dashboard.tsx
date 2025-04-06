import { useEffect, useState } from "react";
import "../index.css";
import TaskBox from "../components/Dashboard/TaskBox";
import addTask from "../assets/tasks/addTask.png";
import check from "../assets/tasks/check.png";


interface Task {
  id: number;
  date: string;
  title: string;
  completed: boolean;
  priority: number;
  color?: string;
}

export default function Dashboard() {

  const colors:string[] = ["#e3ebfc","#FBF0E4","#E4F6FC","#FCE4E4","#E7E4FC","#FCE4F5"]
  const [initialTasks,setInitialTasks] = useState([
    { id: 1, date: "4/03/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dliqua. Ut enim", completed: false, priority: 1 },
    { id: 2, date: "30/02/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim", completed: true, priority: 2 },
    { id: 3, date: "5/03/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", completed: false, priority: 3 },
    { id: 4, date: "5/03/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labo commodo consequat.", completed: false, priority: 2 },
    { id: 5, date: "3/03/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", completed: true, priority: 1 },
    { id: 6, date: "3/03/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis ea commodo consequat.", completed: false, priority: 2 },
    { id: 7, date: "1/03/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vellamco laboris nisi ut aliquip ex ea commodo consequat.", completed: false, priority: 3 },
    { id: 8, date: "1/03/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqea commodo consequat.", completed: true, priority: 1 },
    { id: 9, date: "2/03/2024", title: "Lorem ipsum dolor sit amet, consectetur, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimboris nisi ut aliquip ex ea commodo consequat.", completed: false, priority: 2 },
    { id: 10, date: "2/03/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna  nisi ut aliquip ex ea commodo consequat.", completed: true, priority: 3 },
    { id: 11, date: "2/03/2024", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", completed: false, priority: 1 },
  ]);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [filters, setFilters] = useState({
    date: false,
    priority: false,
    completed: false,
  });

  const handleChange = (key: keyof typeof filters) => {
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [key]: !prev[key],
      };

      let filteredTasks = initialTasks;
console.log(filteredTasks);

      if (updatedFilters.date) {
        filteredTasks = filteredTasks.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split("/").map(Number);
          const [dayB, monthB, yearB] = b.date.split("/").map(Number);
        
          const dateA = new Date(yearA, monthA - 1, dayA); // month is 0-indexed
          const dateB = new Date(yearB, monthB - 1, dayB);
          
          return dateA.getTime() - dateB.getTime(); // Ascending order
        });
      }else{
        filteredTasks = filteredTasks.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split("/").map(Number);
          const [dayB, monthB, yearB] = b.date.split("/").map(Number);
          
          const dateA = new Date(yearA, monthA - 1, dayA); // month is 0-indexed
          const dateB = new Date(yearB, monthB - 1, dayB);
          
          console.log(dateA.getTime() > dateB.getTime());
        
          return dateB.getTime() - dateA.getTime(); // Ascending order
        });
      }

      if (updatedFilters.priority) {
        filteredTasks = filteredTasks.sort((a, b) => a.priority - b.priority);
      }else{
        filteredTasks = filteredTasks.sort((a, b) => b.priority - a.priority);
      }

      if (updatedFilters.completed) {
        filteredTasks = filteredTasks.filter((task) => task.completed);
      }

      setTasks(filteredTasks);
      return updatedFilters;
    });
  };

    useEffect(() => {
      
      const newTasks = initialTasks.map((task) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const Tasks = { ...task, color };
        return Tasks;
      });
      const sortedTasks = newTasks.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("/").map(Number);
        const [dayB, monthB, yearB] = b.date.split("/").map(Number);
      
        const dateA = new Date(yearA, monthA - 1, dayA); // month is 0-indexed
        const dateB = new Date(yearB, monthB - 1, dayB);
      
        return dateB.getTime() - dateA.getTime(); // Ascending order
      });      

      setTasks(sortedTasks)     
      setInitialTasks(sortedTasks) 
    }, []);


  return (
    <section className="w-full h-full p-[30px] min-h-full bg-gray-100 flex flex-col items-center " >

      <div className="w-full flex flex-col md:flex-row md:gap-[10px] max-w-[1080px] md:justify-between" >
        <button
        className=" w-full md:w-[570px] flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 mb-6"
          >
          <img src={addTask} alt="add" className="w-4 h-4" />
          Add a task
        </button>
        <div className="flex justify-around mb-[24px] md:mb-0 md:justify-center md:gap-[6px]  ">
      <label className="flex items-center gap-2 cursor-pointer relative ">
        <input
          type="checkbox"
          checked={filters.date}
          onChange={() => handleChange("date")}
          className="appearance-none w-5 h-5 border border-black rounded-sm"
        />
        <img src={check} alt="check" className={` w-5 h-5 max-w-[20px] absolute  left-[0]  translate-y-[-50%] top-[50%] ${!filters.date && "hidden"} `}  />

        <span className="text-black">Date</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer relative ">
        <input
          type="checkbox"
          checked={filters.priority}
          onChange={() => handleChange("priority")}
          className="appearance-none w-5 h-5 border border-black rounded-sm"
        />
        <img src={check} alt="check" className={` w-5 h-5 max-w-[20px] absolute  left-[0]  translate-y-[-50%] top-[50%] ${!filters.priority && "hidden"} `}  />
        <span className="text-black">Priority</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer relative">
        <input
          type="checkbox"
          checked={filters.completed}
          onChange={() => handleChange("completed")}
          className="appearance-none w-5 h-5 border border-black rounded-sm "
        />
        <img src={check} alt="check" className={`  w-5 h-5 max-w-[20px] absolute  left-[0]  translate-y-[-50%] top-[50%] ${!filters.completed && "hidden"} `}  />

        <span className="text-black">Completed</span>
      </label>
        </div>
      </div>

      <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit max-w-[1080px]" 
      >
        {tasks.map((Tasks) => {
          return(
          <TaskBox key={Tasks.id} task={Tasks} />
        )})}
      </div>
    </section>
  )
}
