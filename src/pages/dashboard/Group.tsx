import React, { useState, useMemo, ChangeEvent } from "react";
import UserSection from "../../components/group/UserSection";
import GroupSection from "../../components/group/GroupSection";

interface User {
  name: string;
  avatar: string;
  hours: number;
  projects: string[];
  position: string;
}

interface Group {
  name: string;
  members: string[];
  hours: number;
  projects: string[];
}

type SortOrder = "asc" | "desc";

const Group: React.FC = () => {
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [groupSearchTerm, setGroupSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Sample data - replace with actual data from your backend
  const users = useMemo<User[]>(() => [
    {
      name: "John Doe",
      avatar: "/avatars/1.png",
      hours: 120,
      projects: ["Project A", "Project B"],
      position: "Designer",
    },
    // Add more users as needed
  ], []);

  const groups = useMemo<Group[]>(() => [
    {
      name: "Design Team",
      members: ["/avatars/1.png", "/avatars/2.png", "/avatars/3.png"],
      hours: 450,
      projects: ["Project A", "Project C"],
    },
    // Add more groups as needed
  ], []);

  const projects = useMemo(() => {
    const allProjects = new Set<string>();
    users.forEach((user) => user.projects.forEach((project) => allProjects.add(project)));
    groups.forEach((group) => group.projects.forEach((project) => allProjects.add(project)));
    return Array.from(allProjects);
  }, [users, groups]);

  const handleUserSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserSearchTerm(e.target.value);
  };

  const handleGroupSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupSearchTerm(e.target.value);
  };

  const handleProjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as SortOrder);
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => 
        user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) &&
        (!selectedProject || user.projects.includes(selectedProject))
      )
      .sort((a, b) => sortOrder === "asc" ? a.hours - b.hours : b.hours - a.hours);
  }, [users, userSearchTerm, selectedProject, sortOrder]);

  const filteredGroups = useMemo(() => {
    return groups
      .filter((group) => 
        group.name.toLowerCase().includes(groupSearchTerm.toLowerCase()) &&
        (!selectedProject || group.projects.includes(selectedProject))
      )
      .sort((a, b) => sortOrder === "asc" ? a.hours - b.hours : b.hours - a.hours);
  }, [groups, groupSearchTerm, selectedProject, sortOrder]);

  return (
    <div className="space-y-8">
      <UserSection
        users={filteredUsers}
        searchTerm={userSearchTerm}
        onSearchChange={handleUserSearchChange}
        selectedProject={selectedProject}
        onProjectChange={handleProjectChange}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        projects={projects}
      />

      <GroupSection
        groups={filteredGroups}
        searchTerm={groupSearchTerm}
        onSearchChange={handleGroupSearchChange}
        selectedProject={selectedProject}
        onProjectChange={handleProjectChange}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        projects={projects}
      />
    </div>
  );
};

export default Group;
