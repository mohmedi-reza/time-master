import React from "react";
import FinancialHeader from "../../components/financial/FinancialHeader";
import FinancialStats from "../../components/financial/FinancialStats";
import TransactionHistory from "../../components/financial/TransactionHistory";
import WalletCard from "../../components/financial/WalletCard";

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

  return (
    <div className="space-y-6 p-4 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <FinancialHeader />
      <WalletCard walletData={walletData} />
      <FinancialStats />
      <TransactionHistory />
    </div>
  );
};

export default FinancialPage;
