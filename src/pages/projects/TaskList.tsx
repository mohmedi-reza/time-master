import React, { useState, useEffect } from "react";
import { Task } from "../../constants/mocks/mockTaskData";
import Icon from "../../components/common/icon/icon.component";

interface TaskListProps {
  tasks: Task[];
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
    <div className="rounded-lg">
      {/* Section title */}
      <h3 className="text-lg font-bold mb-4">On Hold</h3>

      <div className="">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-1 justify-end sm:grid-cols-2 lg:grid-cols-6 p-4 hover:bg-gray-700 rounded-lg"
          >
            {/* Task information */}
            <div className="flex flex-col items-start justify-start gap-2">
              <p className="font-medium">{task.title}</p>
            </div>

            {/* Task status */}
            <div className="flex items-center justify-end">
              <span
                className={`badge badge-soft ${
                  task.status === "Pending"
                    ? "badge-warning"
                    : task.status === "In Progress"
                    ? "badge-info"
                    : "badge-success"
                }`}
              >
                {task.status}
              </span>
            </div>

            {/* Task priority */}
            <div className="flex items-center justify-end">
              {(() => {
                let priorityColor = "text-info";
                let statusClass = "status-info";

                switch (task.priority) {
                  case "Critical":
                    priorityColor = "text-warning";
                    statusClass = "status-warning ";
                    break;
                  case "High":
                    priorityColor = "text-error";
                    statusClass = "status-error animate-ping";
                    break;
                  case "Minor":
                    priorityColor = "text-success";
                    statusClass = "status-success";
                    break;
                }

                return (
                  <span className="badge badge-soft text-xs font-medium">
                    <div className={`status ${statusClass}`}></div>
                    <span className={` ${priorityColor}`}>{task.priority}</span>
                  </span>
                );
              })()}
            </div>

            {/* Assigned users avatars */}
            <div className="flex items-center justify-end -space-x-2">
              {task.assignedUsers.slice(0, 4).map((user, index) => (
                <img
                  key={index}
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}

              {/* Display "+X" if there are more than 4 users */}
              {task.assignedUsers.length > 4 && (
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium border-2 border-white">
                  +{task.assignedUsers.length - 4}
                </span>
              )}
            </div>

            {/* Timer display with fix */}
            <div className="flex items-center gap-2 justify-end">
              <span className="badge badge-soft badge-accent font-semibold">
                $245
              </span>
              <div className="badge badge-soft badge-accent font-bold ">
                <span className="text-white">
                  {new Date((timers[task.id] || 0) * 1000)
                    .toISOString()
                    .substr(11, 8)}
                </span>
              </div>
            </div>

            {/* Play/Stop button */}
            <div className="flex items-center gap-2 justify-between ps-3">
              <button
                className={`btn shadow-0 btn-circle ${
                  running[task.id] ? " bg-pink-800" : " hover:[bg-accent]"
                }`}
                onClick={() => toggleTimer(task.id)}
              >
                <Icon
                  name={running[task.id] ? "stop" : "play"}
                  className="text-2xl"
                />
              </button>
              <button className="text-gray-500">
                <Icon name={"more"} className="text-3xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
