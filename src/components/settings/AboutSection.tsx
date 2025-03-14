import React from "react";
import Icon from "../common/icon/icon.component";
import { AboutInfo } from "../../interfaces/setting.interface";

interface AboutSectionProps {
  info: AboutInfo;
}

const AboutSection: React.FC<AboutSectionProps> = ({ info }) => {
  return (
    <div className="card bg-base-100/50 border border-accent/20 hover:border-accent/40 backdrop-blur-sm animate-fade-in">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Icon name="infoCircle" className="text-2xl text-primary" />
          </div>
          <div>
            <h2 className="card-title bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Time Master
            </h2>
            <p className="text-base-content/60">Version {info.version}</p>
          </div>
        </div>
        <div className="flex gap-4">
          {info.links.map((link, index) => (
            <button 
              key={index}
              className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-300"
            >
              <Icon name={link.icon} className="text-xl text-primary" /> {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection; 