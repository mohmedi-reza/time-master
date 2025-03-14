import React from "react";
import Icon from "../icon/icon.component";
import { Workspace } from "./types";

interface WorkspaceSelectorProps {
  workspaces?: Workspace[];
  selectedWorkspace?: string;
  onWorkspaceChange: (workspaceId: string) => void;
  onAddWorkspace: () => void;
  isLoading?: boolean;
}

const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({
  workspaces = [],
  selectedWorkspace,
  onWorkspaceChange,
  onAddWorkspace,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center w-fit gap-2 animate-pulse">
        <div className="h-8 w-32 bg-base-300 rounded-lg"></div>
        <div className="h-8 w-8 bg-base-300 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center w-fit gap-2">
      <select
        value={selectedWorkspace}
        onChange={(e) => onWorkspaceChange(e.target.value)}
        className="select select-sm select-bordered w-fit focus:outline-none focus:border-primary bg-base-100/50 backdrop-blur-sm transition-all duration-300"
      >
        {workspaces.length === 0 && (
          <option disabled value="">
            No workspaces
          </option>
        )}
        {workspaces.map((workspace) => (
          <option
            key={workspace.id}
            value={workspace.id}
            disabled={workspace.isDisabled}
          >
            {workspace.name}
          </option>
        ))}
      </select>
      <button
        onClick={onAddWorkspace}
        className="btn btn-square btn-ghost rounded-xl hover:bg-primary/10 transition-all duration-300"
      >
        <Icon name="addSquare" className="text-2xl text-primary" />
      </button>
    </div>
  );
};

export default WorkspaceSelector; 