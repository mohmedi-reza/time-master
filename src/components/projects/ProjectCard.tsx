import React from "react";

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
  return (
    <div className="card bg-base-100 w-96 border border-gray-500/20 hover:border-gray-500/50 cursor-pointer">
      <div className="card-body">
        <div className=" rounded-lg">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-gray-500">Created By: {owner}</p>
        </div>
        <div className="divider my-1"></div>

        <div className=" flex flex-col gap-2 flex-1">
          <span className="font-semibold">Client:</span>
          <div className="flex items-center gap-2 bg-gray-200/5 p-3 rounded-lg">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-8 h-8 rounded-full ring ring-offset-2">
                <img
                  alt={clientId}
                  src="https://avatar.iran.liara.run/username?username=rezamohmedi"
                />
              </div>
            </div>

            <div>
              <p className="font-semibold">Mark John</p>
              <p className="text-gray-500">mark-john@gmail.com</p>
            </div>
          </div>
        </div>

        <div className=" w-full">
          <span className="font-semibold">Groups:</span>
          <div className="flex gap-2 mt-1 flex-wrap">
            {groups.map((group, index) => (
              <div key={index} className="badge badge-soft badge-accent">
                {group}
              </div>
            ))}
          </div>
        </div>

        <div className=" w-full">
          <span className="font-semibold">Users:</span>
          <div className="avatar-group -space-x-6">
            {users.map((user, index) => (
              <div key={index} className="avatar">
                <div className="w-8">
                  <img
                    alt={user}
                    src="https://avatar.iran.liara.run/username?username=rezamohmedi"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="divider my-1"></div>
        <div className=" flex flex-1">
          <span className="font-semibold">Total Time:</span>
          <div className="badge badge-primary ms-auto">
            {totalTrackedTime} hrs
          </div>
        </div>

        <div className=" flex flex-1">
          <span className="font-semibold">Billable Amount:</span>
          <div className="badge badge-secondary ms-auto">${billableAmount}</div>
        </div>

        <div className=" flex flex-1">
          <span className="font-semibold">Allowed Work Hours:</span>
          <div className="badge badge-soft badge-accent ms-auto">
            {allowedWorkHours?.start} - {allowedWorkHours?.end}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
