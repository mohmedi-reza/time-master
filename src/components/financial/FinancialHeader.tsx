import React from "react";
import Icon from "../common/icon/icon.component";

const FinancialHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-start animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Financial Overview
        </h1>
        <p className="text-base-content/60 text-sm">Track your financial activities and transactions</p>
      </div>
      <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform">
        <Icon name="addSquare" className="text-base" />
        New Transaction
      </button>
    </div>
  );
};

export default FinancialHeader; 