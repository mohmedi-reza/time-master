import React from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import { mockProjects } from "../../constants/mocks/mockProjectData";

const ProjectPage: React.FC = () => {
  return (
    <div>
      <p className="text-3xl font-black">Projects</p>
      <p className="text-gray-400">Manage and track projects.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {mockProjects.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.name}
            clientId={project.clientId||""}
            owner={project.owner}
            totalTrackedTime={project.totalTrackedTime}
            billableAmount={project.billableAmount}
            groups={project.groups}
            users={project.users}
            allowedWorkHours={project.allowedWorkHours}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
