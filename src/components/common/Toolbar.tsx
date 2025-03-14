import React, { useEffect, useState } from "react";
import Icon from "./icon/icon.component";
import WorkspaceSelector from "./toolbar/WorkspaceSelector";
import UserProfile from "./toolbar/UserProfile";
import ErrorBoundary from "./ErrorBoundary";
import ThemeSelector from "./toolbar/ThemeSelector";
import { Workspace, UserData } from "./toolbar/types";

interface ToolbarProps {
  workspaces?: Workspace[];
  selectedWorkspace?: string;
  onWorkspaceChange: (workspaceId: string) => void;
  onAddWorkspace: () => void;
  userData?: UserData;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
  isLoading?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  workspaces,
  selectedWorkspace,
  onWorkspaceChange,
  onAddWorkspace,
  userData,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  showMenuButton = false,
  onMenuClick,
  isLoading = false,
}) => {
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  const handleThemeChange = (newTheme: string) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        handleThemeChange(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="navbar bg-gradient-to-r from-base-100 to-base-200 border-b border-accent/20 p-4 backdrop-blur-sm z-40 sticky top-0">
      <div className="flex flex-1 gap-4 justify-between">
        <div className="flex items-center gap-4">
          <button className={showMenuButton ? "block" : "hidden"} onClick={onMenuClick}>
            <Icon name="menu" className="text-3xl text-primary" />
          </button>
          
          <ErrorBoundary>
            <WorkspaceSelector
              workspaces={workspaces}
              selectedWorkspace={selectedWorkspace}
              onWorkspaceChange={onWorkspaceChange}
              onAddWorkspace={onAddWorkspace}
              isLoading={isLoading}
            />
          </ErrorBoundary>
        </div>

        <div className="flex items-center gap-4">
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
              onLogoutClick={onLogoutClick}
              isLoading={isLoading}
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
