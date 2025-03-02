import React from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import { mockProjects } from "../../constants/mocks/mockProjectData";
import Icon from "../../components/common/icon/icon.component";

const ProjectPage: React.FC = () => {
  // Calculate total stats
  const totalProjects = mockProjects.length;
  const totalHours = mockProjects.reduce((acc, proj) => acc + proj.totalTrackedTime, 0);
  const totalRevenue = mockProjects.reduce((acc, proj) => acc + proj.billableAmount, 0);
  const activeProjects = mockProjects.length; // Since we don't have status, showing all as active

  return (
    <div className="p-4 space-y-6 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Header Section */}
      <div className="animate-fade-in space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Projects Overview
            </h1>
            <p className="text-base-content/60 text-sm">Manage and track your team's projects</p>
          </div>
          <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-all duration-300">
            <Icon name="addSquare" className="text-base" />
            New Project
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="card-body p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name="folder" className="text-lg text-primary" />
                </div>
                <p className="text-sm text-base-content/60">Total Projects</p>
              </div>
              <p className="text-xl font-bold">{totalProjects}</p>
              <p className="text-xs text-base-content/60 mt-1 flex items-center gap-1">
                <Icon name="tickCircle" className="text-xs text-success" />
                {activeProjects} active
              </p>
            </div>
          </div>

          <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="card-body p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Icon name="timer" className="text-lg text-secondary" />
                </div>
                <p className="text-sm text-base-content/60">Total Hours</p>
              </div>
              <p className="text-xl font-bold">{totalHours}</p>
              <p className="text-xs text-base-content/60 mt-1 flex items-center gap-1">
                <Icon name="calendar" className="text-xs text-secondary" />
                Hours tracked
              </p>
            </div>
          </div>

          <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="card-body p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-success/10">
                  <Icon name="moneyRecive" className="text-lg text-success" />
                </div>
                <p className="text-sm text-base-content/60">Total Revenue</p>
              </div>
              <p className="text-xl font-bold">${totalRevenue}</p>
              <p className="text-xs text-base-content/60 mt-1 flex items-center gap-1">
                <Icon name="wallet" className="text-xs text-success" />
                Billable amount
              </p>
            </div>
          </div>

          <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="card-body p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Icon name="people" className="text-lg text-warning" />
                </div>
                <p className="text-sm text-base-content/60">Team Members</p>
              </div>
              <p className="text-xl font-bold">{mockProjects.reduce((acc, proj) => acc + proj.users.length, 0)}</p>
              <p className="text-xs text-base-content/60 mt-1 flex items-center gap-1">
                <Icon name="profileuser" className="text-xs text-warning" />
                Active members
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Icon name="folder" className="text-primary text-base" />
              Active Projects
            </h2>
            <p className="text-xs text-base-content/60">View and manage your ongoing projects</p>
          </div>
          <div className="join bg-base-100/50 border border-accent/20 rounded-lg shadow-lg">
            <button className="join-item btn btn-ghost btn-xs px-3 text-primary">All</button>
            <button className="join-item btn btn-ghost btn-xs px-3">Active</button>
            <button className="join-item btn btn-ghost btn-xs px-3">Completed</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Icon name="folder" className="text-5xl text-primary/40 mx-auto mb-4" />
              <p className="text-base-content/60">No projects found</p>
            </div>
          ) : (
            mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                clientId={project.clientId||""}
                owner={project.owner}
                totalTrackedTime={project.totalTrackedTime}
                billableAmount={project.billableAmount}
                groups={project.groups}
                users={project.users}
                allowedWorkHours={project.allowedWorkHours}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
