import React from 'react';

type OrderType = {
  price: number;
  amount: number;
  total: number;
};

const mockBids: OrderType[] = [
  { price: 45800, amount: 2.5, total: 114500 },
  { price: 45750, amount: 1.8, total: 82350 },
  { price: 45700, amount: 3.2, total: 146240 },
];

const mockAsks: OrderType[] = [
  { price: 45850, amount: 1.5, total: 68775 },
  { price: 45900, amount: 2.1, total: 96390 },
  { price: 45950, amount: 1.7, total: 78115 },
];

export function OrderBook() {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h2 className="text-gray-200 font-semibold mb-4">Order Book</h2>
      <div className="grid grid-cols-3 gap-4 text-sm mb-2">
        <div className="text-gray-400">Price (USD)</div>
        <div className="text-gray-400 text-right">Amount (BTC)</div>
        <div className="text-gray-400 text-right">Total (USD)</div>
      </div>
      
      <div className="space-y-1">
        {mockAsks.reverse().map((ask, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-red-500">{ask.price.toLocaleString()}</div>
            <div className="text-gray-300 text-right">{ask.amount.toFixed(4)}</div>
            <div className="text-gray-300 text-right">{ask.total.toLocaleString()}</div>
          </div>
        ))}
        
        <div className="border-t border-b border-gray-700 my-2 py-2">
          <div className="text-green-400 font-semibold">45,825 USD</div>
        </div>
        
        {mockBids.map((bid, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-green-500">{bid.price.toLocaleString()}</div>
            <div className="text-gray-300 text-right">{bid.amount.toFixed(4)}</div>
            <div className="text-gray-300 text-right">{bid.total.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}