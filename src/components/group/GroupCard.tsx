import React from "react";

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
    <div className="card card-border bg-base-100 w-full border border-gray-700">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>

        <div className="avatar-group -space-x-6 my-2">
          {members.map((member, index) => (
            <div key={index} className="avatar">
              <div className="w-8 rounded-full">
                <img src={member} alt={`User ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Total Hours:</span>
          <div className="badge badge-primary">{hours} hrs</div>
        </div>

        <div className="mt-2">
          <span className="font-semibold">Projects:</span>
          <div className="flex gap-2 mt-1 flex-wrap">
            {projects.map((project, index) => (
              <div key={index} className="badge badge-soft badge-accent">
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
