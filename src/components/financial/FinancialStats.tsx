import React from "react";
import Icon from "../common/icon/icon.component";
import { IconName } from "../common/icon/iconPack";

const FinancialStats: React.FC = () => {
  const stats = [
    {
      title: "Total Income",
      value: "$1,250.00",
      icon: "moneyRecive" as IconName,
      iconBg: "bg-success/10",
      iconColor: "text-success",
      change: 12,
      changeType: "success",
      description: "from last month"
    },
    {
      title: "Total Expenses",
      value: "$475.00",
      icon: "moneySend",
      iconBg: "bg-error/10",
      iconColor: "text-error",
      change: -8,
      changeType: "error",
      description: "from last month"
    },
    {
      title: "Net Balance",
      value: "$775.00",
      icon: "wallet",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      change: 15,
      changeType: "success",
      description: "from last month"
    },
    {
      title: "Pending",
      value: "3",
      icon: "timer",
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
      description: "2 incoming, 1 outgoing",
      showChangeAsInfo: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {stats.map((stat, index) => (
        <div key={index} className="card bg-base-100/50 border border-accent/20 hover:transition-all duration-300 backdrop-blur-sm">
          <div className="card-body p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <Icon name={stat.icon as IconName} className={`text-lg ${stat.iconColor}`} />
              </div>
              <p className="text-sm text-base-content/60">{stat.title}</p>
            </div>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className={`text-xs ${stat.showChangeAsInfo ? 'text-base-content/60' : stat.changeType === 'success' ? 'text-success' : 'text-error'} mt-1 flex items-center gap-1`}>
              {!stat.showChangeAsInfo && (
                <>
                  <Icon name={stat.changeType === 'success' ? 'arrowUp' : 'arrowDown'} className="text-xs" />
                  {stat.changeType === 'success' ? '+' : ''}{stat.change}%
                </>
              )}
              {stat.showChangeAsInfo && <Icon name="infoCircle" className="text-xs" />}
              {stat.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialStats; 