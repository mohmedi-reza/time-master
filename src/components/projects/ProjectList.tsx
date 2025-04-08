import React from "react";
import Icon from "../common/icon/icon.component";
import ProjectCard from "./ProjectCard";
import { useTranslation } from "react-i18next";
import { Project } from "../../interfaces/project.interface";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Icon name="folder" className="text-primary text-base" />
            {t('projects.list.title')}
          </h2>
          <p className="text-xs text-base-content/60">{t('projects.list.subtitle')}</p>
        </div>
        <div className="join bg-base-100/50 border border-accent/20 rounded-lg">
          <button className="join-item btn btn-ghost btn-xs px-3 text-primary">{t('projects.list.filters.all')}</button>
          <button className="join-item btn btn-ghost btn-xs px-3">{t('projects.list.filters.active')}</button>
          <button className="join-item btn btn-ghost btn-xs px-3">{t('projects.list.filters.completed')}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Icon name="folder" className="text-5xl text-primary/40 mx-auto mb-4" />
            <p className="text-base-content/60">{t('projects.list.noProjects')}</p>
          </div>
        ) : (
          projects.map((project) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList; 