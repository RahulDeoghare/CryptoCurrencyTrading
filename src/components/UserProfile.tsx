import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { User, X, Settings, CreditCard, LogOut } from 'lucide-react';

export function UserProfile() {
  const user = {
    name: 'Rahul Deoghare',
    email: 'rahul.deoghare@stock.com',
    accountType: 'Premium',
    kycStatus: 'Verified',
    joinDate: 'January 2024'
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
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-xl font-bold text-white">
                Profile
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Account Type</p>
                  <p className="text-white font-medium">{user.accountType}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">KYC Status</p>
                  <p className="text-green-500 font-medium">{user.kycStatus}</p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-lg">
                  <Settings className="h-5 w-5 mr-3" />
                  Account Settings
                </button>
                <button className="w-full flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-lg">
                  <CreditCard className="h-5 w-5 mr-3" />
                  Payment Methods
                </button>
                <button className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-gray-700 rounded-lg">
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}