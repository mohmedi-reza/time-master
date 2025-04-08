import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "../common/icon/icon.component";

const EmptyState: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="text-center p-8 bg-base-200/50 rounded-lg">
      <Icon name="link" className="text-6xl text-base-content/30 mx-auto mb-4" />
      <p className="text-base-content/60">{t('connections.empty.noServices')}</p>
    </div>
  );
};

export default EmptyState; 