import * as React from 'react';
import { useTradingContext } from '../context/TradingContext';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Portfolio() {
  const { portfolio, assets, balance, trades } = useTradingContext();

  const getCurrentPrice = (symbol: string) => {
    return assets.find(a => a.symbol === symbol)?.price || 0;
  };

  const calculateTotalValue = () => {
    return portfolio.reduce((total, position) => {
      return total + (position.amount * getCurrentPrice(position.asset));
    }, balance);
  };

  const calculatePnL = (position: { asset: string; amount: number; averagePrice: number }) => {
    const currentPrice = getCurrentPrice(position.asset);
    return ((currentPrice - position.averagePrice) * position.amount);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-gray-400 mb-2">Total Balance</h3>
          <p className="text-2xl font-bold text-white">
            ${calculateTotalValue().toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-gray-400 mb-2">Available Cash</h3>
          <p className="text-2xl font-bold text-white">
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-gray-400 mb-2">Number of Assets</h3>
          <p className="text-2xl font-bold text-white">{portfolio.length}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Your Assets</h2>
        <div className="space-y-4">
          {portfolio.map((position) => {
            const pnl = calculatePnL(position);
            const currentPrice = getCurrentPrice(position.asset);
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
                      ${(position.amount * currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className={`text-sm flex items-center justify-end ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {pnl >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                      {pnl >= 0 ? '+' : ''}{pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Trades</h2>
        <div className="space-y-4">
          {trades.slice(0, 5).map((trade) => (
            <div key={trade.id} className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    trade.type === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {trade.type.toUpperCase()}
                  </span>
                  <span className="ml-2 text-white">{trade.symbol}</span>
                </div>
                <div className="text-right">
                  <p className="text-white">${trade.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(trade.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;