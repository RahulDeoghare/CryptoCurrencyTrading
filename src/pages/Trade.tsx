import React from 'react';
import { TradingChart } from '../components/TradingChart';
import { TradeForm } from '../components/TradeForm';
import { OrderBook } from '../components/OrderBook';

export function Trade() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <TradingChart />
        </div>
        <TradeForm />
      </div>
      <div>
        <OrderBook />
      </div>
    </div>
  );
}

export default Trade;