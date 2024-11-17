import { format } from 'date-fns';

export const NIFTY50_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', sector: 'Oil & Gas' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.', sector: 'IT' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', sector: 'Banking' },
  { symbol: 'INFY', name: 'Infosys Ltd.', sector: 'IT' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', sector: 'Banking' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', sector: 'FMCG' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', sector: 'Telecom' },
  { symbol: 'ITC', name: 'ITC Ltd.', sector: 'FMCG' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd.', sector: 'Banking' },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd.', sector: 'Construction' }
];

export function getBasePrice(symbol: string): number {
  const prices: Record<string, number> = {
    'RELIANCE': 2450.75,
    'TCS': 3890.25,
    'HDFCBANK': 1678.50,
    'INFY': 1456.75,
    'ICICIBANK': 987.25,
    'HINDUNILVR': 2567.80,
    'BHARTIARTL': 876.45,
    'ITC': 432.90,
    'KOTAKBANK': 1789.65,
    'LT': 2987.30
  };
  return prices[symbol] || 0;
}

export function generateMockPriceUpdates(
  callback: (updates: Record<string, { price: number; change24h: number }>) => void
) {
  const marketOpen = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 100 + minutes;
    return time >= 915 && time <= 1530; // 9:15 AM to 3:30 PM
  };

  const interval = setInterval(() => {
    if (!marketOpen()) {
      return;
    }

    const updates: Record<string, { price: number; change24h: number }> = {};
    NIFTY50_STOCKS.forEach(({ symbol }) => {
      const basePrice = getBasePrice(symbol);
      const volatility = basePrice * 0.002;
      const change = (Math.random() - 0.5) * 2;
      const newPrice = basePrice * (1 + change / 100);
      
      updates[symbol] = {
        price: Number(newPrice.toFixed(2)),
        change24h: Number(change.toFixed(2))
      };
    });
    callback(updates);
  }, 1000);

  return () => clearInterval(interval);
}

export function formatIndianCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  });
  return formatter.format(amount);
}

export function getMarketStatus(): { isOpen: boolean; nextTiming: string } {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours * 100 + minutes;

  if (time >= 915 && time <= 1530) {
    return { 
      isOpen: true, 
      nextTiming: 'Market closes at 3:30 PM' 
    };
  }

  if (time < 915) {
    return { 
      isOpen: false, 
      nextTiming: 'Market opens at 9:15 AM' 
    };
  }

  return { 
    isOpen: false, 
    nextTiming: 'Market opens tomorrow at 9:15 AM' 
  };
}