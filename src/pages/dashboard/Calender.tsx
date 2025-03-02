import React, { useState } from "react";
import { format, startOfToday, eachDayOfInterval, startOfMonth, endOfMonth, isToday, isSameMonth } from "date-fns";
import Icon from "../../components/common/icon/icon.component";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueTime?: string;
}

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

  const days = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

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
          <Icon name="add" className="text-xl" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Today's Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 border border-accent/40 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-opacity-80">
            <div className="card-body p-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="calendar" className="text-primary text-2xl" />
                {format(today, 'EEEE, MMMM d')}
              </h2>
              <div className="divider my-4"></div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Icon name="taskSquare" className="text-primary" />
                    Today's Tasks
                  </h3>
                  {getTodaysTasks().length === 0 ? (
                    <p className="text-base-content/60 p-4 bg-base-200/50 rounded-lg text-center">No tasks scheduled for today</p>
                  ) : (
                    <div className="space-y-3">
                      {getTodaysTasks().map(task => (
                        <div key={task.id} className="flex items-center gap-3 p-4 rounded-lg bg-base-200/50 hover:bg-base-200/70 transition-colors">
                          <input type="checkbox" className="checkbox checkbox-primary" />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            {task.dueTime && (
                              <p className="text-sm text-base-content/70 flex items-center gap-1 mt-1">
                                <Icon name="timer" className="text-primary text-base" />
                                {task.dueTime}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Icon name="tickCircle" className="text-success" />
                    Completed
                  </h3>
                  {getCompletedTasks().length === 0 ? (
                    <p className="text-base-content/60 p-4 bg-base-200/50 rounded-lg text-center">No completed tasks</p>
                  ) : (
                    <div className="space-y-3">
                      {getCompletedTasks().map(task => (
                        <div key={task.id} className="flex items-center gap-3 p-4 rounded-lg bg-base-200/50 hover:bg-base-200/70 transition-colors">
                          <input type="checkbox" checked className="checkbox checkbox-success" />
                          <div>
                            <p className="font-medium line-through opacity-70">{task.title}</p>
                            {task.dueTime && (
                              <p className="text-sm text-base-content/70 flex items-center gap-1 mt-1">
                                <Icon name="timer" className="text-success text-base" />
                                {task.dueTime}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="lg:col-span-3">
          <div className="card bg-base-100/50 border border-accent/20 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {format(selectedDate, 'MMMM yyyy')}
                </h2>
                <div className="join shadow-lg">
                  <button className="join-item btn btn-sm hover:bg-primary/10 transition-colors"
                    onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}>
                    <Icon name="arrowLeft2" className="text-lg text-primary" />
                  </button>
                  <button className="join-item btn btn-sm btn-primary"
                    onClick={() => setSelectedDate(today)}>
                    Today
                  </button>
                  <button className="join-item btn btn-sm hover:bg-primary/10 transition-colors"
                    onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}>
                    <Icon name="arrowRight2" className="text-lg text-primary" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="font-medium text-base-content/70 py-1 text-xs">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {days.map((day) => {
                  const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                  const hasEvents = tasks.length > 0; // Simplified check for demo

                  return (
                    <div
                      key={day.toString()}
                      className={`
                        relative group h-9
                        flex flex-col items-center justify-center rounded-lg cursor-pointer
                        hover:bg-primary/10 transition-all duration-200
                        border border-accent/10 hover:border-primary/30
                        ${isToday(day) ? 'bg-primary/20 text-primary font-medium shadow-sm' : ''}
                        ${isSelected ? 'bg-primary text-primary-content shadow-lg scale-105 hover:bg-primary hover:text-primary-content' : ''}
                        ${!isSameMonth(day, selectedDate) ? 'text-base-content/30' : ''}
                      `}
                      onClick={() => setSelectedDate(day)}
                    >
                      <span className={`text-sm ${isSelected ? 'font-bold' : ''}`}>
                        {format(day, 'd')}
                      </span>
                      {hasEvents && !isSelected && isSameMonth(day, selectedDate) && (
                        <div className="absolute bottom-1 flex gap-0.5">
                          <div className="w-0.5 h-0.5 rounded-full bg-primary/60"></div>
                        </div>
                      )}
                      {hasEvents && isSelected && (
                        <div className="text-[10px] mt-0.5 font-medium">
                          {tasks.length} tasks
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mini Events Preview */}
              <div className="mt-4 pt-4 border-t border-accent/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-base-content/80">
                    {format(selectedDate, 'MMMM d, yyyy')}
                  </h3>
                  <button className="btn btn-ghost btn-sm px-2 hover:bg-primary/10">
                    <Icon name="addSquare" className="text-lg text-primary" />
                  </button>
                </div>
                <div className="space-y-1.5">
                  {tasks.length === 0 ? (
                    <p className="text-center py-3 text-base-content/60 text-sm">
                      No events scheduled
                    </p>
                  ) : (
                    tasks.map(task => (
                      <div 
                        key={task.id}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-base-200/50 hover:bg-base-200/70 transition-all duration-300 group"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${task.completed ? 'bg-success' : 'bg-primary'}`} />
                        <span className={task.completed ? 'line-through opacity-60' : ''}>
                          {task.title}
                        </span>
                        {task.dueTime && (
                          <span className="text-xs text-base-content/60 ml-auto">
                            {task.dueTime}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderPage;
