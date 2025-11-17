import ExchangeClient from "../../domain/interfaces/exchangeClient";
import axios, { AxiosInstance } from "axios";

class LBankRestClient implements ExchangeClient {
  private readonly baseUrl: string = "https://api.lbkex.com";
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
    });
  }

  async getOrderBook(
    symbol: string = "btc_usdt",
    size: number = 10
  ): Promise<{ bids: Array<Array<string>>; asks: Array<Array<string>> }> {
    const rawData = await this.client.get<{
      result: string;
      msg: string;
      data: {
        bids: Array<Array<string>>;
        asks: Array<Array<string>>;
      };
    }>(`/v2/depth.do`, {
      params: { symbol, size },
    });

    return {
      bids: rawData.data.data.bids,
      asks: rawData.data.data.asks,
    };
  }
}

export { LBankRestClient };
