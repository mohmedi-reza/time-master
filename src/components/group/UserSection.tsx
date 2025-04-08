import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import UserCard from "./UserCard";
import Icon from "../common/icon/icon.component";

interface User {
  name: string;
  avatar: string;
  hours: number;
  projects: string[];
  position: string;
}

interface UserSectionProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedProject: string;
  onProjectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: "asc" | "desc";
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  projects: string[];
}

const UserSection: React.FC<UserSectionProps> = ({
  users,
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
        <h2 className="text-xl font-bold text-base-content">{t('group.users.title')}</h2>
        <p className="text-sm text-base-content/60 mt-1">{t('group.users.subtitle')}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="join flex-1">
          <div className="join-item bg-base-100/50 border border-accent/20 px-3 flex items-center">
            <Icon name="user" className="text-base-content/60" />
          </div>
          <input
            type="text"
            placeholder={t('group.users.search')}
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

      {users.length === 0 ? (
        <div className="text-center py-8 text-base-content/60">
          {t('group.users.noUsers')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user, index) => (
            <UserCard
              key={index}
              name={user.name}
              avatar={user.avatar}
              hours={user.hours}
              projects={user.projects}
              position={user.position}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSection; 