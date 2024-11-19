import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
  User, X, Settings, CreditCard, LogOut, Shield, 
  FileText, Bell, HelpCircle, Wallet, Ban, 
  ChevronRight, Smartphone, Lock
} from 'lucide-react';

export function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showKycModal, setShowKycModal] = useState(false);

  const user = {
    name: 'Rahul Deoghare',
    email: 'rahul.deoghare@example.com',
    phone: '+91 98765 43210',
    accountType: 'Premium',
    kycStatus: 'Verified',
    joinDate: 'January 2024',
    tradingExperience: '3+ years',
    bankAccounts: [
      { bank: 'HDFC Bank', accountNo: '****6789', primary: true },
      { bank: 'ICICI Bank', accountNo: '****4321', primary: false }
    ],
    cards: [
      { type: 'Credit Card', number: '****8765', expiry: '12/25' }
    ],
    upi: [
      { id: 'rahul@upi', default: true },
      { id: 'rahul@bankupi', default: false }
    ],
    preferences: {
      twoFactorEnabled: true,
      tradingAlerts: true,
      marketUpdates: true,
      priceAlerts: true
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-gray-400 text-sm">{user.phone}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400">Account Type</p>
                <p className="text-white font-medium">{user.accountType}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400">KYC Status</p>
                <p className="text-green-500 font-medium">{user.kycStatus}</p>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">Trading Experience</p>
                  <p className="text-gray-400 text-sm">{user.tradingExperience}</p>
                </div>
                <FileText className="text-gray-400 h-5 w-5" />
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-4">Bank Accounts</h3>
              {user.bankAccounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Ban className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-white">{account.bank}</p>
                      <p className="text-gray-400 text-sm">{account.accountNo}</p>
                    </div>
                  </div>
                  {account.primary && (
                    <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">
                      Primary
                    </span>
                  )}
                </div>
              ))}
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Bank Account
              </button>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-4">UPI IDs</h3>
              {user.upi.map((upi, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Smartphone className="h-5 w-5 text-gray-400 mr-3" />
                    <p className="text-white">{upi.id}</p>
                  </div>
                  {upi.default && (
                    <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
              ))}
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add UPI ID
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-gray-400 text-sm">Secure your account with 2FA</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={user.preferences.twoFactorEnabled}
                    onChange={() => {}}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full ${
                    user.preferences.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-500'
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      user.preferences.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    } mt-1`} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-4">Login History</h3>
              <div className="space-y-3">
                {[
                  { device: 'Chrome - Windows', time: '2 hours ago', location: 'Mumbai, IN' },
                  { device: 'Mobile App - iOS', time: 'Yesterday', location: 'Delhi, IN' }
                ].map((login, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-white">{login.device}</p>
                      <p className="text-gray-400 text-sm">{login.location}</p>
                    </div>
                    <p className="text-gray-400 text-sm">{login.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center">
              <Lock className="h-5 w-5 mr-2" />
              Change Password
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-gray-400 hover:text-white">
          <User className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-xl font-bold text-white">
                Account
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'payment' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Payment
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'security' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                Security
              </button>
            </div>

            {renderContent()}

            <div className="mt-6 space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-2 text-white hover:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-3" />
                  Help & Support
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-gray-700 rounded-lg">
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}