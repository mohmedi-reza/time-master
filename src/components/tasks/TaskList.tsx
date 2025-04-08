import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "../common/icon/icon.component";
import TaskCard from "./TaskCard";
import { Task } from "../../interfaces/task.interface";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  totalTasks: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
  totalTasks,
  currentPage,
  onPageChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100/50 border border-accent/20 backdrop-blur-sm">
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Icon name="taskSquare" className="text-primary text-base" />
              {t('tasks.list.title')}
            </h2>
            <p className="text-xs text-base-content/60">{t('tasks.list.subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <button 
              className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-300"
              title={t('tasks.actions.filter')}
            >
              <Icon name="filter" className="text-base text-primary" />
            </button>
            <button 
              className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-300"
              title={t('tasks.actions.sort')}
            >
              <Icon name="sort" className="text-base text-primary" />
            </button>
          </div>
        </div>
        
        {/* Task List */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
          <p className="text-xs text-base-content/60">
            {t('tasks.pagination.showing', {
              start: (currentPage - 1) * 4 + 1,
              end: Math.min(currentPage * 4, totalTasks),
              total: totalTasks
            })}
          </p>
          <div className="join">
            <button 
              className="join-item btn btn-xs hover:bg-primary/10 transition-colors"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Icon name="arrowLeft2" className="text-base text-primary" />
            </button>
            {[...Array(Math.ceil(totalTasks / 4))].map((_, index) => (
              <button
                key={index}
                className={`join-item btn btn-xs ${
                  currentPage === index + 1 ? 'btn-primary' : 'hover:bg-primary/10 transition-colors'
                }`}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button 
              className="join-item btn btn-xs hover:bg-primary/10 transition-colors"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalTasks / 4)}
            >
              <Icon name="arrowRight2" className="text-base text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList; 