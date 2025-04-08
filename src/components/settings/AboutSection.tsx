import React from "react";
import { useTranslation } from "react-i18next";
import { AboutInfo } from "../../interfaces/setting.interface";
import Icon from "../common/icon/icon.component";

interface AboutSectionProps {
  info: AboutInfo;
}

const AboutSection: React.FC<AboutSectionProps> = ({ info }) => {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-xl font-bold mb-4">
          {t('settings.about.title')}
        </h2>
        <p className="text-base-content/60 mb-4">
          {t('settings.about.description')}
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-base-content/60">{t('settings.about.version')}:</span>
            <span className="font-semibold">{info.version}</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {info.links.map((link, index) => (
              <button
                key={index}
                className="btn btn-ghost gap-2"
              >
                <Icon name={link.icon} className="w-5 h-5" />
                <span>{t(`settings.about.links.${link.label.toLowerCase()}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection; 