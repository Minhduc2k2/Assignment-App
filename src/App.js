import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Project from "./pages/Project/Project";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import OnlineUsers from "./components/OnlineUsers/OnlineUsers";
function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  (user && <Dashboard />) ||
                  (!user && <Navigate to="/login" replace />)
                }
              />
              <Route
                path="/create"
                element={
                  (user && <Create />) ||
                  (!user && <Navigate to="/login" replace />)
                }
              />
              <Route
                path="/project"
                element={
                  (user && <Project />) ||
                  (!user && <Navigate to="/login" replace />)
                }
              />
              <Route
                path="/login"
                element={
                  (!user && <Login />) || (user && <Navigate to="/" replace />)
                }
              />
              <Route
                path="/signup"
                element={
                  (!user && <Signup />) || (user && <Navigate to="/" replace />)
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </>
      )}
    </div>
  );
}

export default App;
