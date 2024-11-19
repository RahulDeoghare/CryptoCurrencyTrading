import React, { useState, useEffect } from 'react';
import { getMarketStatus, formatIndianCurrency } from '../utils/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MarketStatus() {
  const [status, setStatus] = useState(getMarketStatus());
  const [indices, setIndices] = useState({
    nifty50: { value: 21845.25, change: 0.75 },
    sensex: { value: 72012.15, change: 0.68 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getMarketStatus());
      
      // Simulate market index changes
      setIndices(prev => ({
        nifty50: {
          value: prev.nifty50.value * (1 + (Math.random() - 0.5) * 0.001),
          change: prev.nifty50.change + (Math.random() - 0.5) * 0.1
        },
        sensex: {
          value: prev.sensex.value * (1 + (Math.random() - 0.5) * 0.001),
          change: prev.sensex.change + (Math.random() - 0.5) * 0.1
        }
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-white font-medium">
              Market {status.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
          <span className="text-gray-400 text-sm">
            {status.nextTiming}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-gray-400 mb-2">NIFTY 50</h3>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold text-white">
              {indices.nifty50.value.toFixed(2)}
            </p>
            <div className={`flex items-center ${indices.nifty50.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {indices.nifty50.change >= 0 ? 
                <TrendingUp className="w-4 h-4 mr-1" /> : 
                <TrendingDown className="w-4 h-4 mr-1" />
              }
              <span>{indices.nifty50.change >= 0 ? '+' : ''}{indices.nifty50.change.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-gray-400 mb-2">SENSEX</h3>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold text-white">
              {indices.sensex.value.toFixed(2)}
            </p>
            <div className={`flex items-center ${indices.sensex.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {indices.sensex.change >= 0 ? 
                <TrendingUp className="w-4 h-4 mr-1" /> : 
                <TrendingDown className="w-4 h-4 mr-1" />
              }
              <span>{indices.sensex.change >= 0 ? '+' : ''}{indices.sensex.change.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}