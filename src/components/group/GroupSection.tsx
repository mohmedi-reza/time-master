import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import GroupCard from "./GroupCard";
import Icon from "../common/icon/icon.component";

interface Group {
  name: string;
  members: string[];
  hours: number;
  projects: string[];
}

interface GroupSectionProps {
  groups: Group[];
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedProject: string;
  onProjectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: "asc" | "desc";
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  projects: string[];
}

const GroupSection: React.FC<GroupSectionProps> = ({
  groups,
  searchTerm,
  onSearchChange,
  selectedProject,
  onProjectChange,
  sortOrder,
  onSortChange,
  projects,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="border-l-4 border-primary pl-4">
        <h2 className="text-xl font-bold text-base-content">{t('group.groups.title')}</h2>
        <p className="text-sm text-base-content/60 mt-1">{t('group.groups.subtitle')}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="join flex-1">
          <div className="join-item bg-base-100/50 border border-accent/20 px-3 flex items-center">
            <Icon name="people" className="text-base-content/60" />
          </div>
          <input
            type="text"
            placeholder={t('group.groups.search')}
            className="input join-item input-bordered flex-1 bg-base-100/50 border-accent/20"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>

        <select
          className="select select-bordered bg-base-100/50 border-accent/20"
          value={selectedProject}
          onChange={onProjectChange}
        >
          <option value="">{t('group.filters.project.all')}</option>
          {projects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered bg-base-100/50 border-accent/20"
          value={sortOrder}
          onChange={onSortChange}
        >
          <option value="asc">{t('group.filters.sort.asc')}</option>
          <option value="desc">{t('group.filters.sort.desc')}</option>
        </select>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-8 text-base-content/60">
          {t('group.groups.noGroups')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group, index) => (
            <GroupCard
              key={index}
              name={group.name}
              members={group.members}
              hours={group.hours}
              projects={group.projects}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupSection; 