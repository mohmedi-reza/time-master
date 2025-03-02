import React from "react";
import Icon from "../../components/common/icon/icon.component";
import { IconName } from "../../components/common/icon/iconPack";

const SettingPage: React.FC = () => {
  const settingSections = [
    {
      title: "Account Settings",
      icon: "user" as IconName,
      items: ["Profile Information", "Password & Security", "Notifications"],
    },
    {
      title: "Workspace",
      icon: "setting" as IconName,
      items: ["Theme", "Language", "Time Zone"],
    },
    {
      title: "Integrations",
      icon: "link" as IconName,
      items: ["Connected Apps", "API Keys", "Webhooks"],
    },
    {
      title: "Privacy",
      icon: "shield" as IconName,
      items: ["Data Usage", "Cookie Settings", "Privacy Policy"],
    },
  ];

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
          <div
            key={index}
            className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
          >
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
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-base-content/80 hover:text-primary transition-all duration-300 flex items-center justify-between group">
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
        ))}
      </div>

      {/* Additional Info */}
      <div className="card bg-base-100/50 border border-accent/20 shadow-lg backdrop-blur-sm animate-fade-in">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Icon name="infoCircle" className="text-2xl text-primary" />
            </div>
            <div>
              <h2 className="card-title bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About Time Master
              </h2>
              <p className="text-base-content/60">Version 1.0.0</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-300">
              <Icon name="document" className="text-xl text-primary" /> Documentation
            </button>
            <button className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-300">
              <Icon name="Support" className="text-xl text-primary" /> Support
            </button>
            <button className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-300">
              <Icon name="github" className="text-xl text-primary" /> GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
