import { api } from "@/lib/api";

export const PROBABILITY_KEYS = ["dica", "tempo", "escudo", "troca", "dobro"];
export const CARD_KEYS = ["inverter", "pular", "dupla", "roubar", "dica", "tempo", "escudo", "troca"];

export async function fetchPowerupConfig() {
  const { data } = await api.get("/powerup_config");
  return data;
}

export async function updatePowerupConfig(payload) {
  const { data } = await api.patch("/powerup_config", payload);
  return data;
}
