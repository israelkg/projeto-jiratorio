import { api } from "@/lib/api";

export async function listQuestions(filters = {}) {
  const { data } = await api.get("/questions", { params: filters });
  return data;
}

export async function getQuestion(id) {
  const { data } = await api.get(`/questions/${id}`);
  return data;
}

export async function createQuestion(payload) {
  const { data } = await api.post("/questions", payload);
  return data;
}

export async function updateQuestion(id, payload) {
  const { data } = await api.patch(`/questions/${id}`, payload);
  return data;
}

export async function deleteQuestion(id) {
  await api.delete(`/questions/${id}`);
}

export async function generateQuestionsFromMaterial(materialId, payload) {
  const { data } = await api.post(`/materials/${materialId}/generate_questions`, payload, {
    timeout: 60_000,
  });
  return data;
}
