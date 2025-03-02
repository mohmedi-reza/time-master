import React from "react";
import WorkLogList from "../../components/time-tracker/WorkLogList";
import Icon from "../../components/common/icon/icon.component";
import { IconName } from "../../components/common/icon/iconPack";

const TimeTrackerPage: React.FC = () => {
  // Mock data for stats
  const stats = [
    { title: "Today's Hours", value: "08:45", icon: "clock", change: 12.5 },
    { title: "Week Total", value: "38:15", icon: "calendarTick", change: -2.4 },
    { title: "Tasks Done", value: "12", icon: "taskSquare", change: 8.1 },
    { title: "Billable Hours", value: "32:30", icon: "dollarCircle", change: 5.3 },
  ];

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="animate-fade-in space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Time Tracker
            </h1>
            <p className="text-base-content/60">Track and manage your working hours efficiently</p>
          </div>
          <button className="btn btn-primary gap-2 hover:scale-105 transition-all duration-300   rounded-xl">
            <Icon name="play" className="text-lg" />
            Start Timer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card bg-base-100/50 border border-accent/20   hover:   transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base-content/60 text-sm font-medium">{stat.title}</p>
                    <h3 className="text-3xl font-bold mt-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </h3>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon name={stat.icon as IconName} className="text-2xl text-primary" />
                  </div>
                </div>
                <div className={`text-sm mt-4 ${stat.change >= 0 ? "text-success" : "text-error"} font-medium`}>
                  {stat.change >= 0 ? (
                    <span className="flex items-center gap-1">
                      <Icon name="arrowUp" />
                      +{stat.change}%
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Icon name="arrowDown" />
                      {stat.change}%
                    </span>
                  )}
                  <span className="text-base-content/60 ml-1">from last week</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-fade-in">
        <WorkLogList />
      </div>
    </div>
  );
};

export default TimeTrackerPage;
