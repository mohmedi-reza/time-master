import React, { useState } from "react";
import Icon from "../../components/common/icon/icon.component";

const FinancialPage: React.FC = () => {
  // Mock data - replace with actual data later
  const walletData = {
    balance: "1,234.56",
    address: "0x1234...5678",
    tokens: [
      { name: "ETH", balance: "0.5" },
      { name: "USDT", balance: "500.00" },
    ],
  };

  const recentPayments = [
    { id: 1, description: "Monthly Subscription", amount: "-50.00", date: "2024-03-15", category: "Subscription", status: "Completed" },
    { id: 2, description: "Client Payment", amount: "+250.00", date: "2024-03-14", category: "Income", status: "Completed" },
    { id: 3, description: "Service Fee", amount: "-25.00", date: "2024-03-13", category: "Service", status: "Pending" },
  ];

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  return (
    <div className="space-y-6 p-4 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
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

      {/* Wallet Card */}
      <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm animate-fade-in">
        <div className="card-body p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Icon name="wallet" className="text-primary text-base" />
                Wallet Balance
              </h2>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ${walletData.balance}
              </p>
              <div className="flex items-center gap-1.5 text-base-content/60">
                <Icon name="copy" className="text-xs" />
                <p className="font-mono text-xs">{walletData.address}</p>
              </div>
            </div>
            <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform">
              <Icon name="wallet3" className="text-base" />
              Connect Wallet
            </button>
          </div>

          <div className="divider my-3"></div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Icon name="coin" className="text-primary text-base" />
              Tokens
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {walletData.tokens.map((token) => (
                <div 
                  key={token.name} 
                  className="flex justify-between items-center p-3 rounded-lg bg-base-200/50 hover:bg-base-200/70 transition-all duration-300 border border-accent/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="coin" className="text-base text-primary" />
                    </div>
                    <span className="text-sm font-medium">{token.name}</span>
                  </div>
                  <span className="text-base font-bold text-primary">{token.balance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
          <div className="card-body p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-success/10">
                <Icon name="moneyRecive" className="text-lg text-success" />
              </div>
              <p className="text-sm text-base-content/60">Total Income</p>
            </div>
            <p className="text-xl font-bold">$1,250.00</p>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <Icon name="arrowUp" className="text-xs" />
              +12% from last month
            </p>
          </div>
        </div>

        <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
          <div className="card-body p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-error/10">
                <Icon name="moneySend" className="text-lg text-error" />
              </div>
              <p className="text-sm text-base-content/60">Total Expenses</p>
            </div>
            <p className="text-xl font-bold">$475.00</p>
            <p className="text-xs text-error mt-1 flex items-center gap-1">
              <Icon name="arrowDown" className="text-xs" />
              -8% from last month
            </p>
          </div>
        </div>

        <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
          <div className="card-body p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon name="wallet" className="text-lg text-primary" />
              </div>
              <p className="text-sm text-base-content/60">Net Balance</p>
            </div>
            <p className="text-xl font-bold">$775.00</p>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <Icon name="arrowUp" className="text-xs" />
              +15% from last month
            </p>
          </div>
        </div>

        <div className="card bg-base-100/50 border border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
          <div className="card-body p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-warning/10">
                <Icon name="timer" className="text-lg text-warning" />
              </div>
              <p className="text-sm text-base-content/60">Pending</p>
            </div>
            <p className="text-xl font-bold">3</p>
            <p className="text-xs text-base-content/60 mt-1 flex items-center gap-1">
              <Icon name="infoCircle" className="text-xs" />
              2 incoming, 1 outgoing
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="card bg-base-100/50 border border-accent/20 shadow-lg backdrop-blur-sm animate-fade-in">
        <div className="card-body p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Icon name="documentText" className="text-primary text-base" />
                Transaction History
              </h2>
              <p className="text-xs text-base-content/60">View and manage your transactions</p>
            </div>
            <button className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform">
              <Icon name="documentDownload" className="text-base" />
              Export
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
                placeholder="Search transactions..."
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
                <option value="all">All Categories</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="subscription">Subscription</option>
              </select>
              <select
                className="select h-10 bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-lg min-h-0 flex-1 text-sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="table table-sm w-full">
              <thead>
                <tr>
                  <th className="bg-base-200/50 rounded-l-lg text-xs font-medium">Date</th>
                  <th className="bg-base-200/50 text-xs font-medium">Description</th>
                  <th className="bg-base-200/50 text-xs font-medium">Category</th>
                  <th className="bg-base-200/50 text-xs font-medium">Status</th>
                  <th className="bg-base-200/50 rounded-r-lg text-right text-xs font-medium">Amount</th>
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
                        {payment.status}
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
            <p className="text-xs text-base-content/60">Showing 1-3 of 24 transactions</p>
            <div className="join shadow-lg">
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
    </div>
  );
};

export default FinancialPage;
