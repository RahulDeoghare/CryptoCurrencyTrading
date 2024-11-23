import * as React from 'react';
import { TradingChart } from '../components/TradingChart';
import { useTradingContext } from '../context/TradingContext';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

export function Analysis() {
  const { assets } = useTradingContext();

  const topGainers = [...assets]
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 5);

  const topLosers = [...assets]
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 5);

  const marketBreadth = {
    advancers: assets.filter(a => a.change24h > 0).length,
    decliners: assets.filter(a => a.change24h < 0).length,
    unchanged: assets.filter(a => a.change24h === 0).length,
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Market Breadth</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-green-500"><TrendingUp className="h-5 w-5" /></span>
                <span className="text-2xl font-bold text-white">{marketBreadth.advancers}</span>
              </div>
              <p className="text-gray-400 mt-2">Advancing</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-red-500"><TrendingDown className="h-5 w-5" /></span>
                <span className="text-2xl font-bold text-white">{marketBreadth.decliners}</span>
              </div>
              <p className="text-gray-400 mt-2">Declining</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-500"><Activity className="h-5 w-5" /></span>
                <span className="text-2xl font-bold text-white">{marketBreadth.unchanged}</span>
              </div>
              <p className="text-gray-400 mt-2">Unchanged</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Market Momentum</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">RSI (14)</span>
              <span className="text-white">65.42</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">MACD</span>
              <span className="text-green-500">Bullish</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Bollinger Bands</span>
              <span className="text-white">Expanding</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Top Gainers</h2>
          <div className="space-y-4">
            {topGainers.map((stock) => (
              <div key={stock.symbol} className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{stock.symbol}</p>
                  <p className="text-sm text-gray-400">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-white">₹{stock.price.toLocaleString()}</p>
                  <p className="text-green-500">+{stock.change24h.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Top Losers</h2>
          <div className="space-y-4">
            {topLosers.map((stock) => (
              <div key={stock.symbol} className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{stock.symbol}</p>
                  <p className="text-sm text-gray-400">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-white">₹{stock.price.toLocaleString()}</p>
                  <p className="text-red-500">{stock.change24h.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Sector Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'IT', change: 2.5, color: 'bg-green-500' },
            { name: 'Banking', change: 1.8, color: 'bg-green-500' },
            { name: 'Auto', change: -0.5, color: 'bg-red-500' },
            { name: 'Pharma', change: 0.7, color: 'bg-green-500' },
            { name: 'Metal', change: -1.2, color: 'bg-red-500' },
            { name: 'FMCG', change: 0.3, color: 'bg-green-500' },
          ].map((sector) => (
            <div key={sector.name} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-white">{sector.name}</span>
                <span className={sector.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {sector.change >= 0 ? '+' : ''}{sector.change}%
                </span>
              </div>
              <div className="mt-2 bg-gray-600 h-2 rounded-full">
                <div
                  className={`h-full rounded-full ${sector.color}`}
                  style={{ width: `${Math.abs(sector.change) * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}