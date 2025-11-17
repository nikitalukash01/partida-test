import { createClient } from "redis";
import CacheClient from "../domain/interfaces/cacheClient";

class RedisCacheClient implements CacheClient {
  private client;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });

    this.client.on("error", (err) => console.log("Redis Client Error", err));

    this.client.connect();
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setEx(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async pushToList(
    listKey: string,
    value: string,
    maxLength = 10
  ): Promise<void> {
    await this.client.lPush(listKey, value);
    await this.client.lTrim(listKey, 0, maxLength - 1);
  }

  async getList(listKey: string, start = 0, end = -1): Promise<string[]> {
    return await this.client.lRange(listKey, start, end);
  }

  async getLatestFromList(listKey: string): Promise<string | null> {
    const values = await this.client.lRange(listKey, 0, 0);
    return values.length > 0 ? values[0]! : null;
  }

  async clearList(listKey: string): Promise<void> {
    await this.client.del(listKey);
  }
}

let client: RedisCacheClient | undefined;
export const getRedisClient = () => {
  if (client) {
    return client;
  }
  client = new RedisCacheClient();
  return client;
};
