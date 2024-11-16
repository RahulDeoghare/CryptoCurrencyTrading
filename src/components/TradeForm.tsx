import React, { useState } from 'react';
import { useTradingContext } from '../context/TradingContext';

export function TradeForm() {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const { selectedAsset, executeOrder, balance } = useTradingContext();

  const handleSubmit = (type: 'buy' | 'sell') => (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;

    const amountNum = parseFloat(amount);
    const priceNum = orderType === 'limit' ? parseFloat(price) : undefined;

    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (orderType === 'limit' && (isNaN(priceNum!) || priceNum! <= 0)) {
      alert('Please enter a valid price');
      return;
    }

    executeOrder(type, amountNum, priceNum);
    setAmount('');
    if (orderType === 'limit') setPrice('');
  };

  if (!selectedAsset) return null;

  const maxAmount = orderType === 'market' 
    ? balance / selectedAsset.price
    : balance / parseFloat(price || '0');

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Place Order</h2>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${
              orderType === 'market'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setOrderType('market')}
          >
            Market
          </button>
          <button
            className={`px-3 py-1 rounded ${
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
            Amount ({selectedAsset.symbol.split('/')[0]})
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="0.00"
              step="0.0001"
            />
            <button
              type="button"
              onClick={() => setAmount(maxAmount.toFixed(4))}
              className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm"
            >
              Max
            </button>
          </div>
        </div>

        {orderType === 'limit' && (
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button
            type="submit"
            onClick={handleSubmit('buy')}
            className="w-full py-2 px-4 rounded bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            Buy {selectedAsset.symbol.split('/')[0]}
          </button>
          <button
            type="submit"
            onClick={handleSubmit('sell')}
            className="w-full py-2 px-4 rounded bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
          >
            Sell {selectedAsset.symbol.split('/')[0]}
          </button>
        </div>
      </form>
    </div>
  );
}