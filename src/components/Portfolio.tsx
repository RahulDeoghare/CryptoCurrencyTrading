import React from 'react';
import { useTradingContext } from '../context/TradingContext';

export function Portfolio() {
  const { portfolio, assets, balance } = useTradingContext();

  const getCurrentPrice = (symbol: string) => {
    return assets.find(a => a.symbol === symbol)?.price || 0;
  };

  const calculatePnL = (position: { asset: string; amount: number; averagePrice: number }) => {
    const currentPrice = getCurrentPrice(position.asset);
    return ((currentPrice - position.averagePrice) * position.amount);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Portfolio</h2>
      <div className="mb-4">
        <p className="text-gray-400">Available Balance</p>
        <p className="text-2xl font-bold text-white">
          ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="space-y-4">
        {portfolio.map((position) => {
          const pnl = calculatePnL(position);
          return (
            <div key={position.asset} className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">{position.asset}</h3>
                  <p className="text-sm text-gray-400">
                    {position.amount.toFixed(4)} units @ ${position.averagePrice.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white">
                    ${(position.amount * getCurrentPrice(position.asset)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                  <p className={`text-sm ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {pnl >= 0 ? '+' : ''}{pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}