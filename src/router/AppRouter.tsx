import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { checkAuth } from "../services/authService";
import ProtectedRoute from "./ProtectedRoute";

const DashboardLayout = React.lazy(() => import("../layouts/DashboardLayout"));
const PublicLayout = React.lazy(() => import("../layouts/PublicLayout"));
const HomePage = React.lazy(() => import("../pages/dashboard/Home"));

const LoginPage = React.lazy(() => import("../pages/auth/Login"));
const NotFoundPage = React.lazy(() => import("../pages/public/NotFoundPage"));

const AppRouter = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, [setIsAuthenticated]);

  if (isAuthenticated === undefined) {
    return <div>Loading authentication...</div>;
  }

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="settings" element={<HomePage />} />
            <Route path="profile" element={<HomePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
