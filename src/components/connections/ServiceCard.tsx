import React from "react";
import { useTranslation } from "react-i18next";
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
}) => {
  const { t } = useTranslation();

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon name={icon} className="w-6 h-6 text-primary" />
          </div>
          <h2 className="card-title text-xl font-bold">{name}</h2>
        </div>
        <p className="text-base-content/60 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <label className="swap">
            <input
              type="checkbox"
              checked={isConnected}
              onChange={() => onToggle(id)}
            />
            <div className="swap-on">
              <div className="badge badge-success gap-2 p-3">
                <Icon name="tickCircle" className="text-base" />
                {t('connections.service.connected')}
              </div>
            </div>
            <div className="swap-off">
              <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform">
                <Icon name="link" className="text-base" />
                {t('connections.service.connect')}
              </button>
            </div>
          </label>
        </div>
        {lastSync && (
          <div className="mt-4 flex items-center gap-2 text-sm text-base-content/60">
            <Icon name="timer" className="text-base" />
            {t('connections.service.lastSync')}: {lastSync}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard; 