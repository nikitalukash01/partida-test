const calculateMidPrice = (bestBid: number, bestAsk: number): number => {
  return (bestBid + bestAsk) / 2;
};

const calculateSpreadPercent = (bestBid: number, bestAsk: number): number => {
  const mid = calculateMidPrice(bestBid, bestAsk);
  return ((bestAsk - bestBid) / mid) * 100;
};

export { calculateMidPrice, calculateSpreadPercent };
