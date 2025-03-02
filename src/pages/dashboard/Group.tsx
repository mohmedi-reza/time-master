import React, { useState, useMemo, ChangeEvent } from "react";
import GroupCard from "../../components/group/GroupCard";
import UserCard from "../../components/group/UserCard";
import { users } from "../../constants/mocks/mockUsersData";
import { groups } from "../../constants/mocks/mockGroupData";
import Icon from "../../components/common/icon/icon.component";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filterProject: string;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: "asc" | "desc";
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  projects: string[];
  placeholder: string;
}

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  count: number;
}

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

  const FilterBar = ({ 
    searchTerm, 
    onSearchChange, 
    filterProject, 
    onFilterChange, 
    sortOrder, 
    onSortChange,
    projects,
    placeholder
  }: FilterBarProps) => (
    <div className="flex flex-wrap gap-4 w-full sm:w-auto">
      <div className="join h-10 bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl flex-1 sm:flex-none">
        <div className="join-item flex items-center pl-3">
          <Icon name="searchNormal" className="text-primary/60" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onSearchChange}
          className="input input-sm join-item bg-transparent border-0 focus:outline-none w-full h-full"
        />
      </div>
      <div className="flex gap-2 flex-1 sm:flex-none h-10">
        <select
          value={filterProject}
          onChange={onFilterChange}
          className="select h-full bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl flex-1 min-h-0"
        >
          <option value="">All Projects</option>
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={onSortChange}
          className="select h-full bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl flex-1 min-h-0"
        >
          <option value="asc">Hours ↑</option>
          <option value="desc">Hours ↓</option>
        </select>
      </div>
    </div>
  );

  const Section = ({ title, description, children, count }: SectionProps) => (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {title}
            </h1>
            <div className="badge badge-primary badge-sm">{count}</div>
          </div>
          <p className="text-base-content/60 text-sm">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-10 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Users Section */}
      <Section 
        title="Users" 
        description="Manage and organize your team members"
        count={filteredUsers.length}
      >
        <FilterBar
          searchTerm={userSearchTerm}
          onSearchChange={(e) => setUserSearchTerm(e.target.value)}
          filterProject={userFilterProject}
          onFilterChange={(e) => setUserFilterProject(e.target.value)}
          sortOrder={userSortOrder}
          onSortChange={(e) => setUserSortOrder(e.target.value as "asc" | "desc")}
          projects={uniqueUserProjects}
          placeholder="Search users by name..."
        />
      </Section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="card bg-base-100/50 border border-accent/20   animate-pulse h-48" />
          ))
        ) : filteredUsers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Icon name="user" className="text-5xl text-primary/40 mx-auto mb-4" />
            <p className="text-base-content/60">No users found matching your criteria</p>
          </div>
        ) : (
          filteredUsers.map((user, index) => (
            <UserCard
              key={index}
              avatar={user.avatar}
              name={user.name}
              position={user.position}
              hours={user.hours}
              projects={user.projects}
            />
          ))
        )}
      </div>

      {/* Groups Section */}
      <Section 
        title="Groups" 
        description="Organize teams and manage collaborations"
        count={filteredGroups.length}
      >
        <FilterBar
          searchTerm={groupSearchTerm}
          onSearchChange={(e) => setGroupSearchTerm(e.target.value)}
          filterProject={groupFilterProject}
          onFilterChange={(e) => setGroupFilterProject(e.target.value)}
          sortOrder={groupSortOrder}
          onSortChange={(e) => setGroupSortOrder(e.target.value as "asc" | "desc")}
          projects={uniqueGroupProjects}
          placeholder="Search groups by name..."
        />
      </Section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="card bg-base-100/50 border border-accent/20   animate-pulse h-48" />
          ))
        ) : filteredGroups.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Icon name="people" className="text-5xl text-primary/40 mx-auto mb-4" />
            <p className="text-base-content/60">No groups found matching your criteria</p>
          </div>
        ) : (
          filteredGroups.map((group, index) => (
            <GroupCard
              key={index}
              name={group.name}
              members={group.members}
              hours={group.hours}
              projects={group.projects}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GroupPage;
