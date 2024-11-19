import React from 'react';
import { MarketStatus } from '../components/MarketStatus';
import { useTradingContext } from '../context/TradingContext';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { formatIndianCurrency } from '../utils/mockData';

export function Markets() {
  const { assets } = useTradingContext();

  // Group stocks by sector
  const stocksBySection = assets.reduce((acc, stock) => {
    if (!acc[stock.sector]) {
      acc[stock.sector] = [];
    }
    acc[stock.sector].push(stock);
    return acc;
  }, {} as Record<string, typeof assets>);

  return (
    <div className="space-y-8">
      <MarketStatus />
      
      {/* Sector-wise Performance */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Sector-wise Performance</h2>
        <div className="space-y-6">
          {Object.entries(stocksBySection).map(([sector, stocks]) => (
            <div key={sector}>
              <h3 className="text-lg font-medium text-white mb-4">{sector}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stocks.map(stock => (
                  <div key={stock.symbol} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-white">{stock.symbol}</h4>
                        <p className="text-sm text-gray-400">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{formatIndianCurrency(stock.price)}</p>
                        <p className={`text-sm flex items-center justify-end ${stock.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change24h >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                          {stock.change24h >= 0 ? '+' : ''}{stock.change24h}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market News */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Market News</h2>
        <div className="space-y-4">
          {[
            {
              title: "RBI Keeps Repo Rate Unchanged at 6.5%",
              time: "2 hours ago",
              source: "Economic Times"
            },
            {
              title: "IT Sector Leads Market Rally on Strong Q4 Outlook",
              time: "3 hours ago",
              source: "Business Standard"
            },
            {
              title: "FIIs Turn Net Buyers in Indian Markets",
              time: "4 hours ago",
              source: "Moneycontrol"
            }
          ].map((news, index) => (
            <div key={index} className="border-t border-gray-700 pt-4 first:border-0 first:pt-0">
              <h3 className="text-white font-medium">{news.title}</h3>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>{news.time}</span>
                <span>{news.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}