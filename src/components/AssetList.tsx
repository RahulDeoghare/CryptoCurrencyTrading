import React from 'react';
import { useTradingContext } from '../context/TradingContext';

export function AssetList() {
  const { assets, setSelectedAsset, selectedAsset } = useTradingContext();

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Markets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left py-2">Asset</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">24h Change</th>
              <th className="text-right py-2">Volume</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset.symbol}
                onClick={() => setSelectedAsset(asset)}
                className={`cursor-pointer hover:bg-gray-700 transition-colors ${
                  selectedAsset?.symbol === asset.symbol ? 'bg-gray-700' : ''
                }`}
              >
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{asset.symbol}</span>
                    <span className="text-sm text-gray-400">{asset.name}</span>
                  </div>
                </td>
                <td className="text-right text-white">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className={`text-right ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                </td>
                <td className="text-right text-gray-300">
                  ${(asset.volume / 1000000).toFixed(2)}M
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}