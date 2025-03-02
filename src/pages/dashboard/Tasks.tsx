import React from "react";
import Icon from "../../components/common/icon/icon.component";
import { IconName } from "../../components/common/icon/iconPack";

const TaskPage: React.FC = () => {
  // Mock statistics for the dashboard
  const stats = [
    { title: "Total Tasks", value: "24", icon: "taskSquare" },
    { title: "In Progress", value: "8", icon: "timer" },
    { title: "Completed", value: "12", icon: "tickCircle" },
    { title: "Overdue", value: "4", icon: "danger" },
  ];

  // Mock tasks data
  const tasks = [
    {
      id: 1,
      title: "Design System Updates",
      description: "Update the design system components to match new brand guidelines",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-03-20",
      assignee: "Alex Turner",
    },
    {
      id: 2,
      title: "API Integration",
      description: "Integrate payment gateway API for subscription handling",
      priority: "medium",
      status: "pending",
      dueDate: "2024-03-22",
      assignee: "Sarah Chen",
    },
    {
      id: 3,
      title: "Bug Fixes",
      description: "Fix reported issues in the dashboard analytics module",
      priority: "low",
      status: "completed",
      dueDate: "2024-03-18",
      assignee: "Mike Ross",
    },
    {
      id: 4,
      title: "User Documentation",
      description: "Create user documentation for new features",
      priority: "medium",
      status: "in-progress",
      dueDate: "2024-03-21",
      assignee: "Emily White",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-error";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
      default:
        return "text-base-content";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "badge-success";
      case "in-progress":
        return "badge-warning";
      case "pending":
        return "badge-ghost";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="p-4 space-y-6 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Header Section */}
      <div className="flex justify-between items-start animate-fade-in">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Tasks Dashboard
          </h1>
          <p className="text-base-content/60 text-sm">
            Track and manage your tasks efficiently
          </p>
        </div>
        <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform duration-300">
          <Icon name="addSquare" className="text-base" />
          New Task
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
          >
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base-content/60 text-sm font-medium">
                    {stat.title}
                  </p>
                  <h3 className="text-xl font-bold mt-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name={stat.icon as IconName} className="text-lg text-primary" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="card bg-base-100/50 border border-accent/20 shadow-lg backdrop-blur-sm animate-fade-in">
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Icon name="taskSquare" className="text-primary text-base" />
                Recent Tasks
              </h2>
              <p className="text-xs text-base-content/60">View and manage your tasks</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-300">
                <Icon name="filter" className="text-base text-primary" />
              </button>
              <button className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-300">
                <Icon name="sort" className="text-base text-primary" />
              </button>
            </div>
          </div>
          
          {/* Task List */}
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-base-200/50 hover:bg-base-200/70 transition-all duration-300 rounded-lg p-3 border border-accent/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                        • {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-base-content/60">{task.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Icon name="calendar" className="text-xs text-primary" />
                        <span className="text-xs">{task.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="profileuser" className="text-xs text-primary" />
                        <span className="text-xs">{task.assignee}</span>
                      </div>
                      <span className={`badge ${getStatusColor(task.status)} badge-xs px-2`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="btn btn-ghost btn-xs hover:bg-primary/10 transition-colors">
                      <Icon name="edit" className="text-base text-primary" />
                    </button>
                    <button className="btn btn-ghost btn-xs hover:bg-error/10 transition-colors">
                      <Icon name="trash" className="text-base text-error" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
            <p className="text-xs text-base-content/60">Showing 1-4 of 24 tasks</p>
            <div className="join shadow-lg">
              <button className="join-item btn btn-xs hover:bg-primary/10 transition-colors">
                <Icon name="arrowLeft2" className="text-base text-primary" />
              </button>
              <button className="join-item btn btn-xs btn-primary">1</button>
              <button className="join-item btn btn-xs hover:bg-primary/10 transition-colors">2</button>
              <button className="join-item btn btn-xs hover:bg-primary/10 transition-colors">3</button>
              <button className="join-item btn btn-xs hover:bg-primary/10 transition-colors">
                <Icon name="arrowRight2" className="text-base text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
