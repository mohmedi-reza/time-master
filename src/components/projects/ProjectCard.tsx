import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/icon/icon.component";

interface ProjectCardProps {
  name: string;
  owner: string;
  clientId: string;
  totalTrackedTime: number;
  billableAmount: number;
  groups: string[];
  users: string[];
  allowedWorkHours?: { start: string; end: string };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  owner,
  clientId,
  totalTrackedTime,
  billableAmount,
  groups,
  users,
  allowedWorkHours,
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/me/project");
  };
  
  return (
    <button
      className="card bg-base-100/50 border border-accent/20   hover:   transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm w-full group"
      onClick={handleCardClick}
    >
      <div className="card-body text-start p-4">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="folder" className="text-lg text-primary" />
            <h2 className="card-title text-base font-bold text-base-content group-hover:text-primary transition-colors">{name}</h2>
          </div>
          <p className="text-xs text-base-content/60 mt-1 flex items-center gap-1.5">
            <Icon name="user" className="text-sm" />
            Created by {owner}
          </p>
        </div>

        <div className="divider my-1.5"></div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-base-content flex items-center gap-1.5">
            <Icon name="profileuser" className="text-sm text-primary" />
            Client
          </span>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
            <div className="avatar">
              <div className="ring-1 ring-primary/20 ring-offset-base-100 w-7 h-7 rounded-lg ring-offset-1">
                <img
                  alt={clientId}
                  src="https://avatar.iran.liara.run/username?username=rezamohmedi"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-base-content">Mark John</p>
              <p className="text-xs text-base-content/60">mark-john@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-base-content flex items-center gap-1.5">
            <Icon name="people" className="text-sm text-primary" />
            Groups
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {groups.map((group, index) => (
              <div key={index} className="badge badge-xs badge-primary badge-outline hover:badge-primary transition-all duration-300">
                {group}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-base-content flex items-center gap-1.5">
            <Icon name="profileuser" className="text-sm text-primary" />
            Team Members
          </span>
          <div className="avatar-group -space-x-3 rtl:space-x-reverse">
            {users.map((user, index) => (
              <div key={index} className="avatar">
                <div className="w-6">
                  <img
                    alt={user}
                    src="https://avatar.iran.liara.run/username?username=rezamohmedi"
                    className="rounded-lg grayscale hover:grayscale-0 transition-all duration-300 ring-1 ring-primary/20 ring-offset-1 ring-offset-base-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider my-1.5"></div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-xs text-base-content/60 flex items-center gap-1.5">
              <Icon name="timer" className="text-sm text-primary" />
              Total Time
            </span>
            <div className="badge badge-primary badge-sm font-medium">{totalTrackedTime} hrs</div>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-base-content/60 flex items-center gap-1.5">
              <Icon name="moneys" className="text-sm text-primary" />
              Billable
            </span>
            <div className="badge badge-secondary badge-sm font-medium">${billableAmount}</div>
          </div>
        </div>

        {allowedWorkHours && (
          <div className="space-y-1">
            <span className="text-xs text-base-content/60 flex items-center gap-1.5">
              <Icon name="calendar" className="text-sm text-primary" />
              Work Hours
            </span>
            <div className="badge badge-accent badge-sm font-medium">
              {allowedWorkHours.start} - {allowedWorkHours.end}
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

export default ProjectCard;
