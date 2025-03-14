import React, { ChangeEvent } from "react";
import Icon from "./icon/icon.component";

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

const FilterBar: React.FC<FilterBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  filterProject, 
  onFilterChange, 
  sortOrder, 
  onSortChange,
  projects,
  placeholder
}) => (
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

export default FilterBar; 