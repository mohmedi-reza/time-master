import React, { useState, useEffect } from "react";
import StatCard from "../../components/common/StatCard";
import TeamWorkingHoursChart from "../../components/report/TeamWorkingHoursChart";
import WeeklyTrendsChart from "../../components/report/WeeklyTrendsChart";
import GroupStatisticsTable from "../../components/report/GroupStatisticsTable";
import ContributorsTable from "../../components/report/ContributorsTable";
import Icon from "../../components/common/icon/icon.component";
import { IconName } from "../../components/common/icon/iconPack";
import { TimeData, UserTimeData } from "../../interfaces/report.interface";

const ReportPage: React.FC = () => {
  const [dateRange, setDateRange] = useState("week");
  const [primaryColor, setPrimaryColor] = useState("#000");
  const [primaryColorLight, setPrimaryColorLight] = useState("#0002");

  useEffect(() => {
    const tempElement = document.createElement('div');
    tempElement.className = 'bg-primary';
    document.body.appendChild(tempElement);
    const computedStyle = window.getComputedStyle(tempElement);
    const backgroundColor = computedStyle.backgroundColor;
    document.body.removeChild(tempElement);

    setPrimaryColor(backgroundColor);
    setPrimaryColorLight(backgroundColor.replace(')', ', 0.3)').replace('rgb', 'rgba'));
  }, []);

  // Mock data - replace with actual data from your backend
  const groupTimeData: TimeData[] = [
    { group: "Development Team", hours: 120, target: 150, completedTasks: 45, totalTasks: 60 },
    { group: "Design Team", hours: 85, target: 100, completedTasks: 28, totalTasks: 35 },
    { group: "Marketing Team", hours: 65, target: 80, completedTasks: 20, totalTasks: 25 },
  ];

  const userData: UserTimeData[] = [
    {
      name: "John Doe",
      avatar: "https://avatar.iran.liara.run/username?username=johndoe",
      hours: 42,
      section: "Frontend Development",
      efficiency: 92,
      tasks: { completed: 15, total: 18 },
    },
    {
      name: "Jane Smith",
      avatar: "https://avatar.iran.liara.run/username?username=janesmith",
      hours: 38,
      section: "UI Design",
      efficiency: 88,
      tasks: { completed: 12, total: 15 },
    },
  ];

  const stats: { title: string; value: string | number; change: number; icon: IconName; }[] = [
    {
      title: "Total Hours",
      value: groupTimeData.reduce((acc, curr) => acc + curr.hours, 0),
      change: 12.5,
      icon: "timer",
    },
    {
      title: "Team Efficiency",
      value: "87%",
      change: 4.2,
      icon: "chart",
    },
    {
      title: "Tasks Completed",
      value: groupTimeData.reduce((acc, curr) => acc + curr.completedTasks, 0),
      change: -2.4,
      icon: "task",
    },
    {
      title: "Active Projects",
      value: 12,
      change: 8.1,
      icon: "folder",
    },
  ];

  return (
    <div className="p-4 space-y-6 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="animate-fade-in space-y-1">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Reports & Analytics
        </h1>
        <p className="text-base-content/60 text-sm">Track your team's performance and productivity metrics</p>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 animate-fade-in">
        <div className="join gap-2 bg-base-100/50 p-1 rounded-lg backdrop-blur-sm border border-accent/20">
          {["day", "week", "month", "year"].map((range) => (
            <button
              key={range}
              className={`join-item btn btn-sm rounded-lg hover:scale-105 transition-all duration-300 ${
                dateRange === range 
                ? "btn-primary  " 
                : "bg-base-100/50 hover:bg-base-100"
              }`}
              onClick={() => setDateRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-all duration-300 rounded-lg">
          <Icon name="documentDownload" className="text-base" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TeamWorkingHoursChart
          data={groupTimeData}
          primaryColor={primaryColor}
          primaryColorLight={primaryColorLight}
        />
        <WeeklyTrendsChart
          primaryColor={primaryColor}
          primaryColorLight={primaryColorLight}
        />
      </div>

      {/* Tables Section */}
      <GroupStatisticsTable data={groupTimeData} />
      <ContributorsTable data={userData} />
    </div>
  );
};

export default ReportPage;
