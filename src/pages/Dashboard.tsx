import { useEffect, useState } from "react";
import "../index.css";
import TaskBox from "../components/Dashboard/TaskBox";

interface Task {
  id: number;
  date: string;
  title: string;
  completed: boolean;
  priority: number;
  color?: string;
}

export default function Dashboard() {

  const colors:string[] = ["#E3EBFC","#FBF0E4","#E4F6FC","#FCE4E4","#E7E4FC","#FCE4F5"]
  const initialTasks: Task[] = [
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
  ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);  

  return (
    <section className="w-full p-[30px] min-h-full bg-gray-100 flex flex-col items-center " >

      <div
      
      className="responsive-columns " 
      >
        {tasks.map((Tasks) => {
          const task = {...Tasks};
          task.color = colors[Math.floor(Math.random() * colors.length)];

          return(
          <TaskBox key={task.id} task={task} />
        )})}
      </div>
    </section>
  )
}
