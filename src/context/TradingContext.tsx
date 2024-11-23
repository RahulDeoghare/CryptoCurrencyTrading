import * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { Asset, Trade, Portfolio } from '../types';
import { generateMockPriceUpdates, NIFTY50_STOCKS } from '../utils/mockData';

interface TradingContextType {
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void; // Updated type here
  assets: Asset[];
  portfolio: Portfolio[];
  trades: Trade[];
  executeOrder: (type: 'buy' | 'sell', amount: number, price?: number) => void;
  balance: number;
  addFunds: (amount: number) => void;
  addNotification: (title: string, message: string) => void;
}

const TradingContext = createContext<TradingContextType | null>(null);

export function TradingProvider({ children }: { children: React.ReactNode }) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [balance, setBalance] = useState(100000); // Start with ₹100,000

  useEffect(() => {
    // Initialize with Indian stocks
    const initialAssets = NIFTY50_STOCKS.map(stock => ({
      ...stock,
      change24h: 0,
      volume: Math.random() * 1000000,
      marketCap: stock.price * 1000000000
    }));
    
    setAssets(initialAssets);
    setSelectedAsset(initialAssets[0]);

    // Start price updates
    const cleanup = generateMockPriceUpdates((updates) => {
      setAssets(current => 
        current.map(asset => ({
          ...asset,
          price: updates[asset.symbol]?.price ?? asset.price,
          change24h: updates[asset.symbol]?.change24h ?? asset.change24h,
        }))
      );
    });

    return cleanup;
  }, []);

  const addFunds = (amount: number) => {
    setBalance(prev => prev + amount);
    addNotification('Funds Added', `₹${amount.toLocaleString()} has been added to your account`);
  };

  const addNotification = (title: string, message: string) => {
    const event = new CustomEvent('newNotification', {
      detail: { title, message, time: new Date().toISOString() }
    });
    window.dispatchEvent(event);
  };

  const executeOrder = (type: 'buy' | 'sell', amount: number, price?: number) => {
    if (!selectedAsset) return;

    const orderPrice = price || selectedAsset.price;
    const total = orderPrice * amount;

    if (type === 'buy') {
      if (total > balance) {
        addNotification('Order Failed', 'Insufficient funds for this transaction');
        return;
      }
      setBalance(prev => prev - total);
      addNotification('Order Executed', `Successfully bought ${amount} shares of ${selectedAsset.symbol} at ${formatIndianCurrency(orderPrice)}`);
    } else {
      const assetInPortfolio = portfolio.find(p => p.asset === selectedAsset.symbol);
      if (!assetInPortfolio || assetInPortfolio.amount < amount) {
        addNotification('Order Failed', 'Insufficient shares for this transaction');
        return;
      }
      setBalance(prev => prev + total);
      addNotification('Order Executed', `Successfully sold ${amount} shares of ${selectedAsset.symbol} at ${formatIndianCurrency(orderPrice)}`);
    }

    // Update portfolio
    setPortfolio(prev => {
      const existing = prev.find(p => p.asset === selectedAsset.symbol);
      if (existing) {
        if (type === 'buy') {
          return prev.map(p => 
            p.asset === selectedAsset.symbol
              ? { ...p, amount: p.amount + amount, averagePrice: (p.averagePrice * p.amount + total) / (p.amount + amount) }
              : p
          );
        } else {
          const newAmount = existing.amount - amount;
          return newAmount > 0
            ? prev.map(p => p.asset === selectedAsset.symbol ? { ...p, amount: newAmount } : p)
            : prev.filter(p => p.asset !== selectedAsset.symbol);
        }
      } else if (type === 'buy') {
        return [...prev, { asset: selectedAsset.symbol, amount, averagePrice: orderPrice }];
      }
      return prev;
    });

    // Add trade to history
    const trade: Trade = {
      id: Math.random().toString(36).substr(2, 9),
      symbol: selectedAsset.symbol,
      price: orderPrice,
      amount,
      type,
      timestamp: Date.now(),
    };
    setTrades(prev => [trade, ...prev]);
  };

  return (
    <TradingContext.Provider value={{
      selectedAsset,
      setSelectedAsset,
      assets,
      portfolio,
      trades,
      executeOrder,
      balance,
      addFunds,
      addNotification
    }}>
      {children}
    </TradingContext.Provider>
  );
}

export function useTradingContext() {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTradingContext must be used within a TradingProvider');
  }
  return context;
}

// Removed duplicate function implementation
function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}