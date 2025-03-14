import React from "react";
import Icon from "../common/icon/icon.component";
import { TaskStat } from "../../interfaces/task.interface";

interface StatCardProps {
  stat: TaskStat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <div className="card bg-base-100/50 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-base-content/60 text-sm font-medium">
              {stat.title}
            </p>
            <h3 className="text-xl font-bold mt-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {stat.value}
            </h3>
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon name={stat.icon} className="text-lg text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard; 