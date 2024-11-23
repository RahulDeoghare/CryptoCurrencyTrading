import * as React from 'react';
import { useState } from 'react';
import { Calendar, Clock, Users, TrendingUp, AlertCircle, X, ChevronRight, CreditCard, Building2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTradingContext } from '../context/TradingContext';

interface IPOApplication {
  shares: number;
  price: number;
  cutOffPrice: boolean;
  bankAccount: string;
  upiId: string;
}

export function IPO() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIPO, setSelectedIPO] = useState<any>(null);
  const { addNotification } = useTradingContext();
  const [application, setApplication] = useState<IPOApplication>({
    shares: 0,
    price: 0,
    cutOffPrice: true,
    bankAccount: '',
    upiId: ''
  });

  const upcomingIPOs = [
    {
      name: "Bharat Dynamics Ltd",
      dates: "Mar 15-18, 2024",
      priceRange: "₹475 - ₹500",
      lotSize: 30,
      issueSize: "₹850 Cr",
      subscription: "Opening Soon",
      status: "upcoming",
      details: {
        companyInfo: "Leading defense equipment manufacturer",
        financials: {
          revenue: "₹2,500 Cr",
          profit: "₹350 Cr",
          growth: "25%"
        },
        riskFactors: [
          "Regulatory changes in defense sector",
          "Project execution delays",
          "Competition from private players"
        ]
      }
    },
    {
      name: "Green Energy Solutions Ltd",
      dates: "Mar 20-22, 2024",
      priceRange: "₹285 - ₹300",
      lotSize: 50,
      issueSize: "₹1,200 Cr",
      subscription: "Opening Soon",
      status: "upcoming",
      details: {
        companyInfo: "Renewable energy solutions provider",
        financials: {
          revenue: "₹1,800 Cr",
          profit: "₹220 Cr",
          growth: "35%"
        },
        riskFactors: [
          "Policy changes in renewable sector",
          "Raw material price fluctuations",
          "Technology obsolescence risk"
        ]
      }
    }
  ];

  const ongoingIPOs = [
    {
      name: "HealthTech Innovations Ltd",
      dates: "Mar 12-14, 2024",
      priceRange: "₹350 - ₹370",
      lotSize: 40,
      issueSize: "₹750 Cr",
      subscription: {
        QIB: "3.5x",
        NII: "2.8x",
        Retail: "4.2x"
      },
      status: "active",
      details: {
        companyInfo: "Healthcare technology solutions provider",
        financials: {
          revenue: "₹1,200 Cr",
          profit: "₹180 Cr",
          growth: "40%"
        },
        riskFactors: [
          "Regulatory compliance risks",
          "Data security concerns",
          "Market competition"
        ]
      }
    }
  ];

  const pastIPOs = [
    {
      name: "Digital Solutions India Ltd",
      listingDate: "Mar 10, 2024",
      issuePrice: "₹425",
      listingPrice: "₹525",
      currentPrice: "₹545",
      return: "+28.2%",
      performance: {
        day1: "+23.5%",
        week1: "+28.2%",
        month1: "NA"
      }
    },
    {
      name: "Automotive Components Ltd",
      listingDate: "Mar 5, 2024",
      issuePrice: "₹280",
      listingPrice: "₹310",
      currentPrice: "₹295",
      return: "+5.4%",
      performance: {
        day1: "+10.7%",
        week1: "+5.4%",
        month1: "NA"
      }
    }
  ];

  const handleIPOApplication = (ipo: any) => {
    setSelectedIPO(ipo);
    setApplication({
      shares: ipo.lotSize,
      price: parseInt(ipo.priceRange.split(' - ')[1].replace('₹', '')),
      cutOffPrice: true,
      bankAccount: '',
      upiId: ''
    });
    setIsDialogOpen(true);
  };

  const submitIPOApplication = () => {
    if (!application.bankAccount && !application.upiId) {
      addNotification(
        'Application Error',
        'Please provide either bank account or UPI details'
      );
      return;
    }

    const totalAmount = application.shares * application.price;
    addNotification(
      'IPO Application Submitted',
      `Your application for ${selectedIPO.name} has been successfully submitted for ${application.shares} shares at ₹${application.price} per share. Total amount: ₹${totalAmount.toLocaleString()}`
    );
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Market Overview */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">IPO Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Total Active IPOs</p>
            <p className="text-2xl font-bold text-white">{ongoingIPOs.length}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Upcoming IPOs</p>
            <p className="text-2xl font-bold text-white">{upcomingIPOs.length}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Average Listing Gains</p>
            <p className="text-2xl font-bold text-green-500">+16.8%</p>
          </div>
        </div>
      </div>

      {/* Ongoing IPOs */}
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
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">QIB</p>
                      <p className="text-sm text-white">{ipo.subscription.QIB}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">NII</p>
                      <p className="text-sm text-white">{ipo.subscription.NII}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Retail</p>
                      <p className="text-sm text-white">{ipo.subscription.Retail}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                    Live
                  </span>
                  <button 
                    onClick={() => handleIPOApplication(ipo)}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming IPOs */}
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
                <p className="text-sm text-gray-400">Price Band: {ipo.priceRange}</p>
                <p className="text-sm text-gray-400">Issue Size: {ipo.issueSize}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => {
                    addNotification(
                      'Reminder Set',
                      `We'll notify you when ${ipo.name} IPO opens for subscription.`
                    );
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Set Reminder
                </button>
                <button 
                  onClick={() => {
                    addNotification(
                      'DRHP Downloaded',
                      `The Draft Red Herring Prospectus for ${ipo.name} has been downloaded.`
                    );
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Download DRHP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past IPOs Performance */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Listings</h2>
        <div className="space-y-4">
          {pastIPOs.map((ipo) => (
            <div key={ipo.name} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">{ipo.name}</h3>
                  <p className="text-sm text-gray-400">Listed on {ipo.listingDate}</p>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Issue Price</p>
                      <p className="text-sm text-white">{ipo.issuePrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Listing Price</p>
                      <p className="text-sm text-white">{ipo.listingPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Current Price</p>
                      <p className="text-sm text-white">{ipo.currentPrice}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    parseFloat(ipo.return) >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {ipo.return}
                  </p>
                  <p className="text-sm text-gray-400">Overall Return</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-bold text-white">
                IPO Application
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>
            {selectedIPO && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedIPO.name}</h3>
                  <p className="text-sm text-gray-400">Price Band: {selectedIPO.priceRange}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Number of Lots
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={application.shares / selectedIPO.lotSize}
                    onChange={(e) => setApplication({
                      ...application,
                      shares: parseInt(e.target.value) * selectedIPO.lotSize
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Total Shares: {application.shares}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Bid Price
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={application.price}
                      onChange={(e) => setApplication({
                        ...application,
                        price: parseInt(e.target.value),
                        cutOffPrice: false
                      })}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      disabled={application.cutOffPrice}
                    />
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={application.cutOffPrice}
                        onChange={(e) => setApplication({
                          ...application,
                          cutOffPrice: e.target.checked
                        })}
                        className="rounded border-gray-600"
                      />
                      <span className="text-sm text-gray-400">Cut-off Price</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Bank Account (ASBA)
                      </label>
                      <input
                        type="text"
                        value={application.bankAccount}
                        onChange={(e) => setApplication({
                          ...application,
                          bankAccount: e.target.value
                        })}
                        placeholder="Enter ASBA bank account number"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={application.upiId}
                        onChange={(e) => setApplication({
                          ...application,
                          upiId: e.target.value
                        })}
                        placeholder="Enter UPI ID"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Application Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Shares</span>
                      <span className="text-white">{application.shares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price per Share</span>
                      <span className="text-white">₹{application.price}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-400">Total Amount</span>
                      <span className="text-white">₹{(application.shares * application.price).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={submitIPOApplication}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default IPO;