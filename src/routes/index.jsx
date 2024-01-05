import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const RouteUnAuth = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

const RouteAuth = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

const RoutesPage = () => {
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    //TODO: API Ready change logic with API
    if (isAuth) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return <>{isAuth ? <RouteAuth /> : <RouteUnAuth />}</>;
};

export default RoutesPage;
