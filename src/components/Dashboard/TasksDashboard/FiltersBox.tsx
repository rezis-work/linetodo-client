import React from "react";
import FilterCopm from "./FilterComp";
import { filtersBox } from "../../../types/dashboardTasksTypes";



export const FiltersBox : React.FC<filtersBox> = ({filters,router}) => {
  return (
    <div className="flex justify-around mb-[24px] md:mb-0 md:justify-center md:gap-[6px] sm:gap-[4px]  ">
      <FilterCopm filters={filters} type={"date"} router={router} />
      <FilterCopm filters={filters} type={"priority"} router={router} />
      <FilterCopm filters={filters} type={"completed"} router={router} />
    </div>
  );
}

