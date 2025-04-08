import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "../common/icon/icon.component";

const FinancialHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-start animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('financial.overview.title')}
        </h1>
        <p className="text-base-content/60 text-sm">{t('financial.overview.subtitle')}</p>
      </div>
      <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform">
        <Icon name="addSquare" className="text-base" />
        {t('financial.overview.newTransaction')}
      </button>
    </div>
  );
};

export default FinancialHeader; 