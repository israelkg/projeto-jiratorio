import axios from "axios";
import { STUDENT_TOKEN_KEY } from "./store/studentAuthStore";

const baseURL = import.meta.env.VITE_API_URL ?? "/api/v1";

// Instância dedicada do aluno: usa o token de aluno, separado do professor.
const studentApi = axios.create({
  baseURL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

studentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(STUDENT_TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

studentApi.interceptors.response.use(
  (res) => res,
  (error) => {
    const data = error.response?.data;
    return Promise.reject({
      status: error.response?.status ?? 0,
      message: data?.error ?? error.message ?? "Erro desconhecido",
      details: data?.details,
    });
  },
);

export async function joinSession({ code, name, ra }) {
  const { data } = await studentApi.post("/student/join", { code, name, ra });
  return data;
}

export async function fetchStudentState() {
  const { data } = await studentApi.get("/student/session");
  return data;
}

export async function submitStudentAnswer(answer) {
  const { data } = await studentApi.post("/student/answer", { answer });
  return data;
}
