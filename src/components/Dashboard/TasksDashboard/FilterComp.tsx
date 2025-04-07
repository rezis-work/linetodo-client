import { memo } from 'react'

import check from "../../../assets/tasks/check.png";
import { type Filter, handlePath, RouterType } from '../../../features/dahsboardTasks';

interface filterComp {
  filters:Filter,
  type:keyof Filter,
  router:RouterType
}

const FilterCopm = memo(({filters,type,router}:filterComp) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer relative ">
      {type == "priority"?
      <>
      <select
      id="dropdown"
      onChange={(e)=>handlePath(e,router)}      >
        {Array.from({ length: 11 }).map((_, index) => (
        <option key={index} value={index}>{index}</option>
      ))}
    </select>
      <span className="text-black">Priority</span>
      </>
      :
      <>
        <input
          type="checkbox"
          checked={type == "date"?filters.date:filters.completed}
          onChange={() => handlePath(type,router)}
          className="appearance-none w-5 h-5 border border-black rounded-sm"
        />
        <img src={check} alt="check" className={` w-5 h-5 max-w-[20px] absolute  left-[0]  translate-y-[-50%] top-[50%] ${type == "date"?!filters.date && "hidden":!filters.completed && "hidden"} `}  />

        <span className="text-black">{type == "date"?"Date":"Completed"}</span>
        </>
    }
    </label>

  )
})

export default FilterCopm