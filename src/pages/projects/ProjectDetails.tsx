import React, { useState } from "react";
import Icon from "../../components/common/icon/icon.component";
import TaskList from "./TaskList";
import { mockTasks } from "../../constants/mocks/mockTaskData";
import { IconName } from "../../components/common/icon/iconPack";

const ProjectDetailsPage: React.FC = () => {
  const tabs = ["Tasks", "Access", "Status", "Settings"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  // Mock project stats
  const stats = [
    { title: "Total Tasks", value: "24", icon: "taskSquare" },
    { title: "In Progress", value: "8", icon: "timer" },
    { title: "Completed", value: "12", icon: "tickCircle" },
    { title: "Team Members", value: "6", icon: "profileuser" },
  ];

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <nav className="flex items-center gap-4 animate-fade-in">
        <button className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors">
          <Icon name="arrowLeft" className="text-2xl text-primary" />
        </button>
        <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Project Details
        </h1>
        <button className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors ms-auto">
          <Icon name="more" className="text-2xl text-primary" />
        </button>
      </nav>

      <div className="card bg-base-100/50 border border-accent/20 shadow-lg backdrop-blur-sm p-6 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="avatar">
            <div className="w-24 h-24 rounded-xl ring ring-primary/20 ring-offset-base-100 ring-offset-2">
              <img 
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="object-cover"
                alt="Project"
              />
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Project Name
              </h2>
              <p className="text-base-content/60 mt-2 text-lg">
                Sint amet ut reprehenderit aliquip velit amet quis duis adipisicing.
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="space-y-1">
                <p className="text-sm text-base-content/60 flex items-center gap-2">
                  <Icon name="profileuser" className="text-primary" />
                  Creator
                </p>
                <p className="font-medium">Reza Mohmedi</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-base-content/60 flex items-center gap-2">
                  <Icon name="calendar" className="text-primary" />
                  Created At
                </p>
                <p className="font-medium">14 March 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base-content/60 text-sm font-medium">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Icon name={stat.icon as IconName} className="text-2xl text-primary" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6 animate-fade-in">
        <div role="tablist" className="tabs tabs-boxed bg-base-100/50 p-1 rounded-xl backdrop-blur-sm border border-accent/20">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              className={`tab text-lg transition-all duration-300 rounded-lg ${
                activeTab === tab 
                ? "tab-active bg-primary text-primary-content shadow-lg font-medium" 
                : "hover:bg-base-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="card bg-base-100/50 border border-accent/20 shadow-lg backdrop-blur-sm">
          <div className="card-body p-6">
            {activeTab === "Tasks" && <TaskList tasks={mockTasks} />}
            {activeTab === "Access" && (
              <div className="space-y-2">
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Access Management
                </h2>
                <p className="text-base-content/60">
                  Manage access permissions for the project here.
                </p>
              </div>
            )}
            {activeTab === "Status" && (
              <div className="space-y-2">
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Project Status
                </h2>
                <p className="text-base-content/60">
                  Check the current status of the project.
                </p>
              </div>
            )}
            {activeTab === "Settings" && (
              <div className="space-y-2">
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Project Settings
                </h2>
                <p className="text-base-content/60">
                  Configure project settings here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
