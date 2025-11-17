export default interface CacheClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;

  pushToList(listKey: string, value: string, maxLength?: number): Promise<void>;
  getList(listKey: string, start?: number, end?: number): Promise<string[]>;
  getLatestFromList(listKey: string): Promise<string | null>;
  clearList(listKey: string): Promise<void>;
}