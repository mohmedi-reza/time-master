import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SpinnerLoading from "../components/common/SpinnerLoading";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return (
      <div className="flex flex-1 w-screen h-screen justify-center items-center">
        <SpinnerLoading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 w-screen h-screen justify-center items-center">
          <SpinnerLoading />
        </div>
      }
    >
      {children ? <>{children}</> : <Outlet />}
    </Suspense>
  );
};

export default ProtectedRoute;
