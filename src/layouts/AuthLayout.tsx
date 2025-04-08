import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <div className={`flex flex-col items-center h-screen p-10 bg-blue-50/5 no-scrollbar ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="w-full max-w-md mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
