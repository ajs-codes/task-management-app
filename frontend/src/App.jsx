import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Error404 from "./components/Error404";
import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-task"
              element={
                <PrivateRoute>
                  <AddTask />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-task/:id"
              element={
                <PrivateRoute>
                  <EditTask />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
