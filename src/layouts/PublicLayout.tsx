import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PublicLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
