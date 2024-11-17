import React, { createContext, useContext, useState, useEffect } from 'react';
import { Asset, Trade, Portfolio } from '../types';
import { generateMockPriceUpdates } from '../utils/mockData';

interface TradingContextType {
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset) => void;
  assets: Asset[];
  portfolio: Portfolio[];
  trades: Trade[];
  executeOrder: (type: 'buy' | 'sell', amount: number, price?: number) => void;
  balance: number;
}

const TradingContext = createContext<TradingContextType | null>(null);

export function TradingProvider({ children }: { children: React.ReactNode }) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [balance, setBalance] = useState(100000); // Start with $100,000 USD

  useEffect(() => {
    // Initialize with mock data
    const initialAssets: Asset[] = [
      { symbol: 'BTC/USD', name: 'Bitcoin', price: 45825, change24h: 2.5, volume: 28000000000, marketCap: 890000000000, sector: 'Cryptocurrency' },
      { symbol: 'ETH/USD', name: 'Ethereum', price: 2890, change24h: 1.8, volume: 15000000000, marketCap: 345000000000, sector: 'Cryptocurrency' },
      { symbol: 'SOL/USD', name: 'Solana', price: 98, change24h: 3.2, volume: 2800000000, marketCap: 42000000000, sector: 'Cryptocurrency' },
      { symbol: 'AAPL', name: 'Apple Inc.', price: 182, change24h: -0.5, volume: 1200000000, marketCap: 2800000000000, sector: 'Technology' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142, change24h: 1.2, volume: 890000000, marketCap: 1800000000000, sector: 'Technology' },
    ];
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

  const executeOrder = (type: 'buy' | 'sell', amount: number, price?: number) => {
    if (!selectedAsset) return;

    const orderPrice = price || selectedAsset.price;
    const total = orderPrice * amount;

    if (type === 'buy') {
      if (total > balance) {
        alert('Insufficient funds');
        return;
      }
      setBalance(prev => prev - total);
    } else {
      const assetInPortfolio = portfolio.find(p => p.asset === selectedAsset.symbol);
      if (!assetInPortfolio || assetInPortfolio.amount < amount) {
        alert('Insufficient assets');
        return;
      }
      setBalance(prev => prev + total);
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

