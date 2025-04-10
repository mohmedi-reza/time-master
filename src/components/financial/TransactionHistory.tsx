import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../common/icon/icon.component";

interface Transaction {
  id: number;
  description: string;
  amount: string;
  date: string;
  category: string;
  status: string;
}

const TransactionHistory: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const recentPayments: Transaction[] = [
    { id: 1, description: "Monthly Subscription", amount: "-50.00", date: "2024-03-15", category: "Subscription", status: "Completed" },
    { id: 2, description: "Client Payment", amount: "+250.00", date: "2024-03-14", category: "Income", status: "Completed" },
    { id: 3, description: "Service Fee", amount: "-25.00", date: "2024-03-13", category: "Service", status: "Pending" },
  ];

  return (
    <div className="card bg-base-100/50 border border-accent/20 backdrop-blur-sm animate-fade-in">
      <div className="card-body p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Icon name="documentText" className="text-primary text-base" />
              {t('financial.transactions.title')}
            </h2>
            <p className="text-xs text-base-content/60">{t('financial.transactions.subtitle')}</p>
          </div>
          <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform">
            <Icon name="documentDownload" className="text-base" />
            {t('financial.transactions.export')}
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="join flex-1 h-10 bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-lg">
            <div className="join-item flex items-center pl-3">
              <Icon name="searchNormal" className="text-primary/60 text-sm" />
            </div>
            <input
              type="text"
              placeholder={t('financial.transactions.search.placeholder')}
              className="input input-sm join-item bg-transparent border-0 focus:outline-none w-full h-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-1 md:flex-none">
            <select
              className="select h-10 bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-lg min-h-0 flex-1 text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">{t('financial.transactions.filters.allCategories')}</option>
              <option value="income">{t('financial.transactions.filters.income')}</option>
              <option value="expense">{t('financial.transactions.filters.expense')}</option>
              <option value="subscription">{t('financial.transactions.filters.subscription')}</option>
            </select>
            <select
              className="select h-10 bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-lg min-h-0 flex-1 text-sm"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">{t('financial.transactions.filters.allTime')}</option>
              <option value="today">{t('financial.transactions.filters.today')}</option>
              <option value="week">{t('financial.transactions.filters.thisWeek')}</option>
              <option value="month">{t('financial.transactions.filters.thisMonth')}</option>
              <option value="year">{t('financial.transactions.filters.thisYear')}</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="table table-sm w-full">
            <thead>
              <tr>
                <th className="bg-base-200/50 rounded-l-lg text-xs font-medium">{t('financial.transactions.table.date')}</th>
                <th className="bg-base-200/50 text-xs font-medium">{t('financial.transactions.table.description')}</th>
                <th className="bg-base-200/50 text-xs font-medium">{t('financial.transactions.table.category')}</th>
                <th className="bg-base-200/50 text-xs font-medium">{t('financial.transactions.table.status')}</th>
                <th className="bg-base-200/50 rounded-r-lg text-right text-xs font-medium">{t('financial.transactions.table.amount')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent/20 text-sm">
              {recentPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-base-200/50 transition-all duration-300">
                  <td className="font-medium text-sm">{payment.date}</td>
                  <td className="text-sm">{payment.description}</td>
                  <td>
                    <span className="badge badge-ghost badge-xs px-2">{payment.category}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      payment.status === 'Completed' 
                        ? 'badge-success text-success-content' 
                        : 'badge-warning text-warning-content'
                    } badge-xs px-2`}>
                      {t(`financial.transactions.status.${payment.status.toLowerCase()}`)}
                    </span>
                  </td>
                  <td className={`text-right font-bold text-sm ${
                    payment.amount.startsWith('+') 
                      ? 'text-success' 
                      : 'text-error'
                  }`}>
                    {payment.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
          <p className="text-xs text-base-content/60">{t('financial.transactions.pagination.showing')}</p>
          <div className="join">
            <button className="join-item btn btn-xs hover:bg-primary/10 transition-colors">
              <Icon name="arrowLeft2" className="text-base text-primary" />
            </button>
            <button className="join-item btn btn-xs btn-primary">1</button>
            <button className="join-item btn btn-xs hover:bg-primary/10 transition-colors">2</button>
            <button className="join-item btn btn-xs hover:bg-primary/10 transition-colors">3</button>
            <button className="join-item btn btn-xs hover:bg-primary/10 transition-colors">
              <Icon name="arrowRight2" className="text-base text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory; 