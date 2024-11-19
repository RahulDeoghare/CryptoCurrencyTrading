import React from 'react';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';

export function IPO() {
  const upcomingIPOs = [
    {
      name: "TechServe Solutions Ltd",
      dates: "Mar 15-18, 2024",
      priceRange: "₹ 475 - ₹ 500",
      lotSize: 30,
      issueSize: "₹ 850 Cr",
      subscription: "Opening Soon",
      status: "upcoming"
    },
    {
      name: "GreenEnergy Power Ltd",
      dates: "Mar 20-22, 2024",
      priceRange: "₹ 285 - ₹ 300",
      lotSize: 50,
      issueSize: "₹ 1,200 Cr",
      subscription: "Opening Soon",
      status: "upcoming"
    }
  ];

  const ongoingIPOs = [
    {
      name: "HealthTech Innovations Ltd",
      dates: "Mar 12-14, 2024",
      priceRange: "₹ 350 - ₹ 370",
      lotSize: 40,
      issueSize: "₹ 750 Cr",
      subscription: "3.5x",
      status: "active"
    }
  ];

  const pastIPOs = [
    {
      name: "Digital Solutions India Ltd",
      listingDate: "Mar 10, 2024",
      issuePrice: "₹ 425",
      listingPrice: "₹ 525",
      currentPrice: "₹ 545",
      return: "+28.2%"
    },
    {
      name: "Automotive Components Ltd",
      listingDate: "Mar 5, 2024",
      issuePrice: "₹ 280",
      listingPrice: "₹ 310",
      currentPrice: "₹ 295",
      return: "+5.4%"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Ongoing IPOs</h2>
        <div className="space-y-4">
          {ongoingIPOs.map((ipo) => (
            <div key={ipo.name} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">{ipo.name}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-400 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {ipo.dates}
                    </p>
                    <p className="text-sm text-gray-400">Price Band: {ipo.priceRange}</p>
                    <p className="text-sm text-gray-400">Lot Size: {ipo.lotSize} shares</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                    Live
                  </span>
                  <p className="mt-2 text-lg font-medium text-white">
                    Subscription: {ipo.subscription}
                  </p>
                </div>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Upcoming IPOs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingIPOs.map((ipo) => (
            <div key={ipo.name} className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white">{ipo.name}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-400 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {ipo.dates}
                </p>
                <p className="text-sm text-gray-400 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Lot Size: {ipo.lotSize} shares
                </p>
                <p className="text-sm text-gray-400">Price Band: {ipo.priceRange}</p>
              </div>
              <button className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition-colors">
                Set Reminder
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recently Listed</h2>
        <div className="space-y-4">
          {pastIPOs.map((ipo) => (
            <div key={ipo.name} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">{ipo.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">Listed on {ipo.listingDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 text-lg font-medium">{ipo.return}</p>
                  <p className="text-sm text-gray-400">Overall Return</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Issue Price</p>
                  <p className="text-white">{ipo.issuePrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Listing Price</p>
                  <p className="text-white">{ipo.listingPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Price</p>
                  <p className="text-white">{ipo.currentPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}