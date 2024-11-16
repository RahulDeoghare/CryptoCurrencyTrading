export function generateMockPriceUpdates(
  callback: (updates: Record<string, { price: number; change24h: number }>) => void
) {
  const interval = setInterval(() => {
    const updates: Record<string, { price: number; change24h: number }> = {};
    ['BTC/USD', 'ETH/USD', 'SOL/USD', 'AAPL', 'GOOGL'].forEach(symbol => {
      const change = (Math.random() - 0.5) * 2; // -1 to 1
      updates[symbol] = {
        price: getBasePrice(symbol) * (1 + change / 100),
        change24h: change,
      };
    });
    callback(updates);
  }, 3000);

  return () => clearInterval(interval);
}

function getBasePrice(symbol: string): number {
  switch (symbol) {
    case 'BTC/USD': return 45825;
    case 'ETH/USD': return 2890;
    case 'SOL/USD': return 98;
    case 'AAPL': return 182;
    case 'GOOGL': return 142;
    default: return 0;
  }
}