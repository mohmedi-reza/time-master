import React from "react";
import Icon from "../common/icon/icon.component";
import { Task } from "../../interfaces/calendar.interface";
import { IconName } from "../common/icon/iconPack";

interface TaskListProps {
  tasks: Task[];
  title: string;
  icon: IconName;
  iconColor?: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, title, icon, iconColor = "text-primary" }) => {
  return (
    <div>
      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
        <Icon name={icon} className={iconColor} />
        {title}
      </h3>
      {tasks.length === 0 ? (
        <p className="text-base-content/60 p-4 bg-base-200/50 rounded-lg text-center">
          No tasks scheduled
        </p>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center gap-3 p-4 rounded-lg bg-base-200/50 hover:bg-base-200/70 transition-colors">
              <input 
                type="checkbox" 
                className={`checkbox ${task.completed ? 'checkbox-success' : 'checkbox-primary'}`}
                checked={task.completed}
                readOnly
              />
              <div>
                <p className={`font-medium ${task.completed ? 'line-through opacity-70' : ''}`}>
                  {task.title}
                </p>
                {task.dueTime && (
                  <p className="text-sm text-base-content/70 flex items-center gap-1 mt-1">
                    <Icon name="timer" className={`text-base ${task.completed ? 'text-success' : 'text-primary'}`} />
                    {task.dueTime}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList; 