import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, error, isPending } = useSignup();

  const handleChange = (e) => {
    setThumbnail(null);
    const selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("File must be an image");
      return;
    }
    if (!selected.size > 100000) {
      setThumbnailError("Image size must be at less than 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      <label>
        <span>Avatar: </span>
        <input type="file" required onChange={handleChange} />
      </label>
      {!isPending && <button className="btn">Signup</button>}
      {isPending && <button className="btn">Loading...</button>}
      {error && <button className="error">{error}</button>}
    </form>
  );
}

export default Signup;
