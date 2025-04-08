import React from "react";
import { SettingSection } from "../../interfaces/setting.interface";
import Icon from "../common/icon/icon.component";
import { useTranslation } from "react-i18next";

interface SettingCardProps {
  section: SettingSection;
  onItemClick: (item: string) => void;
}

const SettingCard: React.FC<SettingCardProps> = ({ section, onItemClick }) => {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon name={section.icon} className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="card-title text-xl font-bold">{section.title}</h2>
            <p className="text-base-content/60">
              {t(`settings.sections.${section.title.toLowerCase()}.description`)}
            </p>
          </div>
        </div>
        <ul className="space-y-2">
          {section.items.map((item, index) => (
            <li
              key={index}
              onClick={() => onItemClick(item)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 cursor-pointer transition-colors duration-200"
            >
              <span className="text-base-content/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingCard; 