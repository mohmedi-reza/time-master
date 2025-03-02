import React, { useState, CSSProperties } from "react";
import { services } from "../../constants/services";
import Icon from "../../components/common/icon/icon.component";

interface ConnectionState {
  [key: string]: {
    isConnected: boolean;
    lastSync?: string;
  };
}

const ConnectionPage: React.FC = () => {
  const [connections, setConnections] = useState<ConnectionState>({
    jira: { isConnected: true, lastSync: "2024-03-15 10:30 AM" },
    confluence: { isConnected: true, lastSync: "2024-03-15 09:45 AM" },
    trello: { isConnected: false },
    slack: { isConnected: true, lastSync: "2024-03-15 11:00 AM" },
    github: { isConnected: false },
    gitlab: { isConnected: true, lastSync: "2024-03-15 10:15 AM" },
  });

  const handleToggleConnection = (serviceId: string) => {
    setConnections(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        isConnected: !prev[serviceId]?.isConnected,
        lastSync: prev[serviceId]?.isConnected ? undefined : new Date().toLocaleString(),
      }
    }));
  };

  const connectedCount = Object.values(connections).filter(conn => conn.isConnected).length;
  const totalCount = Object.keys(connections).length;

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Connections
          </h1>
          <p className="text-gray-400 mt-2">Connect and manage your integrations with various services.</p>
        </div>
        <div className="card bg-base-100 border border-accent/40 shadow-lg backdrop-blur-sm bg-opacity-80 p-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-base-content/60">Connected Services</span>
              <span className="text-2xl font-bold text-primary">{connectedCount}/{totalCount}</span>
            </div>
            <div 
              className="radial-progress text-primary" 
              style={{ '--value': (connectedCount/totalCount) * 100 } as CSSProperties}
            >
              {Math.round((connectedCount/totalCount) * 100)}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="card bg-base-100 border border-accent/40 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-80"
          >
            <div className="card-body p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-base-200/50 flex items-center justify-center">
                  <Icon name={service.icon} className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{service.name}</h3>
                    <p className="text-base-content/60 text-sm">{service.description}</p>
                  </div>
                </div>
                <label className="swap">
                  <input
                    type="checkbox"
                    checked={connections[service.id]?.isConnected || false}
                    onChange={() => handleToggleConnection(service.id)}
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
              {connections[service.id]?.lastSync && (
                <div className="mt-4 flex items-center gap-2 text-sm text-base-content/60">
                  <Icon name="timer" className="text-base" />
                  Last synced: {connections[service.id].lastSync}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center p-8 bg-base-200/50 rounded-lg">
          <Icon name="link" className="text-6xl text-base-content/30 mx-auto mb-4" />
          <p className="text-base-content/60">No services available for connection</p>
        </div>
      )}
    </div>
  );
};

export default ConnectionPage;
