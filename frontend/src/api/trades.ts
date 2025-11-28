import type { Trade, CreateTradeRequest } from "../types/trade";

const BASE_URL = "http://localhost:3000/trades";

export type UpdateTradeRequest = Partial<CreateTradeRequest>;

export async function fetchTrades(): Promise<Trade[]> {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) {
    throw new Error("Failed to fetch trades");
  }
  return res.json();
}

export async function createTrade(data: CreateTradeRequest): Promise<Trade> {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    console.error("Create trade error:", errorBody);
    throw new Error("Failed to create trade");
  }

  return res.json();
}

export async function updateTrade(id: number, body: UpdateTradeRequest): Promise<Trade> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to update trade");
  }

  return response.json() as Promise<Trade>;
}

export async function deleteTrade(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete trade");
  }
}
