import React from "react";
import Icon from "../common/icon/icon.component";
import { useTranslation } from "react-i18next";

const TimeTrackerHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('timeTracker.title')}
        </h1>
        <p className="text-base-content/60">{t('timeTracker.subtitle')}</p>
      </div>
      <button className="btn btn-primary gap-2 hover:scale-105 transition-all duration-300 rounded-xl">
        <Icon name="play" className="text-lg" />
        {t('timeTracker.startTimer')}
      </button>
    </div>
  );
};

export default TimeTrackerHeader; 