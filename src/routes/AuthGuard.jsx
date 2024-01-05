/* eslint-disable react/prop-types */

import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedPage({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function UnProtectedPage({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    // back to previous page
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
}
