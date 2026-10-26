import axios from 'axios';

export const TOKEN_KEY = 'caid_token';
export const USER_KEY = 'caid_user';
export const ACCESS_KEY = 'caid_access';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isLogin = err.config?.url?.includes('/auth/login');
    if (err.response?.status === 401 && !isLogin) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(ACCESS_KEY);
      if (window.location.pathname.startsWith('/portal')) {
        window.location.assign('/login?expired=1');
      }
    }
    return Promise.reject(err);
  }
);

export function errorMessage(err) {
  if (!err.response) return 'Cannot reach the server. Check that the backend is running on port 8080.';
  return err.response.data?.message || `Request failed (${err.response.status}).`;
}

export default api;
