import React, { useState } from "react";
import UserCard from "../../components/group/UserCard";
import { users } from "../../constants/mocks/mockUsersData";

const ClientPage: React.FC = () => {
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userFilterProject, setUserFilterProject] = useState("");
  const [userSortOrder, setUserSortOrder] = useState<"asc" | "desc">("asc");

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
    )
    .filter((user) =>
      userFilterProject ? user.projects.includes(userFilterProject) : true
    )
    .sort((a, b) =>
      userSortOrder === "asc" ? a.hours - b.hours : b.hours - a.hours
    );

  return (
    <div className="p-6">
      <div className="mt-5 flex items-center">
        <div>
          <p className="text-3xl font-black">Users</p>
          <p className="text-gray-400">Manage user groups and teams.</p>
        </div>

        <div className="flex flex-wrap gap-4 ms-auto mt-6">
          <input
            type="text"
            placeholder="Search users by name"
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)}
            className="p-2 border-0 bg-gray-700/50 rounded-lg"
          />
          <select
            value={userFilterProject}
            onChange={(e) => setUserFilterProject(e.target.value)}
            className="p-2 border-0 bg-gray-700/50 rounded-lg"
          >
            <option value="">All Projects</option>
            {Array.from(new Set(users.flatMap((user) => user.projects))).map(
              (project, index) => (
                <option key={index} value={project}>
                  {project}
                </option>
              )
            )}
          </select>
          <select
            value={userSortOrder}
            onChange={(e) => setUserSortOrder(e.target.value as "asc" | "desc")}
            className="p-2 border-0 bg-gray-700/50 rounded-lg"
          >
            <option value="asc">Sort by Hours (Low to High)</option>
            <option value="desc">Sort by Hours (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredUsers.map((user, index) => (
          <UserCard
            key={index}
            avatar={user.avatar}
            name={user.name}
            position={user.position}
            hours={user.hours}
            projects={user.projects}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientPage;
