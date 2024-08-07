function FilterButton({ filter, handleFilter, currentCapacity, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 transition-all ${
        currentCapacity === filter && "bg-primary-700 text-primary-50"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default FilterButton;
