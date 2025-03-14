import React from "react";
import Icon from "../common/icon/icon.component";
import { IconName } from "../common/icon/iconPack";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  isConnected: boolean;
  lastSync?: string;
  onToggle: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  icon,
  isConnected,
  lastSync,
  onToggle,
}) => (
  <div className="card bg-base-100 border border-accent/40 hover:  transition-all duration-300 backdrop-blur-sm bg-opacity-80">
    <div className="card-body p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-base-200/50 flex items-center justify-center">
            <Icon name={icon} className="text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-base-content/60 text-sm">{description}</p>
          </div>
        </div>
        <label className="swap">
          <input
            type="checkbox"
            checked={isConnected}
            onChange={() => onToggle(id)}
          />
          <div className="swap-on">
            <div className="badge badge-success gap-2 p-3">
              <Icon name="tickCircle" className="text-base" />
              Connected
            </div>
          </div>
          <div className="swap-off">
            <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform">
              <Icon name="link" className="text-base" />
              Connect
            </button>
          </div>
        </label>
      </div>
      {lastSync && (
        <div className="mt-4 flex items-center gap-2 text-sm text-base-content/60">
          <Icon name="timer" className="text-base" />
          Last synced: {lastSync}
        </div>
      )}
    </div>
  </div>
);

export default ServiceCard; 