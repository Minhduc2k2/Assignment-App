import { useNavigate } from "react-router-dom";
import Avatar from "../../../../components/Avatar/Avatar";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useFireStore } from "../../../../hooks/useFireStore";
import "./ProjectSummary.css";

function ProjectSummary({ project }) {
  const { deleteDocument } = useFireStore("projects");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  //! Không cần sử dụng async vì không cần phải đợi xoá xong mới chuyển hướng. Vì xoá xong mới chuyển hướng sẽ gây ra lỗi
  const handleClick = () => {
    deleteDocument(project.id);
    navigate("/");
  };
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          <span>Project is created by</span>
          <Avatar src={project.createBy.photoURL} />
        </p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as complete
        </button>
      )}
    </div>
  );
}

export default ProjectSummary;
