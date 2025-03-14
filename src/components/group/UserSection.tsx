import React from "react";
import Icon from "../common/icon/icon.component";
import Section from "../common/Section";
import FilterBar from "../common/FilterBar";
import UserCard from "./UserCard";
import { User } from "../../interfaces/user.interface";

interface UserSectionProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterProject: string;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: "asc" | "desc";
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  projects: string[];
  isLoading: boolean;
}

const UserSection: React.FC<UserSectionProps> = ({
  users,
  searchTerm,
  onSearchChange,
  filterProject,
  onFilterChange,
  sortOrder,
  onSortChange,
  projects,
  isLoading,
}) => {
  return (
    <>
      <Section 
        title="Users" 
        description="Manage and organize your team members"
        count={users.length}
      >
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          filterProject={filterProject}
          onFilterChange={onFilterChange}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          projects={projects}
          placeholder="Search users by name..."
        />
      </Section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="card bg-base-100/50 border border-accent/20 animate-pulse h-48" />
          ))
        ) : users.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Icon name="user" className="text-5xl text-primary/40 mx-auto mb-4" />
            <p className="text-base-content/60">No users found matching your criteria</p>
          </div>
        ) : (
          users.map((user, index) => (
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
    </>
  );
};

export default UserSection; 