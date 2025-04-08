import React from "react";
import Icon from "../common/icon/icon.component";
import { useTranslation } from "react-i18next";

const ProjectHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('projects.overview.title')}
        </h1>
        <p className="text-base-content/60 text-sm">{t('projects.overview.subtitle')}</p>
      </div>
      <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-all duration-300">
        <Icon name="addSquare" className="text-base" />
        {t('projects.overview.newProject')}
      </button>
    </div>
  );
};

export default ProjectHeader; 