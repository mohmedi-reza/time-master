import React from "react";
import Icon from "./icon/icon.component";
import { IconName } from "./icon/iconPack";

interface ChartCardProps {
  title: string;
  icon: IconName;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, icon, children }) => (
  <div className="card bg-base-100/50 border border-accent/20 hover:  transition-all duration-300 backdrop-blur-sm">
    <div className="card-body p-4">
      <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
        <Icon name={icon} className="text-primary text-base" />
        {title}
      </h2>
      <div className="w-full h-[300px] mt-3">
        {children}
      </div>
    </div>
  </div>
);

export default ChartCard; 