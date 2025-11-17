import { WebSocket } from "ws";
import { getRedisClient } from "../../infrastructure/redis";

const redisClient = getRedisClient();
const ws = new WebSocket("wss://www.lbkex.net/ws/V2/");

ws.on("open", () => {
  console.log("WebSocket connection opened");
  ws.send(
    JSON.stringify({
      subscribe: "tick",
      pair: "btc_usdt",
      action: "subscribe",
    })
  );
});

ws.on("ping", () => {
  ws.pong();
});

ws.on("message", async (data) => {
  const message = data.toString();
  const { tick, TS: ts } = JSON.parse(message);
  const last10 = await redisClient.getList("market:spreads");
  const avg = last10.map(Number).reduce((a, b) => a + b, 0) / last10.length;
  const mid = await redisClient.get("market:mid");
  console.log(
    `[${ts}] BTC/USDT lastPrice: ${
      tick.latest
    }, mid: ${mid} , spread: ${avg.toFixed(8)}%`
  );
});

ws.on("close", () => {
  console.log("WebSocket connection closed");
});

export { ws };
