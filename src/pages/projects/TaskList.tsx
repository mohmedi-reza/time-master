import React, { useState, useEffect } from "react";
import { Task } from "../../constants/mocks/mockTaskData";
import Icon from "../../components/common/icon/icon.component";
import { IconName } from "../../components/common/icon/iconPack";

// Extend the Task interface to include billableAmount
interface ExtendedTask extends Task {
  billableAmount?: number;
}

interface TaskListProps {
  tasks: ExtendedTask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // State to store timer values and running status per task
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [running, setRunning] = useState<{ [key: string]: boolean }>({});

  // Function to toggle the timer for a specific task
  const toggleTimer = (taskId: string) => {
    setRunning((prev) => ({
      ...prev,
      [taskId]: !prev[taskId], // Toggle running state
    }));

    if (!running[taskId]) {
      setTimers((prev) => ({
        ...prev,
        [taskId]: prev[taskId] || 0, // Ensure timer starts from 0 if undefined
      }));
    }
  };

  // Effect to increment timers when running
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        return Object.keys(prev).reduce((acc, taskId) => {
          acc[taskId] = running[taskId]
            ? (prev[taskId] || 0) + 1
            : prev[taskId] || 0;
          return acc;
        }, {} as { [key: string]: number });
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Tasks
        </h3>
        <div className="join bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl">
          <button className="btn btn-ghost btn-sm join-item">All</button>
          <button className="btn btn-ghost btn-sm join-item">Active</button>
          <button className="btn btn-ghost btn-sm join-item">Completed</button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
          >
            <div className="card-body p-4">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon name="square" className="text-xl text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base-content">{task.title}</h4>
                      <span className={`badge mt-1 ${
                        task.status === "Pending"
                          ? "badge-warning text-warning-content"
                          : task.status === "In Progress"
                          ? "badge-info text-info-content"
                          : "badge-success text-success-content"
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  {(() => {
                    let priorityColor = "text-info";
                    let bgColor = "bg-info/10";
                    let icon = "infoCircle";

                    switch (task.priority) {
                      case "Critical":
                        priorityColor = "text-warning";
                        bgColor = "bg-warning/10";
                        icon = "timer";
                        break;
                      case "High":
                        priorityColor = "text-error";
                        bgColor = "bg-error/10";
                        icon = "timer";
                        break;
                      case "Minor":
                        priorityColor = "text-success";
                        bgColor = "bg-success/10";
                        icon = "timer";
                        break;
                    }

                    return (
                      <div className={`flex items-center gap-2 ${priorityColor}`}>
                        <div className={`p-2 rounded-lg ${bgColor}`}>
                          <Icon name={icon as IconName} className="text-base" />
                        </div>
                        <span className="font-medium">{task.priority}</span>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex items-center gap-2">
                  <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                    {task.assignedUsers.slice(0, 4).map((user, index) => (
                      <div key={index} className="avatar">
                        <div className="w-8 h-8">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="rounded-xl grayscale hover:grayscale-0 transition-all duration-300 ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100"
                          />
                        </div>
                      </div>
                    ))}
                    {task.assignedUsers.length > 4 && (
                      <div className="avatar placeholder">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary">
                          <span className="text-xs">+{task.assignedUsers.length - 4}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="badge badge-primary badge-lg font-medium">
                    ${task.billableAmount || 0}
                  </div>
                  <div className="badge badge-secondary badge-lg font-medium font-mono">
                    {new Date((timers[task.id] || 0) * 1000)
                      .toISOString()
                      .substr(11, 8)}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    className={`btn btn-circle btn-ghost hover:bg-primary/10 transition-colors ${
                      running[task.id] ? "text-error" : "text-primary"
                    }`}
                    onClick={() => toggleTimer(task.id)}
                  >
                    <Icon
                      name={running[task.id] ? "stop" : "play"}
                      className="text-2xl"
                    />
                  </button>
                  <button className="btn btn-circle btn-ghost hover:bg-primary/10 transition-colors">
                    <Icon name="more" className="text-2xl text-primary" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
