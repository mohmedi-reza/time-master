import React from "react";
import Icon from "../common/icon/icon.component";

const ProjectHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Projects Overview
        </h1>
        <p className="text-base-content/60 text-sm">Manage and track your team's projects</p>
      </div>
      <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-all duration-300">
        <Icon name="addSquare" className="text-base" />
        New Project
      </button>
    </div>
  );
};

export default ProjectHeader; 