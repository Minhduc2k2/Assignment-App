import "./ProjectFilter.css";

const filters = ["all", "mine", "development", "design", "sales", "marketing"];
function ProjectFilter({ currentFilter, changeFilter }) {
  const handleFilter = (filter) => {
    changeFilter(filter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={filter === currentFilter ? "active" : ""}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default ProjectFilter;
