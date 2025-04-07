/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import AddTaskButton from './AddTaskButton'
import { FiltersBox } from './FiltersBox'
import { Filter } from '../../../features/dahsboardTasks'

interface dashboardTasksHead {
  filters:Filter,
  router:any
}

const DashboardTasksHead = memo(({filters,router}:dashboardTasksHead) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:gap-[10px] max-w-[1080px] md:justify-between" >
        <AddTaskButton/>
        <FiltersBox filters={filters} router={router} />
      </div>
  )
})

export default DashboardTasksHead