import React from "react";
import StatCard from "./StatCard";
import { IconName } from "../common/icon/iconPack";

interface StatData {
  title: string;
  value: string;
  icon: IconName;
  change: number;
}

const StatsGrid: React.FC = () => {
  const stats: StatData[] = [
    { title: "Today's Hours", value: "08:45", icon: "clock", change: 12.5 },
    { title: "Week Total", value: "38:15", icon: "calendarTick", change: -2.4 },
    { title: "Tasks Done", value: "12", icon: "taskSquare", change: 8.1 },
    { title: "Billable Hours", value: "32:30", icon: "dollarCircle", change: 5.3 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} index={index} />
      ))}
    </div>
  );
};

export default StatsGrid; 