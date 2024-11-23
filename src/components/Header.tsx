import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NotificationsDialog } from './Notifications';
import { UserProfile } from './UserProfile';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-300 hover:text-white';
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-white">TradeSmart</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link to="/markets" className={`${isActive('/markets')} px-3 py-2 rounded-md text-sm font-medium`}>
              Markets
            </Link>
            <Link to="/trade" className={`${isActive('/trade')} px-3 py-2 rounded-md text-sm font-medium`}>
              Trade
            </Link>
            <Link to="/portfolio" className={`${isActive('/portfolio')} px-3 py-2 rounded-md text-sm font-medium`}>
              Portfolio
            </Link>
            <Link to="/analysis" className={`${isActive('/analysis')} px-3 py-2 rounded-md text-sm font-medium`}>
              Analysis
            </Link>
            <Link to="/ipo" className={`${isActive('/ipo')} px-3 py-2 rounded-md text-sm font-medium`}>
              IPO
            </Link>
            <Link to="/education" className={`${isActive('/education')} px-3 py-2 rounded-md text-sm font-medium`}>
              Education
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <NotificationsDialog />
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
}