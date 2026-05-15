import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "/api/v1";

export const AUTH_TOKEN_KEY = "auth_token";

export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const normalized = {
      status: error.response?.status ?? 0,
      message:
        data?.error ??
        data?.message ??
        (Array.isArray(data?.details) ? data.details.join(", ") : null) ??
        error.message ??
        "Erro desconhecido",
      details: data?.details,
      data,
    };

    if (normalized.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/login") &&
        !window.location.pathname.startsWith("/register")
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(normalized);
  },
);
