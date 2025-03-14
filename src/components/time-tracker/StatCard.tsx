import React from "react";
import Icon from "../common/icon/icon.component";
import { IconName } from "../common/icon/iconPack";

interface StatCardProps {
  title: string;
  value: string;
  icon: IconName;
  change: number;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, index }) => {
  return (
    <div
      className="card bg-base-100/50 border border-accent/20 hover:transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-base-content/60 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-bold mt-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {value}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-primary/10">
            <Icon name={icon} className="text-2xl text-primary" />
          </div>
        </div>
        <div className={`text-sm mt-4 ${change >= 0 ? "text-success" : "text-error"} font-medium`}>
          {change >= 0 ? (
            <span className="flex items-center gap-1">
              <Icon name="arrowUp" />
              +{change}%
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Icon name="arrowDown" />
              {change}%
            </span>
          )}
          <span className="text-base-content/60 ml-1">from last week</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard; 