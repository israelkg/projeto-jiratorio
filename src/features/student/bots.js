import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "/api/v1";

// Instância isolada para os bots de demonstração (cada bot usa o próprio token).
const botApi = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

const TEXT_ANSWERS = [
  "Acho que é o Scrum Master",
  "É a reunião diária do time",
  "Serve para organizar as tarefas",
  "É o Product Owner",
  "São ciclos curtos de entrega",
  "É a lista priorizada de tarefas",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function answerFor(question) {
  if (!question) return pick(TEXT_ANSWERS);
  if (question.type === "multipla" && question.options?.length) {
    return question.options[Math.floor(Math.random() * question.options.length)];
  }
  if (question.type === "verdadeiro") return pick(["verdadeiro", "falso"]);
  return pick(TEXT_ANSWERS);
}

export async function botJoin(code, name) {
  const { data } = await botApi.post("/student/join", { code, name });
  return data.token;
}

export async function botState(token) {
  const { data } = await botApi.get("/student/session", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function botAnswer(token, answer) {
  await botApi.post(
    "/student/answer",
    { answer },
    { headers: { Authorization: `Bearer ${token}` } },
  );
}
