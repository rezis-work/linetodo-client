import { useState } from "react";

export default function Dashboard() {

  type Task = {
    id: number;
    date: string;
    content: string;
  };
  
  const initialTasks: Task[] = [
    { id: 2, date: "4/03/2024", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim" },
    { id: 6, date: "30/02/2024", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim"},
    { id: 1, date: "5/03/2024", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: 1, date: "5/03/2024", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: 3, date: "3/03/2024", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: 3, date: "3/03/2024", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: 5, date: "1/03/2024", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: 5, date: "1/03/2024", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: 4, date: "2/03/2024", content: "Lorem ipsum dolor sit amet, consectetur"},
  ];
  
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
  

  return (
    <section className="w-full p-[30px] min-h-full bg-gray-100 flex flex-col items-center " >

      <div
      style={{
        columnCount: 3,
        columnGap: "1.5rem", 
        maxWidth: "1080px",
      }} 
      >
        {tasks.map((task) => (
          <>
          </>
        ))}
      </div>
    </section>
  )
}
