import React, { CSSProperties } from "react";

interface ConnectionStatsProps {
  connectedCount: number;
  totalCount: number;
}

const ConnectionStats: React.FC<ConnectionStatsProps> = ({ connectedCount, totalCount }) => (
  <div className="card bg-base-100 border border-accent/40 backdrop-blur-sm bg-opacity-80 p-4">
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
);

export default ConnectionStats; 