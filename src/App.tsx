import React from 'react';
import { Header } from './components/Header';
import { TradingChart } from './components/TradingChart';
import { OrderBook } from './components/OrderBook';
import { TradeForm } from './components/TradeForm';
import { AssetList } from './components/AssetList';
import { Portfolio } from './components/Portfolio';
import { TradingProvider } from './context/TradingContext';

function App() {
  return (
    <TradingProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-800 rounded-lg p-4">
                <TradingChart />
              </div>
              <AssetList />
            </div>
            <div className="space-y-8">
              <Portfolio />
              <TradeForm />
              <OrderBook />
            </div>
          </div>
        </main>
      </div>
    </TradingProvider>
  );
}

export default App;