export type CmsUser = {
  id: string;
  email: string;
  role: "admin" | "editor";
};

const API_BASE = "/api";
const TOKEN_KEY = "cms_token";

export const cmsAuth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY)
};

async function request(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  const token = cmsAuth.getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new Error(
      "CMS API is not reachable. Start it with: npm run dev:cms (or deploy with the /api server on Vercel)."
    );
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || error.message || "Request failed");
  }
  if (response.status === 204) return null;
  return response.json();
}

export const cmsApi = {
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  forgotPassword: (email: string) =>
    request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
  me: () => request("/auth/me"),
  list: (collection: string) => request(`/${collection}`),
  create: (collection: string, data: unknown) =>
    request(`/${collection}`, { method: "POST", body: JSON.stringify(data) }),
  update: (collection: string, id: string, data: unknown) =>
    request(`/${collection}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (collection: string, id: string) =>
    request(`/${collection}/${id}`, { method: "DELETE" }),
  uploadMedia: (formData: FormData) => request("/media", { method: "POST", body: formData }),
  settings: () => request("/settings"),
  updateSettings: (data: unknown) => request("/settings", { method: "PUT", body: JSON.stringify(data) }),
  users: () => request("/users"),
  createUser: (data: unknown) => request("/users", { method: "POST", body: JSON.stringify(data) }),
  deleteUser: (id: string) => request(`/users/${id}`, { method: "DELETE" })
  ,
  sitePages: () => request("/site-pages"),
  updateSitePage: (id: string, data: unknown) =>
    request(`/site-pages/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(data) })
};
