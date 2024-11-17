import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// export function Notifications() {
//   const [notifications, setNotifications] = React.useState<Notification[]>([
//     {
//       id: '1',
//       title: 'Order Executed',
//       message: 'Your buy order for RELIANCE at ₹2,450.75 has been executed',
//       time: '2 minutes ago',
//       read: false
//     },
//     {
//       id: '2',
//       title: 'Price Alert',
//       mess
//     },