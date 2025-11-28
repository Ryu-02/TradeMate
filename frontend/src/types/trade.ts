export type TradeType = "BUY" | "SELL";

export interface Trade {
  id: number;
  date: string;
  type: TradeType;
  symbol: string;
  name?: string | null;
  quantity: number;
  price: string;
  fee: string;
  memo?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTradeRequest {
  date: string;
  type: TradeType;
  symbol: string;
  name?: string;
  quantity: number;
  price: number;
  fee?: number;
  memo?: string;
}
