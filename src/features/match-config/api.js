import { api } from "@/lib/api";

export const MATCH_MODES = ["individual", "dupla"];

export async function fetchMatchConfig() {
  const { data } = await api.get("/match_config");
  return data;
}

export async function updateMatchConfig(payload) {
  const { data } = await api.patch("/match_config", payload);
  return data;
}
