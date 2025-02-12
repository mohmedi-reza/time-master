import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <div>Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Suspense fallback={<div>Loading protected content...</div>}>
      {children ? <>{children}</> : <Outlet />}
    </Suspense>
  );
};

export default ProtectedRoute;
