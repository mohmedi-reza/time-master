import React from "react";
import Icon from "../common/icon/icon.component";
import { Project } from "../../interfaces/project.interface";
import { IconName } from "../common/icon/iconPack";
import { useTranslation } from "react-i18next";

interface ProjectStatsProps {
  projects: Project[];
}

interface StatItem {
  title: string;
  value: string;
  icon: IconName;
  iconBg: string;
  iconColor: string;
  subIcon: IconName;
  subIconColor: string;
  subText: string;
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ projects }) => {
  const { t } = useTranslation();
  const totalProjects = projects.length;
  const totalHours = projects.reduce((acc, proj) => acc + proj.totalTrackedTime, 0);
  const totalRevenue = projects.reduce((acc, proj) => acc + proj.billableAmount, 0);
  const activeProjects = projects.length; // Since we don't have status, showing all as active
  const totalTeamMembers = projects.reduce((acc, proj) => acc + proj.users.length, 0);

  const stats: StatItem[] = [
    {
      title: t('projects.stats.totalProjects.title'),
      value: totalProjects.toString(),
      icon: "folder2" as IconName,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      subIcon: "tickCircle" as IconName,
      subIconColor: "text-success",
      subText: `${activeProjects} ${t('projects.stats.totalProjects.active')}`
    },
    {
      title: t('projects.stats.totalHours.title'),
      value: totalHours.toString(),
      icon: "timer" as IconName,
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
      subIcon: "calendar" as IconName,
      subIconColor: "text-secondary",
      subText: t('projects.stats.totalHours.subtitle')
    },
    {
      title: t('projects.stats.totalRevenue.title'),
      value: `$${totalRevenue}`,
      icon: "moneyReceive" as IconName,
      iconBg: "bg-success/10",
      iconColor: "text-success",
      subIcon: "wallet" as IconName,
      subIconColor: "text-success",
      subText: t('projects.stats.totalRevenue.subtitle')
    },
    {
      title: t('projects.stats.teamMembers.title'),
      value: totalTeamMembers.toString(),
      icon: "people" as IconName,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
      subIcon: "profile2User" as IconName,
      subIconColor: "text-warning",
      subText: t('projects.stats.teamMembers.subtitle')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card bg-base-100/50 border border-accent/20 hover:transition-all duration-300 backdrop-blur-sm">
          <div className="card-body p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <Icon name={stat.icon} className={`text-lg ${stat.iconColor}`} />
              </div>
              <p className="text-sm text-base-content/60">{stat.title}</p>
            </div>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-base-content/60 mt-1 flex items-center gap-1">
              <Icon name={stat.subIcon} className={`text-xs ${stat.subIconColor}`} />
              {stat.subText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats; 