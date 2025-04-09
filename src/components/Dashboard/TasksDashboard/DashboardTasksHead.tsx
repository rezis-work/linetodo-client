import { memo } from 'react'
import AddTaskButton from './AddTaskButton'
import { FiltersBox } from './FiltersBox'
import { dashboardTasksHead } from '../../../types/dashboardTasksTypes'



const DashboardTasksHead = memo(({filters,router,setPopUp}:dashboardTasksHead) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:gap-[10px] sm:gap-[6px] max-w-[1080px] md:justify-between" >
        <AddTaskButton setPopUp={setPopUp}  />
        <FiltersBox filters={filters} router={router} />
      </div>
  )
})

export default DashboardTasksHead