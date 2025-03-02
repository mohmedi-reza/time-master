import React from 'react';
import Icon from './icon/icon.component';
import { IconName } from './icon/iconPack';

interface ConnectionCardProps {
  serviceName: string;
  serviceIcon: IconName;
  isConnected: boolean;
  lastSync?: string;
  description: string;
  onToggleConnection: () => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  serviceName,
  serviceIcon,
  isConnected,
  lastSync,
  description,
  onToggleConnection,
}) => {
  return (
    <div className="card bg-gradient-to-br from-base-100 to-base-200 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
              <Icon name={serviceIcon} className="text-3xl text-primary" />
            </div>
            <div>
              <h2 className="card-title bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{serviceName}</h2>
              <p className="text-sm text-base-content/60">{description}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className={`badge ${isConnected ? 'badge-primary' : 'badge-error'} font-medium`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
            {lastSync && (
              <span className="text-xs text-base-content/50 mt-1">
                Last sync: {lastSync}
              </span>
            )}
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button 
            className={`btn btn-sm ${isConnected ? 'btn-error' : 'btn-primary'} hover:scale-105 transition-transform duration-300`} 
            onClick={onToggleConnection}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard; 