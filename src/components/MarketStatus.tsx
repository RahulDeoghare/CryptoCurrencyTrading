import React from 'react';
import { getMarketStatus } from '../utils/mockData';

export function MarketStatus() {
  const [status, setStatus] = React.useState(getMarketStatus());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getMarketStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
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
  );
}