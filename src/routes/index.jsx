import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { ProtectedPage, UnProtectedPage } from "./AuthGuard";

function RoutePage() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <UnProtectedPage>
            <Login />
          </UnProtectedPage>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedPage>
            <Dashboard />
          </ProtectedPage>
        }
      />
    </Routes>
  );
}

export default RoutePage;
