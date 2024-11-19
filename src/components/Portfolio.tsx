import React, { useState } from 'react';
import { useTradingContext } from '../context/TradingContext';
import { formatIndianCurrency, calculateReturns, calculateReturnPercentage } from '../utils/mockData';
import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'lucide-react';

export function Portfolio() {
  const { portfolio, assets, balance, addFunds } = useTradingContext();
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [fundAmount, setFundAmount] = useState('');

  const getCurrentPrice = (symbol: string) => {
    return assets.find(a => a.symbol === symbol)?.price || 0;
  };

  const calculateTotalReturns = () => {
    return portfolio.reduce((total, position) => {
      const currentPrice = getCurrentPrice(position.asset);
      return total + calculateReturns(position.averagePrice, currentPrice, position.amount);
    }, 0);
  };

  const handleAddFunds = () => {
    const amount = parseFloat(fundAmount);
    if (!isNaN(amount) && amount > 0) {
      addFunds(amount);
      setFundAmount('');
      setIsAddFundsOpen(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Portfolio</h2>
        <button
          onClick={() => setIsAddFundsOpen(true)}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Funds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400">Available Balance</p>
          <p className="text-2xl font-bold text-white">
            {formatIndianCurrency(balance)}
          </p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400">Total Investment</p>
          <p className="text-2xl font-bold text-white">
            {formatIndianCurrency(portfolio.reduce((total, pos) => total + (pos.amount * pos.averagePrice), 0))}
          </p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400">Total Returns</p>
          <p className={`text-2xl font-bold ${calculateTotalReturns() >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatIndianCurrency(calculateTotalReturns())}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {portfolio.map((position) => {
          const currentPrice = getCurrentPrice(position.asset);
          const returns = calculateReturns(position.averagePrice, currentPrice, position.amount);
          const returnPercentage = calculateReturnPercentage(position.averagePrice, currentPrice);
          
          return (
            <div key={position.asset} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">{position.asset}</h3>
                  <p className="text-sm text-gray-400">
                    {position.amount} shares @ {formatIndianCurrency(position.averagePrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white">
                    Current: {formatIndianCurrency(currentPrice)}
                  </p>
                  <p className={`text-sm ${returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {returns >= 0 ? '+' : ''}{formatIndianCurrency(returns)} ({returnPercentage.toFixed(2)}%)
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog.Root open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-bold text-white">
                Add Funds
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Amount (INR)
                </label>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter amount"
                  min="0"
                />
              </div>
              <button
                onClick={handleAddFunds}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add Funds
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}