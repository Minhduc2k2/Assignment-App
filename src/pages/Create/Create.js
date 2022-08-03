import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { timestamp } from "../../firebase/config";
import "./Create.css";
import { useFireStore } from "../../hooks/useFireStore";
import { useNavigate } from "react-router-dom";
//? Categories Value
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

function Create() {
  //? Form Value
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);

  //? AssignedUser Value
  const { document } = useCollection("users");
  const [users, setUsers] = useState([]);

  //? Form Error
  const [formError, setFormError] = useState(null);

  //? Logging in User
  const { user } = useAuthContext();

  //? Project Collection
  const { response, addDocument } = useFireStore("projects");
  const navigate = useNavigate();

  useEffect(() => {
    if (document) {
      const options = document.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [document]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!category) {
      setFormError("Please select a category");
      return;
    }
    if (assignedUsers.length === 0) {
      setFormError("Please select at least one user");
      return;
    }

    const createBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createBy,
      assignedUsersList,
    };
    console.log(project);

    await addDocument(project);
    if (!response.error) {
      navigate("/");
    }
  };
  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            required
          />
        </label>
        <label>
          <span>Project Due Date:</span>
          <input
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Project Assigned Users:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        {formError && <p className="error">{formError}</p>}
        <button className="btn">Add Project</button>
      </form>
    </div>
  );
}

export default Create;
