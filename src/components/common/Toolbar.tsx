import React, { useEffect, useState } from "react";
import Icon from "./icon/icon.component";
import WorkspaceSelector from "./toolbar/WorkspaceSelector";
import UserProfile from "./toolbar/UserProfile";
import ErrorBoundary from "./ErrorBoundary";
import ThemeSelector from "./toolbar/ThemeSelector";
import LanguageSwitcher from "../../utils/LanguageSwitcher";
import { Workspace, UserData } from "./toolbar/types";
import { logout } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface ToolbarProps {
  workspaces?: Workspace[];
  selectedWorkspace?: string;
  onWorkspaceChange?: (workspaceId: string) => void;
  onAddWorkspace?: () => void;
  userData?: UserData;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
  isLoading?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  workspaces: externalWorkspaces,
  selectedWorkspace: externalSelectedWorkspace,
  onWorkspaceChange: externalOnWorkspaceChange,
  onAddWorkspace: externalOnAddWorkspace,
  userData,
  onProfileClick,
  onSettingsClick,
  showMenuButton = false,
  onMenuClick,
  isLoading: externalIsLoading = false,
}) => {
  const { activeWorkspace, workspaces: contextWorkspaces, setActiveWorkspace, refreshWorkspaces, clearWorkspaceCache } = useUser();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme || (prefersDark ? "dark" : "light");
  });

  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Determine if we're using external props or context values
  const workspaces = externalWorkspaces || contextWorkspaces;
  const selectedWorkspace = externalSelectedWorkspace || activeWorkspace?.id;
  const isLoading = externalIsLoading || isRefreshing;
  
  // Debug logs
  useEffect(() => {
    console.log("Toolbar - External selected workspace:", externalSelectedWorkspace);
    console.log("Toolbar - Context active workspace:", activeWorkspace?.id);
    console.log("Toolbar - Final selected workspace:", selectedWorkspace);
  }, [externalSelectedWorkspace, activeWorkspace, selectedWorkspace]);
  
  // Handle refresh workspaces
  const handleRefreshWorkspaces = async () => {
    setIsRefreshing(true);
    try {
      // Clear any cached workspace selection first
      clearWorkspaceCache();
      
      // Then refresh the workspaces list
      await refreshWorkspaces();
      
      console.log("Toolbar - Workspaces refreshed");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };
  
  // Handle workspace change
  const handleWorkspaceChange = (workspaceId: string) => {
    console.log("Toolbar - Changing workspace to:", workspaceId);
    
    if (externalOnWorkspaceChange) {
      console.log("Toolbar - Using external handler");
      externalOnWorkspaceChange(workspaceId);
    } else {
      console.log("Toolbar - Using context handler");
      const workspace = workspaces.find(w => w.id === workspaceId);
      if (workspace) {
        setActiveWorkspace(workspace);
      }
    }
  };
  
  // Handle add workspace
  const handleAddWorkspace = () => {
    console.log("Toolbar - Add workspace clicked");
    if (externalOnAddWorkspace) {
      externalOnAddWorkspace();
    } else {
      // Default behavior - you can customize this
      navigate("/me/setting/workspaces");
    }
  };

  const handleThemeChange = (newTheme: string) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        handleThemeChange(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-gradient-to-r from-base-100 to-base-200 border-b border-accent/20 p-4 backdrop-blur-sm z-40 sticky top-0">
      <div className="flex flex-1 gap-4 justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className={showMenuButton ? "block" : "hidden"}
            onClick={onMenuClick}
            title="Open menu"
          >
            <Icon name="menu" className="text-3xl text-primary" />
          </button>

          <ErrorBoundary>
            <WorkspaceSelector
              workspaces={workspaces}
              selectedWorkspace={selectedWorkspace}
              onWorkspaceChange={handleWorkspaceChange}
              onAddWorkspace={handleAddWorkspace}
              isLoading={isLoading}
            />
          </ErrorBoundary>
          
          <button
            type="button"
            onClick={handleRefreshWorkspaces}
            title="Refresh workspaces"
            className="btn btn-ghost btn-sm btn-circle"
            disabled={isRefreshing}
          >
            <Icon 
              name="refresh" 
              className={`text-primary text-lg ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <ErrorBoundary>
            <LanguageSwitcher />
          </ErrorBoundary>

          <ErrorBoundary>
            <ThemeSelector
              currentTheme={theme}
              onThemeChange={handleThemeChange}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <UserProfile
              userData={userData}
              onProfileClick={onProfileClick}
              onSettingsClick={onSettingsClick}
              onLogoutClick={handleLogout}
              isLoading={isLoading}
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
