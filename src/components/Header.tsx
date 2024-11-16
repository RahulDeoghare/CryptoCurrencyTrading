import React from 'react';
import { TrendingUp, Bell, User, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-white">CryptoTrade</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Markets
            </a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Trade
            </a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Portfolio
            </a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              History
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <User className="h-6 w-6" />
            </button>
            <button className="md:hidden text-gray-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}