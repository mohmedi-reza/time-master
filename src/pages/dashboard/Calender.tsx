import React, { useState } from "react";
import { startOfToday } from "date-fns";
import Icon from "../../components/common/icon/icon.component";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import TaskList from "../../components/calendar/TaskList";
import { Task } from "../../interfaces/calendar.interface";

const CalenderPage: React.FC = () => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState(today);
  
  // Mock tasks for demonstration
  const [tasks] = useState<Task[]>([
    { id: "1", title: "Team standup meeting", completed: false, dueTime: "10:00 AM" },
    { id: "2", title: "Review project proposal", completed: true, dueTime: "2:30 PM" },
    { id: "3", title: "Client presentation", completed: false, dueTime: "4:00 PM" },
    { id: "4", title: "Update documentation", completed: true },
  ]);

  const getTodaysTasks = () => tasks.filter(task => !task.completed);
  const getCompletedTasks = () => tasks.filter(task => task.completed);

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Calendar</h1>
          <p className="text-gray-400 mt-2">Manage your schedule and tasks</p>
        </div>
        <button className="btn btn-primary btn-lg gap-2 hover:scale-105 transition-transform">
          <Icon name="addSquare" className="text-xl" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Today's Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 border border-accent/40 hover:border-accent/60 transition-all duration-300 backdrop-blur-sm bg-opacity-80">
            <div className="card-body p-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="calendar" className="text-primary text-2xl" />
                Today's Overview
              </h2>
              <div className="divider my-4"></div>
              
              <div className="space-y-6">
                <TaskList
                  tasks={getTodaysTasks()}
                  title="Today's Tasks"
                  icon="taskSquare"
                />
                <TaskList
                  tasks={getCompletedTasks()}
                  title="Completed"
                  icon="tickCircle"
                  iconColor="text-success"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="lg:col-span-3">
          <CalendarGrid
            selectedDate={selectedDate}
            tasks={tasks}
            onSelectDate={setSelectedDate}
            onPrevMonth={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
            onNextMonth={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
            onToday={() => setSelectedDate(today)}
          />
        </div>
      </div>
    </div>
  );
};

export default CalenderPage;
