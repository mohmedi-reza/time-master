import React from "react";

interface UserCardProps {
  avatar: string;
  name: string;
  position: string;
  hours: number;
  projects: string[];
}

const UserCard: React.FC<UserCardProps> = ({
  avatar,
  name,
  position,
  hours,
  projects,
}) => {
  return (
    <div className="card card-border bg-base-100 w-full border border-gray-700">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img src={avatar} alt={name} />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-sm text-gray-500">{position}</p>
          </div>
        </div>

        <div className="mt-3">
          <span className="font-semibold">Total Hours:</span>
          <div className="badge badge-primary ml-2">{hours} hrs</div>
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

export default UserCard;
