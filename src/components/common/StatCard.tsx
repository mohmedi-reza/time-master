import React from "react";
import Icon from "./icon/icon.component";
import { IconName } from "./icon/iconPack";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: IconName;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => (
  <div className="card bg-base-100/50 border border-accent/20 hover:  transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
    <div className="card-body p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-base-content/60 text-sm font-medium">{title}</p>
          <h3 className="text-xl font-bold mt-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{value}</h3>
        </div>
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon name={icon} className="text-lg text-primary" />
        </div>
      </div>
      <div className={`text-xs mt-3 ${change >= 0 ? "text-success" : "text-error"} font-medium`}>
        {change >= 0 ? (
          <span className="flex items-center gap-1">
            <Icon name="arrowUp" className="text-xs" />
            +{change}%
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Icon name="arrowDown" className="text-xs" />
            {change}%
          </span>
        )}
        <span className="text-base-content/60 ml-1">from last period</span>
      </div>
    </div>
  </div>
);

export default StatCard; 