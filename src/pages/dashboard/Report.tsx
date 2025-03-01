import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Icon from "../../components/common/icon/icon.component";
import { IconName } from "../../components/common/icon/iconPack";
interface TimeData {
  group: string;
  hours: number;
  target: number;
  completedTasks: number;
  totalTasks: number;
}

interface UserTimeData {
  name: string;
  avatar: string;
  hours: number;
  section: string;
  efficiency: number;
  tasks: {
    completed: number;
    total: number;
  };
}

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: IconName;
}

const ReportPage: React.FC = () => {
  const [dateRange, setDateRange] = useState("week");

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

  const stats: StatCard[] = [
    {
      title: "Total Hours",
      value: groupTimeData.reduce((acc, curr) => acc + curr.hours, 0),
      change: 12.5,
      icon: "clock",
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

  // Bar Chart Options
  const barChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 8,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: groupTimeData.map((item) => item.group),
      labels: { style: { colors: "#9ca3af" } },
    },
    yaxis: {
      title: {
        text: "Hours",
        style: { color: "#9ca3af" },
      },
      labels: { style: { colors: "#9ca3af" } },
    },
    fill: { opacity: 1 },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${val} hours` },
    },
    colors: ["hsl(var(--p))", "hsl(var(--n))"],
  };

  const barChartSeries = [
    {
      name: "Working Hours",
      data: groupTimeData.map((item) => item.hours),
    },
    {
      name: "Target Hours",
      data: groupTimeData.map((item) => item.target - item.hours),
    },
  ];

  // Line Chart Options for Trends
  const lineChartOptions: ApexOptions = {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: "#9ca3af" } },
    },
    yaxis: {
      labels: { style: { colors: "#9ca3af" } },
    },
    tooltip: {
      theme: "dark",
    },
    colors: ["hsl(var(--p))", "hsl(var(--s))"],
  };

  const lineChartSeries = [
    {
      name: "Hours Worked",
      data: [30, 40, 35, 50, 49, 20, 25],
    },
    {
      name: "Tasks Completed",
      data: [20, 25, 30, 35, 30, 15, 20],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-black">Reports</h1>
        <p className="text-gray-400">View detailed reports of your activities.</p>
      </div>

      {/* Date Range Filter */}
      <div className="flex justify-between items-center">
        <div className="join">
          {["day", "week", "month", "year"].map((range) => (
            <button
              key={range}
              className={`join-item btn ${dateRange === range ? "btn-primary" : ""}`}
              onClick={() => setDateRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn btn-primary gap-2">
          <Icon name="documentDownload" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base-content/60">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-base-content">{stat.value}</h3>
                </div>
                <Icon name={stat.icon} />
              </div>
              <div className={`text-sm ${stat.change >= 0 ? "text-success" : "text-error"}`}>
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
                from last {dateRange}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Team Working Hours vs Target</h2>
            <div className="w-full h-[300px]">
              <ReactApexChart
                options={barChartOptions}
                series={barChartSeries}
                type="bar"
                height="100%"
              />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Weekly Trends</h2>
            <div className="w-full h-[300px]">
              <ReactApexChart
                options={lineChartOptions}
                series={lineChartSeries}
                type="line"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Groups Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Group Statistics</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Hours / Target</th>
                  <th>Tasks Progress</th>
                  <th>Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {groupTimeData.map((group, index) => (
                  <tr key={index}>
                    <td>{group.group}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>{group.hours}/{group.target} hrs</span>
                        <progress
                          className="progress progress-primary w-20"
                          value={group.hours}
                          max={group.target}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>{group.completedTasks}/{group.totalTasks} tasks</span>
                        <progress
                          className="progress progress-success w-20"
                          value={group.completedTasks}
                          max={group.totalTasks}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-primary">
                        {((group.completedTasks / group.totalTasks) * 100).toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Individual Contributors Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Individual Contributors</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Section</th>
                  <th>Hours</th>
                  <th>Tasks</th>
                  <th>Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-full">
                            <img src={user.avatar} alt={user.name} />
                          </div>
                        </div>
                        <div>{user.name}</div>
                      </div>
                    </td>
                    <td>{user.section}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>{user.hours} hrs</span>
                        <progress
                          className="progress progress-primary w-20"
                          value={user.hours}
                          max={50}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>{user.tasks.completed}/{user.tasks.total}</span>
                        <progress
                          className="progress progress-success w-20"
                          value={user.tasks.completed}
                          max={user.tasks.total}
                        />
                      </div>
                    </td>
                    <td>
                      <div className={`badge ${user.efficiency >= 90 ? 'badge-success' : 'badge-warning'}`}>
                        {user.efficiency}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
