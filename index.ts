import { createExchangeClient,createWebsocketClient } from "./src/api/index";
import {
  calculateMidPrice,
  calculateSpreadPercent,
} from "./src/core/calculations";
import "./src/api/Lbank/LbankWebsocket";
import "dotenv/config";
import { getRedisClient } from "./src/infrastructure/redis";

const wsClient = createWebsocketClient();
const exchangeClient = createExchangeClient();
const cacheClient = getRedisClient();

const updateOrderBook = async () => {
  const orderBook = await exchangeClient.getOrderBook();
  const bestBid = orderBook.bids.reduce((max, bid) => {
    return parseFloat(bid[0]) > max ? parseFloat(bid[0]) : max;
  }, 0);

  const bestAsk = orderBook.asks.reduce((min, ask) => {
    return parseFloat(ask[0]) < min ? parseFloat(ask[0]) : min;
  }, Infinity);

  console.log(`Best Bid: ${bestBid}, Best Ask: ${bestAsk}`);

  const mid = calculateMidPrice(bestBid, bestAsk);
  const spreadPercent = calculateSpreadPercent(bestBid, bestAsk);

  await Promise.all([
    cacheClient.set("market:mid", mid.toString()),
    cacheClient.pushToList("market:spreads", spreadPercent.toString()),
  ]);
};

updateOrderBook().then(() => {
  setInterval(
    updateOrderBook,
    process.env.UPDATE_INTERVAL_MS
      ? parseInt(process.env.UPDATE_INTERVAL_MS)
      : 60000
  );
});

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await cacheClient.clearList("market:spreads");
  process.exit();
});
