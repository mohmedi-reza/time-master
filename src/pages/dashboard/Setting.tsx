import React from "react";
import SettingCard from "../../components/settings/SettingCard";
import AboutSection from "../../components/settings/AboutSection";
import { SettingSection, AboutInfo } from "../../interfaces/setting.interface";

const SettingPage: React.FC = () => {
  // Mock settings sections data
  const settingSections: SettingSection[] = [
    {
      title: "Account Settings",
      icon: "user",
      items: ["Profile Information", "Password & Security", "Notifications"],
    },
    {
      title: "Workspace",
      icon: "setting",
      items: ["Theme", "Language", "Time Zone"],
    },
    {
      title: "Integrations",
      icon: "link",
      items: ["Connected Apps", "API Keys", "Webhooks"],
    },
    {
      title: "Privacy",
      icon: "shield",
      items: ["Data Usage", "Cookie Settings", "Privacy Policy"],
    },
  ];

  // Mock about info data
  const aboutInfo: AboutInfo = {
    version: "1.0.0",
    links: [
      { icon: "document", label: "Documentation" },
      { icon: "Support", label: "Support" },
      { icon: "github", label: "GitHub" },
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
            Settings
          </h1>
          <p className="text-base-content/60 text-lg">
            Customize your workspace preferences
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
