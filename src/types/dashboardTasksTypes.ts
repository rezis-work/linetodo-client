/* eslint-disable @typescript-eslint/no-explicit-any */

//-------------------------------------------------------- dashboardTasks ---------------------------------------------//

export interface Filter {
    date:boolean,
    priority:number,
    completed:boolean
  }

export  interface pathFilter{
    sort?: string,
    priority?: number,
    completed?: boolean
  }

export  interface RouterType {
    navigate: (options: {
      to: "/" | "/dashboard" | "/login"
      search?: 
        | true  // Keep existing params
        | ((prev: Record<string, unknown>) => Record<string, unknown>)
        | {
            completed?: boolean
            priority?: number
            sort?: string
          }
    }) => Promise<void>
    
    state: {
      location: {
        pathname: string
        search: {
          completed?: boolean
          priority?: number
          sort?: string
        }
      }
    },
    latestLocation:{
        search: {
          completed?: boolean
          priority?: number
          sort?: string
        
      }
    }
    // Other methods...
  }

//---------------------------------------- FilterComp -----------------------------------------------//

export interface filterComp {
  filters:Filter,
  type:keyof Filter,
  router:RouterType
}

//------------------------------------------------- dashboardTaskHead ----------------------------------------------//

export interface dashboardTasksHead {
  filters:Filter,
  router:any,
  setPopUp:(popUp:popUpOpen)=>void
}

//--------------------------------------------------- FilterBox ----------------------------------------------------//

export interface filtersBox {
  filters:Filter,
  router:RouterType
}

//--------------------------------------------------- fatching-TaskComp --------------------------------------------//

export interface Task {
    completed: boolean,
    createdAt?: string
    priority: number
    task: string
    _id?: string
    color?: string;
  }

//---------------------------------------------------- TaskBox ----------------------------------------------------//

export  interface tasksBoxs { 
      data: Task[] | undefined;
      isLoading: boolean;
      error: Error | null;
      setPopUp:(popUp:popUpOpen)=>void;
      setTasks:(tasks:Task[]|((prev:Task[]|undefined)=>Task[]))=> void
    }

//------------------------------------------------ PopUp ---------------------------------------------------------//

export interface popUpOpen {
  open:boolean,
  content:string|null,
  taskData?:Task
}

//-------------------------------------------------- AddEditTask---------------------------------------------------//

export interface TaskFormValues  {
        task: string
        priority: number
        completed: boolean
      }