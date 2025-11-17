export default interface ExchangeClient {
  getOrderBook(
    symbol: string | void
  ): Promise<{ bids: Array<Array<string>>; asks: Array<Array<string>> }>;
}
