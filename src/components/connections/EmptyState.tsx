import React from "react";
import Icon from "../common/icon/icon.component";

const EmptyState: React.FC = () => (
  <div className="text-center p-8 bg-base-200/50 rounded-lg">
    <Icon name="link" className="text-6xl text-base-content/30 mx-auto mb-4" />
    <p className="text-base-content/60">No services available for connection</p>
  </div>
);

export default EmptyState; 