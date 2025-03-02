import React, { useState, useEffect } from "react";
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
  const [primaryColor, setPrimaryColor] = useState("#000");
  const [primaryColorLight, setPrimaryColorLight] = useState("#0002");

  useEffect(() => {
    // Get the computed primary color from a temporary element
    const tempElement = document.createElement('div');
    tempElement.className = 'bg-primary';
    document.body.appendChild(tempElement);
    const computedStyle = window.getComputedStyle(tempElement);
    const backgroundColor = computedStyle.backgroundColor;
    document.body.removeChild(tempElement);

    setPrimaryColor(backgroundColor);
    // Create a semi-transparent version for secondary series
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
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
        borderRadius: 12,
        borderRadiusApplication: "end",
        distributed: false,
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
      labels: { 
        style: { 
          colors: "#9ca3af",
          fontSize: '12px',
          fontWeight: 500
        } 
      },
    },
    yaxis: {
      title: {
        text: "Hours",
        style: { 
          color: "#9ca3af",
          fontSize: '13px',
          fontWeight: 600
        },
      },
      labels: { 
        style: { 
          colors: "#9ca3af",
          fontSize: '12px'
        } 
      },
    },
    fill: { 
      opacity: 1,
      type: 'solid'
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${val} hours` },
    },
    colors: [primaryColor, primaryColorLight],
    grid: {
      borderColor: 'rgba(156, 163, 175, 0.1)',
      strokeDashArray: 5,
    },
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
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    colors: [primaryColor, primaryColorLight],
    stroke: {
      curve: "smooth",
      width: 4,
      colors: [primaryColor, primaryColorLight],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { 
        style: { 
          colors: "#9ca3af",
          fontSize: '12px',
          fontWeight: 500
        } 
      },
    },
    yaxis: {
      labels: { 
        style: { 
          colors: "#9ca3af",
          fontSize: '12px'
        } 
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: true,
      },
      marker: {
        show: true,
      },
    },
    grid: {
      borderColor: 'rgba(156, 163, 175, 0.1)',
      strokeDashArray: 5,
    },
    markers: {
      size: 6,
      colors: [primaryColor, primaryColorLight],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        shadeIntensity: 0.2,
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 90, 100],
        gradientToColors: [primaryColorLight, primaryColorLight]
      }
    },
    legend: {
      labels: {
        colors: primaryColor
      },
      markers: {
        fillColors: [primaryColor, primaryColorLight],
        strokeWidth: 0,
        offsetX: 0,
        offsetY: 0,
        shape: "circle",
      },
    },
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
                ? "btn-primary shadow-lg" 
                : "bg-base-100/50 hover:bg-base-100"
              }`}
              onClick={() => setDateRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-all duration-300 shadow-lg rounded-lg">
          <Icon name="documentDownload" className="text-base" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base-content/60 text-sm font-medium">{stat.title}</p>
                  <h3 className="text-xl font-bold mt-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{stat.value}</h3>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name={stat.icon} className="text-lg text-primary" />
                </div>
              </div>
              <div className={`text-xs mt-3 ${stat.change >= 0 ? "text-success" : "text-error"} font-medium`}>
                {stat.change >= 0 ? (
                  <span className="flex items-center gap-1">
                    <Icon name="arrowUp" className="text-xs" />
                    +{stat.change}%
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Icon name="arrowDown" className="text-xs" />
                    {stat.change}%
                  </span>
                )}
                <span className="text-base-content/60 ml-1">from last {dateRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
          <div className="card-body p-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
              <Icon name="chart" className="text-primary text-base" />
              Team Working Hours vs Target
            </h2>
            <div className="w-full h-[300px] mt-3">
              <ReactApexChart
                options={barChartOptions}
                series={barChartSeries}
                type="bar"
                height="100%"
              />
            </div>
          </div>
        </div>

        <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
          <div className="card-body p-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
              <Icon name="chart2" className="text-primary text-base" />
              Weekly Trends
            </h2>
            <div className="w-full h-[300px] mt-3">
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
      <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Icon name="people" className="text-primary text-base" />
                Group Statistics
              </h2>
              <p className="text-xs text-base-content/60">Performance metrics by team</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr className="border-b border-accent/20">
                  <th className="text-xs font-medium">Group Name</th>
                  <th className="text-xs font-medium">Hours / Target</th>
                  <th className="text-xs font-medium">Tasks Progress</th>
                  <th className="text-xs font-medium">Completion Rate</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {groupTimeData.map((group, index) => (
                  <tr key={index} className="hover:bg-base-200/50 transition-colors border-b border-accent/10">
                    <td className="font-medium">{group.group}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{group.hours}/{group.target} hrs</span>
                        <progress
                          className="progress progress-primary w-20 h-2"
                          value={group.hours}
                          max={group.target}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{group.completedTasks}/{group.totalTasks} tasks</span>
                        <progress
                          className="progress progress-success w-20 h-2"
                          value={group.completedTasks}
                          max={group.totalTasks}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-primary badge-sm font-medium">
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
      <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Icon name="profileuser" className="text-primary text-base" />
                Individual Contributors
              </h2>
              <p className="text-xs text-base-content/60">Performance metrics by team member</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr className="border-b border-accent/20">
                  <th className="text-xs font-medium">User</th>
                  <th className="text-xs font-medium">Section</th>
                  <th className="text-xs font-medium">Hours</th>
                  <th className="text-xs font-medium">Tasks</th>
                  <th className="text-xs font-medium">Efficiency</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {userData.map((user, index) => (
                  <tr key={index} className="hover:bg-base-200/50 transition-colors border-b border-accent/10">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-lg ring-1 ring-primary/20 ring-offset-base-100 ring-offset-1">
                            <img src={user.avatar} alt={user.name} className="grayscale hover:grayscale-0 transition-all duration-300" />
                          </div>
                        </div>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </td>
                    <td className="font-medium">{user.section}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.hours} hrs</span>
                        <progress
                          className="progress progress-primary w-20 h-2"
                          value={user.hours}
                          max={50}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.tasks.completed}/{user.tasks.total}</span>
                        <progress
                          className="progress progress-success w-20 h-2"
                          value={user.tasks.completed}
                          max={user.tasks.total}
                        />
                      </div>
                    </td>
                    <td>
                      <div className={`badge ${
                        user.efficiency >= 90 ? 'badge-success' : 'badge-warning'
                      } badge-sm font-medium`}>
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
