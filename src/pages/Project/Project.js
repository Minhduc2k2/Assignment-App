import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";
import "./Project.css";

function Project() {
  const params = useParams();
  const { document, error } = useDocument("projects", params.id);
  console.log(document);
  return <div>{error && <div className="error">{error}</div>}</div>;
}

export default Project;
