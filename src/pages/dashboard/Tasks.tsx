import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../components/common/icon/icon.component";
import StatCard from "../../components/tasks/StatCard";
import TaskList from "../../components/tasks/TaskList";
import { Task, TaskStat } from "../../interfaces/task.interface";

const TaskPage: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  // Mock statistics for the dashboard
  const stats: TaskStat[] = [
    { title: t('tasks.stats.total'), value: "24", icon: "taskSquare" },
    { title: t('tasks.stats.inProgress'), value: "8", icon: "timer" },
    { title: t('tasks.stats.completed'), value: "12", icon: "tickCircle" },
    { title: t('tasks.stats.overdue'), value: "4", icon: "danger" },
  ];

  // Mock tasks data
  const tasks: Task[] = [
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

  const handleEditTask = (taskId: number) => {
    // TODO: Implement edit task functionality
    console.log("Edit task:", taskId);
  };

  const handleDeleteTask = (taskId: number) => {
    // TODO: Implement delete task functionality
    console.log("Delete task:", taskId);
  };

  return (
    <div className="p-4 space-y-6 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Header Section */}
      <div className="flex justify-between items-start animate-fade-in">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('tasks.overview.title')}
          </h1>
          <p className="text-base-content/60 text-sm">
            {t('tasks.overview.subtitle')}
          </p>
        </div>
        <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform duration-300">
          <Icon name="addSquare" className="text-base" />
          {t('tasks.actions.newTask')}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        totalTasks={24}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TaskPage;
