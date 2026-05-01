import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "/api";

export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

// Auth interceptor — token vem de localStorage por enquanto
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Error interceptor — normaliza erro pra { status, message, data }
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? error.message ?? "Erro desconhecido",
      data: error.response?.data,
    };
    return Promise.reject(normalized);
  },
);
