import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfilePage from "../pages/dashboard/Profile";
import ReportPage from "../pages/dashboard/Report";
import { checkAuth } from "../services/authService";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/dashboard/Home";
import ConnectionPage from "../pages/dashboard/Connections";
import MeetingPage from "../pages/dashboard/Meeting";
import SettingPage from "../pages/dashboard/Setting";
import CalenderPage from "../pages/dashboard/Calender";
import FinancialPage from "../pages/dashboard/Financial";
import TaskPage from "../pages/dashboard/Tasks";
import ProjectDetailsPage from "../pages/projects/ProjectDetails";
import LandingPage from "../pages/public/Landing/LandngPage";

const DashboardLayout = React.lazy(() => import("../layouts/DashboardLayout"));
const PublicLayout = React.lazy(() => import("../layouts/PublicLayout"));
const LoginPage = React.lazy(() => import("../pages/auth/Login"));
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
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Navigate to="/me" replace />} />
          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* <Route index element={<Navigate to="/dashboard/not-found-page" replace />} /> */}
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
            <Route path="calendar" element={<CalenderPage />} />
            <Route path="tasks" element={<TaskPage />} />
            <Route path="not-found-page" element={<NotFoundPage />} />
            <Route path="project" element={<ProjectDetailsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard/not-found-page" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
