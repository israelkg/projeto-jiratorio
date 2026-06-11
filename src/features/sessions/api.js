import { api } from "@/lib/api";

export async function listSessions() {
  const { data } = await api.get("/sessions");
  return data;
}

export async function getSession(id) {
  const { data } = await api.get(`/sessions/${id}`);
  return data;
}

export async function createSessionWithCsv({ name, file }) {
  const form = new FormData();
  form.append("name", name);
  form.append("file", file);
  const { data } = await api.post("/sessions", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateSession(id, payload) {
  const { data } = await api.patch(`/sessions/${id}`, payload);
  return data;
}

export async function deleteSession(id) {
  await api.delete(`/sessions/${id}`);
}

export async function drawRoles(sessionId) {
  const { data } = await api.post(`/sessions/${sessionId}/draw`);
  return data;
}

export async function redrawVictim(sessionId, excludeIds) {
  const { data } = await api.post(`/sessions/${sessionId}/redraw_victim`, {
    exclude_ids: excludeIds,
  });
  return data;
}

export async function fetchSessionMetrics(sessionId) {
  const { data } = await api.get(`/sessions/${sessionId}/metrics`);
  return data;
}

export async function getSessionQuestions(sessionId) {
  const { data } = await api.get(`/sessions/${sessionId}/questions`);
  return data;
}

export async function setSessionQuestions(sessionId, questionIds) {
  const { data } = await api.put(`/sessions/${sessionId}/questions`, {
    question_ids: questionIds,
  });
  return data;
}

export async function fetchTeams(sessionId) {
  const { data } = await api.get(`/sessions/${sessionId}/teams`);
  return data;
}

export async function autoGenerateTeams(sessionId, teamSize = 2) {
  // Backend TeamDrawService limpa as equipes existentes e re-sorteia (idempotente).
  const { data } = await api.post(`/sessions/${sessionId}/teams/draw`, { team_size: teamSize });
  return data;
}
