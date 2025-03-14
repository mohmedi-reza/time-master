import React from "react";
import Icon from "../common/icon/icon.component";

interface Token {
  name: string;
  balance: string;
}

interface WalletData {
  balance: string;
  address: string;
  tokens: Token[];
}

interface WalletCardProps {
  walletData: WalletData;
}

const WalletCard: React.FC<WalletCardProps> = ({ walletData }) => {
  return (
    <div className="card bg-base-100/50 border border-accent/20 hover:transition-all duration-300 backdrop-blur-sm animate-fade-in">
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
  );
};

export default WalletCard; 