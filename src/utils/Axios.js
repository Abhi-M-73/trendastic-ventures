import axios from "axios";
import { backendConfig } from "./mainContent";
import { store } from "../redux/store";
import { setToken, setUser } from "../redux/slices/authSlice";

const Axios = axios.create({
  withCredentials: true,
  baseURL: backendConfig.base,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state?.auth?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(setUser(null));
      store.dispatch(setToken(null));
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default Axios;
