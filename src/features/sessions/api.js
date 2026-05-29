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
