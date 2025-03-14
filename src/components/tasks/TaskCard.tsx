import React from "react";
import Icon from "../common/icon/icon.component";
import { Task } from "../../interfaces/task.interface";

interface TaskCardProps {
  task: Task;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
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
    <div className="bg-base-200/50 hover:bg-base-200/70 transition-all duration-300 rounded-lg p-3 border border-accent/10">
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
          <button 
            className="btn btn-ghost btn-xs hover:bg-primary/10 transition-colors"
            onClick={() => onEdit(task.id)}
          >
            <Icon name="edit" className="text-base text-primary" />
          </button>
          <button 
            className="btn btn-ghost btn-xs hover:bg-error/10 transition-colors"
            onClick={() => onDelete(task.id)}
          >
            <Icon name="trash" className="text-base text-error" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 