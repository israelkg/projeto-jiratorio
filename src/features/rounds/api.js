import { api } from "@/lib/api";

export async function listRounds(sessionId) {
  const { data } = await api.get(`/sessions/${sessionId}/rounds`);
  return data;
}

export async function getRound(sessionId, roundId) {
  const { data } = await api.get(`/sessions/${sessionId}/rounds/${roundId}`);
  return data;
}

export async function createRound(sessionId, { inquisitorId, victimId, questionId }) {
  const { data } = await api.post(`/sessions/${sessionId}/rounds`, {
    inquisitor_id: inquisitorId,
    victim_id: victimId,
    question_id: questionId ?? undefined,
  });
  return data;
}

export async function submitRoundResult(sessionId, roundId, outcome) {
  const { data } = await api.post(
    `/sessions/${sessionId}/rounds/${roundId}/result`,
    { outcome },
  );
  return data;
}

export async function drawPowerup(sessionId, roundId) {
  const { data } = await api.post(`/sessions/${sessionId}/rounds/${roundId}/draw_powerup`);
  return data;
}
