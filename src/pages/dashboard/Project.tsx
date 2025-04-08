import React from "react";
import { mockProjects } from "../../constants/mocks/mockProjectData";
import ProjectHeader from "../../components/projects/ProjectHeader";
import ProjectStats from "../../components/projects/ProjectStats";
import ProjectList from "../../components/projects/ProjectList";

const ProjectPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="animate-fade-in space-y-4">
        <ProjectHeader />
        <ProjectStats projects={mockProjects} />
      </div>

      <div className="space-y-4 animate-fade-in">
        <ProjectList projects={mockProjects} />
      </div>
    </div>
  );
};

export default ProjectPage;
