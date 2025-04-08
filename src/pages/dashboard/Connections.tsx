import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { services } from "../../constants/services";
import ConnectionStats from "../../components/connections/ConnectionStats";
import ServiceCard from "../../components/connections/ServiceCard";
import EmptyState from "../../components/connections/EmptyState";
import { ConnectionState } from "../../interfaces/connection.interface";

const ConnectionPage: React.FC = () => {
  const { t } = useTranslation();
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
            {t('sidebar.items.connections')}
          </h1>
          <p className="text-gray-400 mt-2">{t('connections.overview.subtitle')}</p>
        </div>
        <ConnectionStats connectedCount={connectedCount} totalCount={totalCount} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            {...service}
            isConnected={connections[service.id]?.isConnected || false}
            lastSync={connections[service.id]?.lastSync}
            onToggle={handleToggleConnection}
          />
        ))}
      </div>

      {services.length === 0 && <EmptyState />}
    </div>
  );
};

export default ConnectionPage;
