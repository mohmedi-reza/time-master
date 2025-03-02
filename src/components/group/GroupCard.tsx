import React from "react";
import Icon from "../../components/common/icon/icon.component";

interface GroupCardProps {
  name: string;
  members: string[];
  hours: number;
  projects: string[];
}

const GroupCard: React.FC<GroupCardProps> = ({
  name,
  members,
  hours,
  projects,
}) => {
  return (
    <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
      <div className="card-body p-4">
        <div className="flex items-center gap-2">
          <Icon name="people" className="text-lg text-primary" />
          <h2 className="card-title text-base font-bold text-base-content">{name}</h2>
        </div>

        <div className="space-y-1.5 mt-3">
          <span className="text-xs text-base-content/60 flex items-center gap-1.5">
            <Icon name="profileuser" className="text-sm text-primary" />
            Team Members
          </span>
          <div className="avatar-group -space-x-4 rtl:space-x-reverse">
            {members.map((member, index) => (
              <div key={index} className="avatar">
                <div className="w-7 ring-1 ring-primary/20 ring-offset-1 ring-offset-base-100">
                  <img 
                    src={member} 
                    alt={`User ${index + 1}`} 
                    className="rounded-lg grayscale hover:grayscale-0 transition-all duration-300" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1 mt-3">
          <span className="text-xs text-base-content/60 flex items-center gap-1.5">
            <Icon name="timer" className="text-sm text-primary" />
            Total Hours
          </span>
          <div className="badge badge-primary badge-sm font-medium">{hours} hrs</div>
        </div>

        <div className="space-y-1.5 mt-3">
          <span className="text-xs text-base-content/60 flex items-center gap-1.5">
            <Icon name="folder" className="text-sm text-primary" />
            Projects
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="badge badge-xs badge-accent badge-outline hover:badge-accent transition-all duration-300"
              >
                {project}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
