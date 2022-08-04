import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList/ProjectList";

function Dashboard() {
  const { document, error } = useCollection("projects");
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {document && <ProjectList projects={document} />}
    </div>
  );
}

export default Dashboard;
