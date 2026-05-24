const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn("VITE_API_URL is not set. Check .env.development or .env.production");
}

export { API_URL };

export const apiUrl = (path = "") => {
  const base = (API_URL || "").replace(/\/$/, "");
  const route = path.startsWith("/") ? path : `/${path}`;
  return `${base}${route}`;
};
