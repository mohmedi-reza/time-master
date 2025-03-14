import React, { useState, useMemo } from "react";
import { users } from "../../constants/mocks/mockUsersData";
import { groups } from "../../constants/mocks/mockGroupData";
import UserSection from "../../components/group/UserSection";
import GroupSection from "../../components/group/GroupSection";

const GroupPage: React.FC = () => {
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userFilterProject, setUserFilterProject] = useState("");
  const [userSortOrder, setUserSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading] = useState(false);

  const [groupSearchTerm, setGroupSearchTerm] = useState("");
  const [groupFilterProject, setGroupFilterProject] = useState("");
  const [groupSortOrder, setGroupSortOrder] = useState<"asc" | "desc">("asc");

  // Memoized unique projects list
  const uniqueUserProjects = useMemo(() => 
    Array.from(new Set(users.flatMap((user) => user.projects))),
    []
  );

  const uniqueGroupProjects = useMemo(() => 
    Array.from(new Set(groups.flatMap((group) => group.projects))),
    []
  );

  // Memoized filtered users
  const filteredUsers = useMemo(() => 
    users
      .filter((user) =>
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase())
      )
      .filter((user) =>
        userFilterProject ? user.projects.includes(userFilterProject) : true
      )
      .sort((a, b) =>
        userSortOrder === "asc" ? a.hours - b.hours : b.hours - a.hours
      ),
    [userSearchTerm, userFilterProject, userSortOrder]
  );

  // Memoized filtered groups
  const filteredGroups = useMemo(() => 
    groups
      .filter((group) =>
        group.name.toLowerCase().includes(groupSearchTerm.toLowerCase())
      )
      .filter((group) =>
        groupFilterProject ? group.projects.includes(groupFilterProject) : true
      )
      .sort((a, b) =>
        groupSortOrder === "asc" ? a.hours - b.hours : b.hours - a.hours
      ),
    [groupSearchTerm, groupFilterProject, groupSortOrder]
  );

  return (
    <div className="p-4 space-y-10 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <UserSection
        users={filteredUsers}
        searchTerm={userSearchTerm}
        onSearchChange={(e) => setUserSearchTerm(e.target.value)}
        filterProject={userFilterProject}
        onFilterChange={(e) => setUserFilterProject(e.target.value)}
        sortOrder={userSortOrder}
        onSortChange={(e) => setUserSortOrder(e.target.value as "asc" | "desc")}
        projects={uniqueUserProjects}
        isLoading={isLoading}
      />

      <GroupSection
        groups={filteredGroups}
        searchTerm={groupSearchTerm}
        onSearchChange={(e) => setGroupSearchTerm(e.target.value)}
        filterProject={groupFilterProject}
        onFilterChange={(e) => setGroupFilterProject(e.target.value)}
        sortOrder={groupSortOrder}
        onSortChange={(e) => setGroupSortOrder(e.target.value as "asc" | "desc")}
        projects={uniqueGroupProjects}
        isLoading={isLoading}
      />
    </div>
  );
};

export default GroupPage;
