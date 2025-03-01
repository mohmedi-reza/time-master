import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-screen p-10 bg-blue-50/5 no-scrollbar">
      <div className="w-full max-w-md mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
