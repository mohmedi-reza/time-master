import React from "react";
import Icon from "../common/icon/icon.component";
import { SettingSection } from "../../interfaces/setting.interface";

interface SettingCardProps {
  section: SettingSection;
  onItemClick?: (item: string) => void;
}

const SettingCard: React.FC<SettingCardProps> = ({ section, onItemClick }) => {
  return (
    <div className="card bg-base-100/50 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Icon name={section.icon} className="text-2xl text-primary" />
          </div>
          <h2 className="card-title bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {section.title}
          </h2>
        </div>
        <ul className="space-y-3">
          {section.items.map((item, index) => (
            <li key={index}>
              <button 
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-base-content/80 hover:text-primary transition-all duration-300 flex items-center justify-between group"
                onClick={() => onItemClick?.(item)}
              >
                {item}
                <Icon 
                  name="arrowRight" 
                  className="text-xl text-primary opacity-0 group-hover:opacity-100 transition-all duration-300" 
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingCard; 