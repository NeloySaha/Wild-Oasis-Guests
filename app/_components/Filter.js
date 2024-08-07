"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import FilterButton from "./FilterButton";

function Filter() {
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const router = useRouter();
  const currentCapacity = searchParams.get("capacity") ?? "all";
  const filters = [
    { capacity: "all", text: <>All Cabins</> },
    { capacity: "small", text: <>1&mdash;3 guests</> },
    { capacity: "medium", text: <>4&mdash;7 guests</> },
    { capacity: "large", text: <>8&mdash;12 guests</> },
  ];

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.push(currentPath + "?" + params.toString(), { scroll: false });
  };

  return (
    <div className="flex justify-end">
      <div className="flex mb-8 border border-primary-800">
        {filters.map((filter) => (
          <FilterButton
            key={filter.capacity}
            filter={filter.capacity}
            handleFilter={handleFilter}
            currentCapacity={currentCapacity}
          >
            {filter.text}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}

export default Filter;
