import { format } from 'date-fns';

export const NIFTY50_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', sector: 'Oil & Gas', price: 2450.75 },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.', sector: 'IT', price: 3890.25 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', sector: 'Banking', price: 1678.50 },
  { symbol: 'INFY', name: 'Infosys Ltd.', sector: 'IT', price: 1456.75 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', sector: 'Banking', price: 987.25 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', sector: 'FMCG', price: 2567.80 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', sector: 'Telecom', price: 876.45 },
  { symbol: 'ITC', name: 'ITC Ltd.', sector: 'FMCG', price: 432.90 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd.', sector: 'Banking', price: 1789.65 },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd.', sector: 'Construction', price: 2987.30 },
  { symbol: 'WIPRO', name: 'Wipro Ltd.', sector: 'IT', price: 456.75 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd.', sector: 'Consumer', price: 3245.60 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd.', sector: 'Automobile', price: 9876.45 },
  { symbol: 'TATASTEEL', name: 'Tata Steel Ltd.', sector: 'Metal', price: 134.55 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd.', sector: 'Finance', price: 6789.30 }
];

export function generateMockPriceUpdates(
  callback: (updates: Record<string, { price: number; change24h: number }>) => void
) {
  const marketOpen = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 100 + minutes;
    return time >= 915 && time <= 1530; // 9:15 AM to 3:30 PM IST
  };

  const interval = setInterval(() => {
    if (!marketOpen()) {
      return;
    }

    const updates: Record<string, { price: number; change24h: number }> = {};
    NIFTY50_STOCKS.forEach((stock) => {
      const basePrice = stock.price;
      const volatility = basePrice * 0.002;
      const change = (Math.random() - 0.5) * 2;
      const newPrice = basePrice * (1 + change / 100);
      
      updates[stock.symbol] = {
        price: Number(newPrice.toFixed(2)),
        change24h: Number(change.toFixed(2))
      };
    });
    callback(updates);
  }, 1000);

  return () => clearInterval(interval);
}

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
}

export function getMarketStatus(): { isOpen: boolean; nextTiming: string } {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours * 100 + minutes;

  if (time >= 915 && time <= 1530) {
    return { 
      isOpen: true, 
      nextTiming: 'Market closes at 3:30 PM IST' 
    };
  }

  if (time < 915) {
    return { 
      isOpen: false, 
      nextTiming: 'Market opens at 9:15 AM IST' 
    };
  }

  return { 
    isOpen: false, 
    nextTiming: 'Market opens tomorrow at 9:15 AM IST' 
  };
}

export function calculateReturns(buyPrice: number, currentPrice: number, quantity: number): number {
  return (currentPrice - buyPrice) * quantity;
}

export function calculateReturnPercentage(buyPrice: number, currentPrice: number): number {
  return ((currentPrice - buyPrice) / buyPrice) * 100;
}