import axios from "axios";
import { API_URL } from "./api.js";

const apiClient = axios.create({
  baseURL: (API_URL || "").replace(/\/$/, ""),
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
