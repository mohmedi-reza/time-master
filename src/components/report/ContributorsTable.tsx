import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "../common/icon/icon.component";
import { UserTimeData } from "../../interfaces/report.interface";

interface ContributorsTableProps {
  data: UserTimeData[];
}

const ContributorsTable: React.FC<ContributorsTableProps> = ({ data }) => {
  const { t } = useTranslation();
  
  return (
    <div className="card bg-base-100/50 border border-accent/20 hover:  transition-all duration-300 backdrop-blur-sm">
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Icon name="profileuser" className="text-primary text-base" />
              {t('reports.tables.contributors.title')}
            </h2>
            <p className="text-xs text-base-content/60">{t('reports.tables.contributors.subtitle')}</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr className="border-b border-accent/20">
                <th className="text-xs font-medium">{t('reports.tables.contributors.columns.user')}</th>
                <th className="text-xs font-medium">{t('reports.tables.contributors.columns.section')}</th>
                <th className="text-xs font-medium">{t('reports.tables.contributors.columns.hours')}</th>
                <th className="text-xs font-medium">{t('reports.tables.contributors.columns.tasks')}</th>
                <th className="text-xs font-medium">{t('reports.tables.contributors.columns.efficiency')}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((user, index) => (
                <tr key={index} className="hover:bg-base-200/50 transition-colors border-b border-accent/10">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-lg ring-1 ring-primary/20 ring-offset-base-100 ring-offset-1">
                          <img src={user.avatar} alt={user.name} className="grayscale hover:grayscale-0 transition-all duration-300" />
                        </div>
                      </div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </td>
                  <td className="font-medium">{user.section}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.hours} hrs</span>
                      <progress
                        className="progress progress-primary w-20 h-2"
                        value={user.hours}
                        max={50}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.tasks.completed}/{user.tasks.total}</span>
                      <progress
                        className="progress progress-success w-20 h-2"
                        value={user.tasks.completed}
                        max={user.tasks.total}
                      />
                    </div>
                  </td>
                  <td>
                    <div className={`badge ${
                      user.efficiency >= 90 ? 'badge-success' : 'badge-warning'
                    } badge-sm font-medium`}>
                      {user.efficiency}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContributorsTable; 