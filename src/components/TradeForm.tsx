import React, { useState } from 'react';
import { useTradingContext } from '../context/TradingContext';
import { formatIndianCurrency } from '../utils/mockData';
import { Search } from 'lucide-react';

export function TradeForm() {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedAsset, setSelectedAsset, assets, executeOrder, balance } = useTradingContext();

  const filteredStocks = assets.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (type: 'buy' | 'sell') => (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;

    const amountNum = parseFloat(amount);
    const priceNum = orderType === 'limit' ? parseFloat(price) : undefined;

    if (isNaN(amountNum) || amountNum <= 0) return;
    if (orderType === 'limit' && (isNaN(priceNum!) || priceNum! <= 0)) return;

    executeOrder(type, amountNum, priceNum);
    setAmount('');
    if (orderType === 'limit') setPrice('');
  };

  if (!selectedAsset) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Select a Stock to Trade</h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filteredStocks.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => setSelectedAsset(stock)}
              className="flex justify-between items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
            >
              <div>
                <h3 className="text-white font-medium">{stock.symbol}</h3>
                <p className="text-sm text-gray-400">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-white">{formatIndianCurrency(stock.price)}</p>
                <p className={`text-sm ${stock.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change24h >= 0 ? '+' : ''}{stock.change24h.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const maxAmount = orderType === 'market' 
    ? Math.floor(balance / selectedAsset.price)
    : Math.floor(balance / parseFloat(price || '0'));

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{selectedAsset.symbol}</h2>
          <p className="text-gray-400">{selectedAsset.name}</p>
        </div>
        <button
          onClick={() => setSelectedAsset(null)}
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          Change Stock
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="text-white">
          <p className="text-2xl font-bold">{formatIndianCurrency(selectedAsset.price)}</p>
          <p className={`text-sm ${selectedAsset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {selectedAsset.change24h >= 0 ? '+' : ''}{selectedAsset.change24h.toFixed(2)}%
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              orderType === 'market'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setOrderType('market')}
          >
            Market
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              orderType === 'limit'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setOrderType('limit')}
          >
            Limit
          </button>
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">
            Quantity
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="0"
              min="1"
            />
            <button
              type="button"
              onClick={() => setAmount(maxAmount.toString())}
              className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm"
            >
              Max ({maxAmount})
            </button>
          </div>
        </div>

        {orderType === 'limit' && (
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter limit price"
              min="0.01"
              step="0.01"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            type="submit"
            onClick={handleSubmit('buy')}
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            Buy
          </button>
          <button
            type="submit"
            onClick={handleSubmit('sell')}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
          >
            Sell
          </button>
        </div>

        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <p className="text-gray-300 text-sm">Available Balance:</p>
          <p className="text-white font-bold">{formatIndianCurrency(balance)}</p>
        </div>
      </form>
    </div>
  );
}