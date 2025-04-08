import { useTranslation } from "react-i18next";
import WorkLogForm from "./WorkLogForm";

const WorkLogList = () => {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100/50 border border-accent/20   backdrop-blur-sm">
      <div className="card-body p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="card-title text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('timeTracker.workLog.title')}
          </h2>
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm">{t('timeTracker.workLog.filters.today')}</button>
            <button className="btn btn-ghost btn-sm">{t('timeTracker.workLog.filters.thisWeek')}</button>
            <button className="btn btn-ghost btn-sm">{t('timeTracker.workLog.filters.thisMonth')}</button>
          </div>
        </div>
        <WorkLogForm />
      </div>
    </div>
  );
};

export default WorkLogList;
