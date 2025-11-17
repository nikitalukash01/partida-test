import {
  calculateMidPrice,
  calculateSpreadPercent,
} from "../core/calculations";

describe("calculateMidPrice", () => {
  it("should correctly calculate the mid price", () => {
    expect(calculateMidPrice(100, 200)).toBe(150);
    expect(calculateMidPrice(94000, 96000)).toBe(95000);
  });

  it("should work when bid and ask are equal", () => {
    expect(calculateMidPrice(500, 500)).toBe(500);
  });

  it("should correctly handle floating-point numbers", () => {
    expect(calculateMidPrice(100.5, 101.5)).toBeCloseTo(101.0);
  });
});

describe("calculateSpreadPercent", () => {
  it("should correctly calculate the spread in percent", () => {
    const bestBid = 100;
    const bestAsk = 110;
    const expectedMid = 105;
    const expectedSpread = ((bestAsk - bestBid) / expectedMid) * 100;
    expect(calculateSpreadPercent(bestBid, bestAsk)).toBeCloseTo(
      expectedSpread
    );
  });

  it("should return 0 when bid and ask are equal", () => {
    expect(calculateSpreadPercent(100, 100)).toBe(0);
  });

  it("should correctly handle very small spreads", () => {
    const spread = calculateSpreadPercent(94124.99, 94125.01);
    expect(spread).toBeCloseTo(0.000021, 6); // very small spread, checking precision
  });

  it("should correctly handle large values", () => {
    const spread = calculateSpreadPercent(1_000_000, 1_010_000);
    expect(spread).toBeCloseTo(0.995, 3);
  });
});
