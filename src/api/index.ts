import { LBankRestClient } from "./Lbank/LbankRestClient";
import IExchangeClient from "../domain/interfaces/exchangeClient";
import { WebSocket } from "ws";
import { getLbankWebsocketClient } from "./Lbank/LbankWebsocket";

let restClient: IExchangeClient;
export function createExchangeClient(type = "lbank"): IExchangeClient {
  if (restClient) {
    return restClient;
  }
  switch (type) {
    case "lbank":
      restClient = new LBankRestClient();
      return restClient;
    default:
      throw new Error("Unsupported exchange");
  }
}

let wsClient: WebSocket;
export function createWebsocketClient(type = "lbank"): WebSocket {
  if (wsClient) {
    return wsClient;
  }
  switch (type) {
    case "lbank":
      wsClient = getLbankWebsocketClient();
      return wsClient;
    default:
      throw new Error("Unsupported exchange for WebSocket");
  }
}
