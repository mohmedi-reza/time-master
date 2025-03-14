import React from "react";
import Icon from "../common/icon/icon.component";
import Section from "../common/Section";
import FilterBar from "../common/FilterBar";
import GroupCard from "./GroupCard";
import { Group } from "../../interfaces/group.interface";

interface GroupSectionProps {
  groups: Group[];
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterProject: string;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: "asc" | "desc";
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  projects: string[];
  isLoading: boolean;
}

const GroupSection: React.FC<GroupSectionProps> = ({
  groups,
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
        title="Groups" 
        description="Organize teams and manage collaborations"
        count={groups.length}
      >
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          filterProject={filterProject}
          onFilterChange={onFilterChange}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          projects={projects}
          placeholder="Search groups by name..."
        />
      </Section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="card bg-base-100/50 border border-accent/20 animate-pulse h-48" />
          ))
        ) : groups.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Icon name="people" className="text-5xl text-primary/40 mx-auto mb-4" />
            <p className="text-base-content/60">No groups found matching your criteria</p>
          </div>
        ) : (
          groups.map((group, index) => (
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
    </>
  );
};

export default GroupSection; 