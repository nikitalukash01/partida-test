import { LBankRestClient } from "./Lbank/LbankRestClient";
import IExchangeClient from "../domain/interfaces/exchangeClient";

let client: IExchangeClient;
export function createExchangeClient(type = "lbank"): IExchangeClient {
  if (client) {
    return client;
  }
  switch (type) {
    case "lbank":
      client = new LBankRestClient();
      return client;
    default:
      throw new Error("Unsupported exchange");
  }
}
