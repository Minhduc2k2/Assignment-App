import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";
import "./Project.css";
import ProjectSummary from "./components/ProjectSummary/ProjectSummary";
import ProjectComments from "./components/ProjectComments/ProjectComments";

function Project() {
  const params = useParams();
  const { document, error } = useDocument("projects", params.id);
  console.log(document);
  return (
    <div>
      {error && <div className="error">{error}</div>}
      {!document && <div className="loading">Loading...</div>}
      {document && (
        <div className="project-details">
          <ProjectSummary project={document} />
          <ProjectComments project={document} />
        </div>
      )}
    </div>
  );
}

export default Project;
