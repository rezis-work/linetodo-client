import React from "react";
import FilterCopm from "./FilterComp";
import { Filter, RouterType } from "../../../features/dahsboardTasks";

interface filtersBox {
  filters:Filter,
  router:RouterType
}

export const FiltersBox : React.FC<filtersBox> = ({filters,router}) => {
  return (
    <div className="flex justify-around mb-[24px] md:mb-0 md:justify-center md:gap-[6px]  ">
      <FilterCopm filters={filters} type={"date"} router={router} />
      <FilterCopm filters={filters} type={"priority"} router={router} />
      <FilterCopm filters={filters} type={"completed"} router={router} />
    </div>
  );
}

