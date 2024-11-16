export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
}

export interface Trade {
  id: string;
  symbol: string;
  price: number;
  amount: number;
  type: 'buy' | 'sell';
  timestamp: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface Portfolio {
  asset: string;
  amount: number;
  averagePrice: number;
}