import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "./components/ProjectFilter/ProjectFilter";
import "./Dashboard.css";
import { useAuthContext } from "../../hooks/useAuthContext";

function Dashboard() {
  const { document, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");

  const { user } = useAuthContext();
  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const filterDocuments = document?.filter((doc) => {
    switch (currentFilter) {
      case "all":
        return true;
      case "mine":
        return !!doc.assignedUsersList.find((u) => u.id === user.uid);
      case "development":
      case "sales":
      case "design":
      case "marketing":
        return currentFilter === doc.category;
      default:
        return true;
    }
  });

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {document && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {filterDocuments && <ProjectList projects={filterDocuments} />}
    </div>
  );
}

export default Dashboard;
