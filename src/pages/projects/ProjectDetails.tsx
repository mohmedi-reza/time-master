import React, { useState } from "react";
import Icon from "../../components/common/icon/icon.component";
import TaskList from "./TaskList";
import { mockTasks } from "../../constants/mocks/mockTaskData";

const ProjectDetailsPage: React.FC = () => {
  const tabs = ["Tasks", "Access", "Status", "Settings"];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <div className="space-y-9">
      <nav className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <button className="btn btn-soft btn-square rounded-xl">
            <Icon name={"backSquare"} className="text-2xl" />
          </button>{" "}
          <span className="text-lg">Project Details</span>
        </div>
        <div className="ms-auto">
          <button className="btn btn-soft btn-circle">
            <Icon name={"more"} />
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-start gap-4">
        <div className="avatar">
          <div className="mask mask-squircle w-24">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold">Project Name</p>
          <p className="text-gray-200 p-2 rounded-lg">
            Sint amet ut reprehenderit aliquip velit amet quis duis adipisicing.
          </p>
          <p className="text-gray-500">
            Creator: <span className="text-gray-100">Reza Mohmedi</span>
          </p>
          <p className="text-gray-500">
            Create At: <span className="text-gray-100">14 March 2025</span>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div role="tablist" className="tabs tabs-boxed bg-gray-300/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              className={`tab text-lg ${
                activeTab === tab ? "tab-active font-bold" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="">
          {activeTab === "Tasks" && (
            <div className="bg-gray-50/2 p-4 rounded-2xl">
              <TaskList tasks={mockTasks} />
            </div>
          )}
          {activeTab === "Access" && (
            <div className="bg-gray-50/2 p-4 rounded-2xl">
              <h2>Access Management</h2>
              <p>Manage access permissions for the project here.</p>
            </div>
          )}

          {activeTab === "Status" && (
            <div className="bg-gray-50/2 p-4 rounded-2xl">
              <h2>Project Status</h2>
              <p>Check the current status of the project.</p>
            </div>
          )}
          {activeTab === "Settings" && (
            <div className="bg-gray-50/2 p-4 rounded-2xl">
              <h2>Project Settings</h2>
              <p>Configure project settings here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
