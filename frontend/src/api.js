import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL,
  timeout: 30000
});

api.interceptors.response.use(
  r => r,
  (error) => {
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      "Request failed";
    return Promise.reject(new Error(message));
  }
);
