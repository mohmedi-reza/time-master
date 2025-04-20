import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfilePage from "../pages/dashboard/Profile";
import ReportPage from "../pages/dashboard/Report";
import { checkAuth } from "../services/authService";
import ProtectedRoute from "./ProtectedRoute";
import RedirectAuthenticatedRoute from "./RedirectAuthenticatedRoute";
import HomePage from "../pages/dashboard/Home";
import ConnectionPage from "../pages/dashboard/Connections";
import MeetingPage from "../pages/dashboard/Meeting";
import SettingPage from "../pages/dashboard/Setting";
import CalenderPage from "../pages/dashboard/Calender";
import FinancialPage from "../pages/dashboard/Financial";
import TaskPage from "../pages/dashboard/Tasks";
import ProjectDetailsPage from "../pages/projects/ProjectDetails";
import LandingPage from "../pages/public/Landing/LandngPage";
import WorkspaceSettings from "../pages/settings/WorkspaceSettings";

const DashboardLayout = React.lazy(() => import("../layouts/DashboardLayout"));
const PublicLayout = React.lazy(() => import("../layouts/PublicLayout"));
const LoginPage = React.lazy(() => import("../pages/auth/Login"));
const RegisterPage = React.lazy(() => import("../pages/auth/Register"));
const NotFoundPage = React.lazy(() => import("../pages/public/NotFoundPage"));

const TimeTrackerPage = React.lazy(
  () => import("../pages/dashboard/TimeTracker")
);
const GroupPage = React.lazy(() => import("../pages/dashboard/Group"));
const ClientsPage = React.lazy(() => import("../pages/clients"));
const ClientDetailPage = React.lazy(() => import("../pages/clients/[id]"));
const TagPage = React.lazy(() => import("../pages/dashboard/Tag"));
const ProjectPage = React.lazy(() => import("../pages/dashboard/Project"));

const AppRouter = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, [setIsAuthenticated]);

  if (isAuthenticated === undefined) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/auth" element={<PublicLayout />}>
        <Route
          path="login"
          element={
            <RedirectAuthenticatedRoute>
              <LoginPage />
            </RedirectAuthenticatedRoute>
          }
        />
        <Route
          path="register"
          element={
            <RedirectAuthenticatedRoute>
              <React.Suspense fallback={<span className="loading loading-infinity loading-lg"></span>}>
                <RegisterPage />
              </React.Suspense>
            </RedirectAuthenticatedRoute>
          }
        />
        {/* Add more auth routes like register, forgot-password, etc. */}
      </Route>

      {/* Protected Dashboard Routes */}
      <Route
        path="/me"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="time-tracker" element={<TimeTrackerPage />} />
        <Route path="reports" element={<ReportPage />} />
        <Route path="groups" element={<GroupPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="clients/:id" element={<ClientDetailPage />} />
        <Route path="financial" element={<FinancialPage />} />
        <Route path="tags" element={<TagPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="connection" element={<ConnectionPage />} />
        <Route path="meeting" element={<MeetingPage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route path="setting/workspaces" element={<WorkspaceSettings />} />
        <Route path="calendar" element={<CalenderPage />} />
        <Route path="tasks" element={<TaskPage />} />
        <Route path="project" element={<ProjectDetailsPage />} />
      </Route>

      {/* Redirect based on auth status */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/me" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRouter;
