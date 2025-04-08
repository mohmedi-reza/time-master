import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Icon name={icon} className={iconColor} />
          {title}
        </h3>
        {tasks.length === 0 ? (
          <p className="text-base-content/60">
            {t('calendar.todayOverview.tasks.noTasks')}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-base-200/50"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="checkbox checkbox-primary"
                  />
                  <span className={task.completed ? 'line-through text-base-content/60' : ''}>
                    {task.title}
                  </span>
                </div>
                {task.dueTime && (
                  <div className="text-sm text-base-content/60">
                    {t('calendar.task.dueTime')}: {task.dueTime}
                  </div>
                )}
              </div>
            ))}
            {tasks.some(task => task.completed) && (
              <div className="text-sm text-base-content/60 mt-2">
                {tasks.filter(task => task.completed).length} {t('calendar.todayOverview.tasks.completed')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList; 