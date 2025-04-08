import React from "react";
import { useTranslation } from "react-i18next";
import SettingCard from "../../components/settings/SettingCard";
import AboutSection from "../../components/settings/AboutSection";
import { SettingSection, AboutInfo } from "../../interfaces/setting.interface";

const SettingPage: React.FC = () => {
  const { t } = useTranslation();

  // Mock settings sections data
  const settingSections: SettingSection[] = [
    {
      title: t('settings.sections.account.title'),
      icon: "user",
      items: [
        t('settings.sections.account.items.profile'),
        t('settings.sections.account.items.security'),
        t('settings.sections.account.items.notifications'),
      ],
    },
    {
      title: t('settings.sections.workspace.title'),
      icon: "setting",
      items: [
        t('settings.sections.workspace.items.theme'),
        t('settings.sections.workspace.items.language'),
        t('settings.sections.workspace.items.timezone'),
      ],
    },
    {
      title: t('settings.sections.integrations.title'),
      icon: "link",
      items: [
        t('settings.sections.integrations.items.apps'),
        t('settings.sections.integrations.items.api'),
        t('settings.sections.integrations.items.webhooks'),
      ],
    },
    {
      title: t('settings.sections.privacy.title'),
      icon: "shield",
      items: [
        t('settings.sections.privacy.items.data'),
        t('settings.sections.privacy.items.cookies'),
        t('settings.sections.privacy.items.policy'),
      ],
    },
  ];

  // Mock about info data
  const aboutInfo: AboutInfo = {
    version: "1.0.0",
    links: [
      { icon: "document", label: t('settings.about.links.docs') },
      { icon: "Support", label: t('settings.about.links.support') },
      { icon: "github", label: t('settings.about.links.github') },
    ],
  };

  const handleSettingItemClick = (item: string) => {
    // TODO: Implement setting item click handler
    console.log("Setting item clicked:", item);
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Header Section */}
      <div className="flex justify-between items-start animate-fade-in">
        <div className="space-y-1">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('settings.overview.title')}
          </h1>
          <p className="text-base-content/60 text-lg">
            {t('settings.overview.description')}
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        {settingSections.map((section, index) => (
          <SettingCard
            key={index}
            section={section}
            onItemClick={handleSettingItemClick}
          />
        ))}
      </div>

      {/* About Section */}
      <AboutSection info={aboutInfo} />
    </div>
  );
};

export default SettingPage;
