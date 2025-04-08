import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RedirectAuthenticatedRouteProps {
  children: React.ReactNode;
}

const RedirectAuthenticatedRoute: React.FC<RedirectAuthenticatedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

export default RedirectAuthenticatedRoute;
