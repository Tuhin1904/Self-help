// src/lib/apiClient.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  Method,
} from "axios";
import { store } from "@/store/store";
import { setTokens, logout } from "@/store/Slices/authSlice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Shape of refresh response from your backend – adjust if different
interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

// Options for our apiRequest helper
export interface ApiRequestOptions<T = any> {
  endpoint: string;
  method?: Method;
  params?: any; // body or query
  config?: AxiosRequestConfig<T>;
  payload?: any;
}

// Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // if you’re using cookies; remove if not needed
});

// --- Helper to queue requests while refreshing ---

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
      return;
    }
    if (token && config.headers) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    resolve(api.request(config));
  });
  failedQueue = [];
};

// --- REQUEST INTERCEPTOR: attach headers & token ---
api.interceptors.request.use(
  (config) => {
    const state = store.getState() as any;
    const accessToken: string | null = state?.auth?.accessToken ?? null;

    // Ensure headers object exists
    config.headers = config.headers ?? {};

    // Default headers
    if (!(config.headers as any)["Content-Type"]) {
      (config.headers as any)["Content-Type"] = "application/json";
    }

    // Attach Authorization if token exists
    if (accessToken) {
      (config.headers as any).Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR: handle 401 + refresh token ---
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // If no response (network error etc.), just reject
    if (!error.response) {
      return Promise.reject(error);
    }

    // If 401 and we haven’t retried yet -> try refresh
    if (
      error.response.status === 401 &&
      !originalRequest._retry // custom flag
    ) {
      originalRequest._retry = true;

      const state = store.getState() as any;
      const refreshToken: string | null = state?.auth?.refreshToken ?? null;

      if (!refreshToken) {
        // No refresh token -> logout
        store.dispatch(logout());
        return Promise.reject(error);
      }

      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        // Call your refresh endpoint – adjust URL & payload to your backend
        const refreshResponse = await api.post<RefreshResponse>(
          "/auth/refresh",
          { refreshToken }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken =
          refreshResponse.data.refreshToken ?? refreshToken;

        // Update Redux
        store.dispatch(
          setTokens({
            token: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );

        // Update Authorization header for the pending request
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return api.request(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Any other error
    return Promise.reject(error);
  }
);

// --- PUBLIC HELPER FUNCTION ---

export async function apiRequest<T = any>({
  endpoint,
  method = "GET",
  params,
  payload,
  config = {},
}: ApiRequestOptions): Promise<T> {
  try {
    const axiosConfig: AxiosRequestConfig = {
      url: endpoint,
      method,
      ...(method === "GET" ? { params } : { data: payload ?? params }),
      ...config,
    };

    const response = await api.request<T>(axiosConfig);
    return response.data;
  } catch (error: any) {
    // Optional: normalize error shape here
    console.error("API ERROR:", error?.response || error);
    throw error?.response?.data || error;
  }
}
