import { Link } from "react-router-dom";
import "./Navbar.css";

import Temple from "../../assets/temple.svg";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
function Navbar() {
  const { logout, error, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="Temple" />
          <span>Dojo</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging Out
              </button>
            )}
            {error && <div className="error">{error}</div>}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
