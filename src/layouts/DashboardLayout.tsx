import React from "react";
import { Outlet } from "react-router-dom";
import Toolbar from "../components/common/Toolbar";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout: React.FC = () => {
  const handleWorkspaceChange = (workspaceId: string) => {
    console.log('Workspace changed:', workspaceId);
    // TODO: Implement workspace change
  };

  const handleAddWorkspace = () => {
    // TODO: Implement add workspace
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Toolbar 
          onWorkspaceChange={handleWorkspaceChange}
          onAddWorkspace={handleAddWorkspace}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
